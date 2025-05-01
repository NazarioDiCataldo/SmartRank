import DOM, { createRef } from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import setModal from '../utilities/setModal';
import Sidebar, { flagFiltri } from '../components/Sidebar';
import Card from '../components/ui/Card';
import { averageCalculator } from '../utilities/setRating';
import { debounce } from 'lodash';
import { getReviews } from './Dettaglio';

const divTestualeTitleRef = createRef(); //Ref del div che contiene il testo (sia errore, che ricerca)
const divTestualeButtonRef = createRef();
const inputSearchRef = createRef();

//Funzione per la chiamata al js-server
export const getProducts = async ({nameProduct = flagFiltri.nome, categoryProduct = flagFiltri.categoria, valueProduct = flagFiltri.valutazione /* rangeProduct = null */}, gridRef) => {
    //Mi chiamo la funzione per prendermi tutte le recensioni
    const reviews = await getReviews()

    try{
        let cont = 0;
        const res = await fetch("http://localhost:3000/products")
        const data = await res.json();
        const products = DOM.fragment( 
            data.filter(p => {
                const arrayValues = []
                reviews.forEach(r => {
                    if(r.idProdotto === p.id) {
                        arrayValues.push(r.valutazione)
                    }
                })
                
                // Se nessun filtro è attivo, ritorna tutto
                if (!nameProduct && !categoryProduct && !valueProduct) {
                    
                    //Quindi vuol dire che il prodotto non sarà scartato
                    return true;
                }

                //Se ha superato la prima condizione, vuol dire che ci sono dei filtri
                //Andiamo a vedere se il prodotto passa le condizioni successive
                //Impostiamo di default true, quindi partiamo che il prodotto passerà
                let matches = true;

                //Se attivo il filtro nameProduct, il nome inserito dall'utente, vediamo se combacia
                if(nameProduct) {
                    //Matches sarà uguale a un true o false
                    //Verifichiamo prima che matches sia true, quindi per il momento il prodotto sta soddisfando i filtri precedenti
                    //Poi verifichiamo se la stringa passata dall'utente, sia inclusa nel nome del prodotto, trascritto tutto in minuscolo
                    matches = matches && p.nome.toLowerCase().includes(nameProduct.toLowerCase());
                }

                //Poi verifichiamo se è presente il filtro sulla categoria
                if(categoryProduct) {
                    //Prima verifichiamo che matches sia ancora true
                    //Poi verifichiamo se la categoria del prodotto, corrisponda a quella scelta dall'utente
                    matches = matches && p.categoria.toLowerCase() === categoryProduct.toLowerCase();
                }

                //Terza condizione: verificare se la valutazione del prodotto è maggiore o uguale a quella scelta dall'utente
                if (valueProduct) {
                    //Verifica se matches sia ancora true
                    //Mi calcolo la media delle recensioni, attraverso una funzione e verifico se questa è maggiore o uguale a quella chiesta dall'utente
                    matches = matches && averageCalculator(arrayValues) >= valueProduct;
                }

                //Alla fine di tutto ritorno matches
                //Se matches sarà ancora true, il prodotto soddisfa i filtri e sarà passato all'array finale, che verrà mappato
                //Se matches sarà false, il prodotto sarà scartato dall'array finale
                return matches;
            })
            .map(p => {
                const arrayValues = []
                reviews.forEach(r => {
                    if(r.idProdotto === p.id) {
                        arrayValues.push(r.valutazione)
                    }
                })
                
                cont++;
                const {id, url, nome, marca, categoria, immagine, prezzi} = p;
                return Card({id, url, cardOptions: {nome, marca, categoria, immagine, prezzi}, reviewObj: {reviews: arrayValues} })
            }),
        )
        
        if(nameProduct) {
            divTestualeButtonRef.current.classList.remove('hidden');
            divTestualeButtonRef.current.classList.add('flex')
            divTestualeTitleRef.current.textContent = `${cont} risultati trovati per "${nameProduct}"`;
        } else {
            divTestualeButtonRef.current.classList.add('hidden');
            divTestualeButtonRef.current.classList.remove('flex')
            divTestualeTitleRef.current.textContent = `${cont} risultati trovati`
        }

        //appendo tutte le card, usando la ref
        gridRef.current.append(products)

    } catch(err) {
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
    const gridRef = createRef();
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

    //Mi creo il div che contiene il testo
    const divTestuale = DOM.div({className: 'text-left w-full flex flex-col lg:flex-row gap-3 lg:justify-between'}, [
        DOM.h6({className: '', ref: divTestualeTitleRef, ariaLive: 'polite'}, ['']),
        Button({
            type: 'button', 
            status: 'ghost', 
            className: 'underline items-center hidden', 
            ref: divTestualeButtonRef,
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

    //Mi creo la griglia
    const grid = DOM.div({className: 'grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center', ref: gridRef}, [])

    function filterInput(inputEl) {
        //mi salvo in una variabile l'input dell'utente, togliendo gli spazi
        flagFiltri.nome = inputEl.value.trim() === '' ? null : inputEl.value.trim();

        //Svuoto la griglia
        gridRef.current.innerHTML = ''
        
        const debounced = debounce(() => getProducts({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione}, gridRef), 1000)

        //Richiamo i prodotti, con la stringa da confrontare
        debounced();
    }

    //Chiamo la funziona che fa la chiamata e appende alla griglia
    getProducts({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione}, gridRef);


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
                            Select({name: 'select-catalogo-mobile', className: 'w-1/2 lg:w-full h-full'}, [
                                DOM.option({disabled: "true", selected: "true"}, ['Ordina per']),
                                DOM.option({}, ['Recensioni più alte']),
                                DOM.option({}, ['Recensioni più basse']),
                            ])
                        ]),
                    ]),  
                    //Div testuale
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