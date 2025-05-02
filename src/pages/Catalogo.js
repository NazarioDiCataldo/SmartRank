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

const divTestualeTitleRef = createRef(); //Ref del div che contiene il testo (sia errore, che ricerca)
const gridRef = createRef();
const inputSearchRef = createRef();

//Mi creo l'oggetto catalogo
const catalog = new Catalog();

//Funzione per la chiamata al js-server
export const getProducts = async (gridRef) => {
    //Mi chiamo la funzione per prendermi tutte le recensioni
    const reviews = await getReviews()

    try{
        const res = await fetch("http://localhost:3000/products")
        const data = await res.json();
        const products = DOM.fragment( 
            data
            .map(p => {
                //Mi creo l'oggetto prodotto
                const product = new Product(p.id, p.nome, p.url, p.marca, p.categoria, p.immagine, p.prezzi, p.rivenditori, p.rivenditoriLogo, p.caratteristiche, p.caratteristicheAvanzate)
                //aggiungo la recensioni al prodotto
                product.addReview(reviews);
                //Imposto la valutazione del prodotto
                product.setValutazion()
                //aggiungo il prodotto al catalogo
                catalog.addProduct(product)
            }),
        )

        //appendo tutte le card, usando la ref
        catalog.appendToGrid(gridRef)

        //Testo per il risultato di ricerca
        divTestualeTitleRef.current.textContent = flagFiltri.nome ? `${catalog.products.length} risultati trovati per "${flagFiltri.nome}"` : `${catalog.products.length} risultati trovati`;

    } catch(err) {
        console.error(err)
        //Se c'è un errore, ritorna una p con un messaggio di errore
        divTestualeTitleRef.current.textContent = `Errore nel recupero dei prodotti: ${err}`;
    }
}

const Catalogo = () => {
    
    //Imposto l'active e il titolo della pagina
    setActive('catalogo')
    document.title = 'Catalogo';
    
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

    //Mi creo la modal
    const modal = Modal({className: 'rounded-3xl'}, modalRef);

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

    //Mi creo la griglia
    const grid = DOM.div({className: 'grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center', ref: gridRef}, [])

    function filterInput(inputEl) {
        //mi salvo in una variabile l'input dell'utente, togliendo gli spazi
        flagFiltri.nome = inputEl.value.trim() === '' ? null : inputEl.value.trim();

        //Svuoto la griglia
        gridRef.current.innerHTML = ''
        
        catalog.sortProducts(flagFiltri.ordine);
  
        const filteredProducts= catalog.filterCatalog({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione})
        
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

        const filteredProducts = catalog.filterCatalog({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione})
        //Mi creo un nuovo oggetto catalogo sul quale farò il sorting
        //visto che filterCatalog rilascia un array, ma non oggetto catalodo e quindi senza metodi 
        const filterCatalog = new Catalog();

        filteredProducts.forEach(p => filterCatalog.addProduct(p))

        //Ordino l'array;
        filterCatalog.sortProducts(flagFiltri.ordine);
        //Appendo il nuovo array alla griglia
        filterCatalog.appendToGrid(gridRef);
    }

    //DOM element del div che contiene messaggi di errori/risultati di ricerca
    const divTestuale = DOM.div({className: 'text-left w-full flex flex-col lg:flex-row gap-3 lg:justify-between'}, [
        DOM.h6({className: '', ariaLive: 'polite', ref: divTestualeTitleRef}, [``]),
        Button({
            type: 'button', 
            status: 'ghost', 
            className: `underline items-center ${flagFiltri.nome ? 'flex' : 'hidden'}` , 
            onclick: () => { 
                flagFiltri.nome = null; 
                inputSearchRef.current.value = ''
                getProducts({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione}, gridRef);
            }},
            [   'Cancella ricerca',
                DOM.createElFromHTMLString(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`)
            ])
    ])

    //Chiamo la funziona che fa la chiamata e appende alla griglia
    getProducts(gridRef);

    return DOM.main({}, [
        //Sezione catalogo
        DOM.section({className: 'container my-8 lg:my-14'}, [
            //Titolo pagina (h1)
            DOM.h1({className: 'fs-2 font-semibold mb-8 text-center lg:text-left'}, ['Il nostro catalogo']),
            //contenitore principale
            DOM.div({className: 'grid grid-cols-1 lg:grid-cols-6 gap-8', ref: mainWrapperRef}, [
                //Sidebar che contiene i filtri
                //Visibile solo da desktop
                Sidebar({className: 'hidden lg:block lg:col-span-2', ref: sidebarRef, gridRef}),
                //Div che contiene searchbar, select e grid con catalogo
                //Su mobile è 1/1, da desktop 3/4
                DOM.div({className: 'flex flex-col gap-8 col-span-1 lg:col-span-4'}, [
                    DOM.div({className: 'flex flex-col lg:flex-row gap-4 w-full'}, [
                        input,
                        DOM.div({className: 'flex gap-4 w-full lg:w-1/3 '}, [
                            Button({
                                type: 'button', 
                                status: 'solid', 
                                className: 'w-1/2 lg:hidden', 
                                onclick: () => {
                                setModal(modalRef, 'Filtra per', sidebarRef.current)
                                modalRef.current.showModal()}}, [
                                'Filtri',
                                DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`)
                            ]),
                            Select({name: 'select-catalogo-mobile', className: 'w-1/2 lg:w-full h-full', onChange: orderGrid}, [
                                DOM.option({disabled: "true", selected: "true"}, ['Ordina per']),
                                DOM.option({}, ['Rilevanza']),
                                DOM.option({}, ['Recensioni più alte']),
                                DOM.option({}, ['Recensioni più basse']),
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