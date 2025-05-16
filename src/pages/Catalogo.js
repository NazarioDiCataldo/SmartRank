import DOM, { createRef } from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import setModal from '../utilities/setModal';
import Sidebar, { flagFiltri } from '../components/Sidebar';
import { averageCalculator } from '../utilities/setRating';
import { debounce } from 'lodash';
import { getReviews } from './Dettaglio';
import Catalog from '../classes/catalog';
import Product from '../classes/product';
import ReviewsStore from '../classes/reviews_store';

const gridRef = createRef();

const divTestualeTitleRef = createRef(); //Ref del div che contiene il testo (sia errore, che ricerca)

//Mi creo l'oggetto catalogo
const catalog = new Catalog();

//Mi creo l'oggetto reviewsStore 
const reviewsStore = new ReviewsStore();

//Funzione per la chiamata al js-server
const getProducts = async (gridRef) => {
    //Mi chiamo la funzione per prendermi tutte le recensioni
    reviewsStore.reviews = await getReviews()
    try{
        catalog.products = [];
        const res = await fetch("http://localhost:3000/products")
        const data = await res.json();
        const products = DOM.fragment( 
            data
            .map(p => {
                //Mi creo l'oggetto prodotto
                const product = new Product(p.id, p.nome, p.url, p.marca, p.categoria, p.immagine, p.prezzi, p.rivenditori, p.rivenditoriLogo, p.caratteristiche, p.caratteristicheAvanzate)
                //aggiungo la recensioni al prodotto
                product.addReview(reviewsStore.reviews);
                //Imposto la valutazione del prodotto
                product.setValutazion()
                //aggiungo il prodotto al catalogo
                catalog.addProduct(product)
            }),
        )

        //mi filtro i prodotti
        const filterCatalog = catalog.filterCatalog({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria})

        //appendo tutte le card, usando la ref
        catalog.appendToGrid(gridRef, filterCatalog)

        //Testo per il risultato di ricerca
        divTestualeTitleRef.current.textContent = flagFiltri.nome ? `${filterCatalog.length} risultati trovati per "${flagFiltri.nome.split('-').join(' ')}"` : `${filterCatalog.length} risultati trovati`;

    } catch(err) {
        console.log(err)
        //Se c'è un errore, ritorna una p con un messaggio di errore
        divTestualeTitleRef.current.textContent = `Errore nel recupero dei prodotti: ${err}`;
    }
}

const Catalogo = () => {
    //Imposto l'active e il titolo della pagina
    setActive('catalogo')
    document.title = 'Catalogo';

    //Mi creo la griglia
    const grid = DOM.div({className: 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 place-items-center', ref: gridRef}, [])
    
    //Mi prendo l'url spliitato
    const urlCategoria = document.location.href.split('categoria=')
    const urlRicerca = document.location.href.split('ricerca=')

    //Mi prendo l'url della categoria della pagina 
    flagFiltri.categoria = urlCategoria.length > 1 ? urlCategoria.pop() : null;

    //Mi prendo il campo di ricerca tramite l'url
    flagFiltri.nome = urlRicerca.length > 1 ? urlRicerca.pop() : null;

    //mi creo le ref
    const modalRef = createRef();
    const mainWrapperRef = createRef(); //Ref del wrapper che contiene sia i filtri che la griglia
    const sidebarRef = createRef(); //Ref della sidebar
    const inputSearchRef = createRef();
    const cancellaRicercaRef = createRef(); //Ref del bottone cancella ricerca

    //Mi creo la modal
    const modal = Modal({className: 'rounded-3xl'}, modalRef);

    //DOM element del div che contiene messaggi di errori/risultati di ricerca
    const divTestuale = DOM.div({className: 'text-left w-full flex flex-col lg:flex-row gap-3 lg:justify-between'}, [
        DOM.h6({className: '', ariaLive: 'polite', ref: divTestualeTitleRef}, [``]),
        Button({
            ref: cancellaRicercaRef,
            type: 'button', 
            status: 'ghost', 
            className: `underline items-center ${flagFiltri.nome ? 'flex' : 'hidden'}` , 
            onclick: () => { 
                //Rimuovo la visibilità del bottone
                cancellaRicercaRef.current.classList.add('hidden');
                cancellaRicercaRef.current.classList.remove('flex')
                //Azzerro la ricerca e il flag filtri
                flagFiltri.nome = null; 
                inputSearchRef.current.value = ''
                gridRef.current.innerHTML = '';
                getProducts(gridRef);
            }},
            [   'Cancella ricerca',
                DOM.createElFromHTMLString(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`)
            ])
    ])

    //Mi creo l'input per la ricerca
    const input = Input({
        name: 'searchbar-catalogo-mobile', 
        type: 'search', 
        ref: inputSearchRef,
        className: 'w-full', 
        label: 'Cerca un prodotto', 
        placeholder: 'Cerca un prodotto',
        onChange: filterInput,
    });

    function filterInput(inputEl) {
        //Controllo se l'input è vuoto o no
        if(inputEl.value.trim() !== '') {
            //mi salvo in una variabile l'input dell'utente, togliendo gli spazi
            flagFiltri.nome = inputEl.value.trim().split(' ').join('-');
            cancellaRicercaRef.current.classList.remove('hidden');
            cancellaRicercaRef.current.classList.add('flex')
        } else {
            cancellaRicercaRef.current.classList.add('hidden');
            cancellaRicercaRef.current.classList.remove('flex')
        }

        //Svuoto la griglia
        gridRef.current.innerHTML = ''
        
        catalog.sortProducts(flagFiltri.ordine);
  
        const filteredProducts= catalog.filterCatalog({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione, priceProduct: flagFiltri.prezzo})
        
        catalog.appendToGrid(gridRef, filteredProducts)

        //Testo per il risultato di ricerca
        divTestualeTitleRef.current.textContent = flagFiltri.nome ? `${filteredProducts.length} risultati trovati per "${flagFiltri.nome}"` : `${filteredProducts.length} risultati trovati`;
        
        //Assegno la callback al debounce
        /* const debounced = debounce(() => {
            
        }, 1000)

        //Richiamo i prodotti, con la stringa da confrontare
        debounced(); */
    }

    function orderGrid(selectEl = null) {
        //Svuoto la grida
        gridRef.current.innerHTML = '';

        //Assegno il valore della select alal variabile globale dei filtri
        flagFiltri.ordine = selectEl ? selectEl.value : null;

        const filteredProducts = catalog.filterCatalog({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione, priceProduct: flagFiltri.prezzo})
        //Mi creo un nuovo oggetto catalogo sul quale farò il sorting
        //visto che filterCatalog rilascia un array, ma non oggetto catalodo e quindi senza metodi 
        const filterCatalog = new Catalog();

        filteredProducts.forEach(p => filterCatalog.addProduct(p))

        //Ordino l'array;
        filterCatalog.sortProducts(flagFiltri.ordine);
        //Appendo il nuovo array alla griglia
        filterCatalog.appendToGrid(gridRef);
    }

    //Chiamo la funziona che fa appende alla griglia
    getProducts(gridRef)

    //Mi creo il dom element del badge
    const badge = DOM.div({ className: "badge badge-xs badge-primary hidden"}, [""]);

    return DOM.main({}, [
        //Sezione catalogo
        DOM.section({className: 'container my-8 lg:my-14'}, [
            //Titolo pagina (h1)
            DOM.h1({className: 'fs-2 font-semibold mb-8 text-center lg:text-left'}, ['Il nostro catalogo']),
            //contenitore principale
            DOM.div({className: 'grid grid-cols-1 lg:grid-cols-6 gap-8', ref: mainWrapperRef}, [
                //Sidebar che contiene i filtri
                //Visibile solo da desktop
                Sidebar({className: 'hidden lg:block lg:col-span-2', ref: sidebarRef, gridRef, divTestualeTitleRef, badge}),
                //Div che contiene searchbar, select e grid con catalogo
                //Su mobile è 1/1, da desktop 3/4
                DOM.div({className: 'flex flex-col gap-8 col-span-1 lg:col-span-4'}, [
                    DOM.div({className: 'flex flex-col lg:flex-row gap-4 w-full'}, [
                        input,
                        DOM.div({className: 'flex gap-4 w-full lg:w-1/3 '}, [
                            Button({
                                type: 'button', 
                                status: 'solid', 
                                className: 'w-1/2 flex-grow-[1] lg:hidden', 
                                onclick: () => {
                                setModal(modalRef, 'Filtra per', sidebarRef.current)
                                modalRef.current.showModal()}}, [
                                'Filtri',
                                DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`),
                                badge
                            ]),
                            Select({name: 'select-catalogo-mobile', className: 'w-1/2 lg:w-full h-full', onChange: orderGrid}, [
                                DOM.option({disabled: "true", selected: "true"}, ['Ordina per']),
                                DOM.option({}, ['Rilevanza']),
                                DOM.option({}, ['Recensioni più alte']),
                                DOM.option({}, ['Recensioni più basse']),
                                DOM.option({}, ['Prezzo più alto']),
                                DOM.option({}, ['Prezzo più basso']),
                            ])
                        ]),
                    ]),  
                    //Variabile del div che contiene messaggi di errore / risultati di ricerca
                    divTestuale,
                    //Griglia
                    grid,
                ])
            ]),
            modal
        ])
    ])
}

export default Catalogo;
/* export { getProducts }; */