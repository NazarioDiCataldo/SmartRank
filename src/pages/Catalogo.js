import DOM, { createRef } from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import setModal from '../utilities/setModal';
import Sidebar from '../components/Sidebar';
import Card from '../components/ui/Card';

const Catalogo = () => {
    //Imposto l'active e il titolo della pagina
    setActive('catalogo')
    document.title = 'Catalogo';

    //mi creo le ref
    const modalRef = createRef();
    const gridRef = createRef();
    const mainWrapperRef = createRef(); //Ref del wrapper che contiene sia i filtri che la griglia
    const sidebarRef = createRef(); //Ref della sidebar

    //Mi creo la modal
    const modal = Modal(modalRef);

    //Faccio la chiamata al js-server
    async function getProducts()  {
        try{
            const res = await fetch("http://localhost:3000/products")
            const data = await res.json();
            const products = DOM.fragment( 
                data.map(p => {
                    const {id, url, nome, marca, categoria, immagine, prezzi} = p;
                    return Card({id, url, cardOptions: {nome, marca, categoria, immagine, prezzi}, reviewObj: {idReview: 1, reviews: [3,4,5]} })
                }))
            //appendo tutte le card, usando la ref
            gridRef.current.append(products)
        } catch(err) {
            console.error(err);
        }
    }

    //Chiamo la funzione per appendere nel dom le card
    getProducts()

    return DOM.main({}, [
        //Sezione catalogo
        DOM.section({className: 'container my-8 lg:my-14'}, [
            //Titolo pagina (h1)
            DOM.h1({className: 'fs-2 font-semibold mb-8 text-center lg:text-left'}, ['Il nostro catalogo']),
            //contenitore principale
            DOM.div({className: 'grid grid-cols-1 lg:grid-cols-6 gap-8', ref: mainWrapperRef}, [
                //Sidebar che contiene i filtri
                //Visibile solo da desktop
                Sidebar({className: 'hidden lg:block lg:col-span-2', ref: sidebarRef}),
                //Div che contiene searchbar, select e grid con catalogo
                //Su mobile è 1/1, da desktop 3/4
                DOM.div({className: 'flex flex-col gap-8 col-span-1 lg:col-span-4'}, [
                    DOM.div({className: 'flex flex-col lg:flex-row gap-4 w-full'}, [
                        Input({name: 'searchbar-catalogo-mobile', type: 'search', className: 'w-full', label: 'Cerca un prodotto', placeholder: 'Cerca un prodotto'}),
                        DOM.div({className: 'flex gap-4 w-full lg:w-1/3 '}, [
                            Button({type: 'button', status: 'solid', className: 'w-1/2 lg:hidden', onclick: () => {
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
                    //Griglia
                    DOM.div({className: 'grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center', ref: gridRef}, [
                        
                    ])
                ])
            ]),
            modal
        ])
    ])
}

export default Catalogo