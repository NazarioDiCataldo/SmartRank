import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';
import Filter from './ui/Filter';
import Button from './ui/Button';
import {debounce} from 'lodash'
import Catalog from '../classes/catalog';
import setRangeSlider from '../utilities/setRangeSlider';
import noUiSlider from 'nouislider';

//Flag globali 
//Dovranno essere esportati su catalogo, per coordinare i filtri divisi tra le varie pagine
export const flagFiltri = {
    valutazione: null,
    categoria: null,
    nome: null,
    prezzo: null, //[]
    ordine: 'Rilevanza'
}

//Mi creo l'oggetto catalogo
const catalog = new Catalog();
await catalog.loadProducts();

const Sidebar = ({className = '', ref, gridRef, divTestualeTitleRef}) => {
    
    //Variabile con classi comuni dei filtri sulla valutazione
    const classNameFilterVal = 'xl:grow-[1] btn-outline !mx-0 checked:rounded-lg group-has-[input:checked]:grow-0';
    //Variabile con classi comuni sui filtri sulla categoria
    const classNameFilterCat = 'btn-soft rounded-full bg-accent/10 m-2 hover:text-white/80 focus:text-white/80 active:text-white checked:text-white';

    //Array di oggetti con tutti i valori dei filtri, che verrà iterato
    const filterVal = [
        {
            type: 'filter',
            value: '4.5',
            name: '★ 4.5 +',
            label: '4.5 stelle',
            className: classNameFilterVal + ' xl:rounded-r-none',
            onClick: () => {filtraPer(gridRef)}
        },
        {
            type: 'filter',
            value: '4',
            name: '★ 4 +',
            label: '4 stelle',
            className: classNameFilterVal + ' xl:rounded-none',
            onClick: () => {filtraPer(gridRef)}
        },
        {
            type: 'filter',
            value: '3',
            name: '★ 3 +',
            label: '3 stelle',
            className: classNameFilterVal + ' xl:rounded-l-none',
            onClick: () => {filtraPer(gridRef)}
        }
    ]

    //Array di valori di ogni filtro sulla categoria
    const filterCategory = [{
        type: 'filter', 
        value: 'smartphone', 
        name: 'Smartphone', 
        label: 'smartphone', 
        className: classNameFilterCat,
        onClick: () => {filtraPer(gridRef)}
    },
    {
        type: 'filter', 
        value: 'tablet', 
        name: 'Tablet', 
        label: 'tablet', 
        className: classNameFilterCat,
        onClick: () => {filtraPer(gridRef)}
    },
    {
        type: 'filter', 
        value: 'laptop', 
        name: 'Laptop', 
        label: 'laptop', 
        className: classNameFilterCat,
        onClick: () => {filtraPer(gridRef)}
    },
    {
        type: 'filter', 
        value: 'smartwatch', 
        name: 'Smartwatch', 
        label: 'smartwatch', 
        className: classNameFilterCat,
        onClick: () => {filtraPer(gridRef)}
    },
    {
        type: 'filter', 
        value: 'powerbank', 
        name: 'Powerbank', 
        label: 'powerbank', 
        className: classNameFilterCat,
        onClick: () => {filtraPer(gridRef)}
    },
    {
        type: 'filter', 
        value: 'cuffie', 
        name: 'Cuffie', 
        label: 'cuffie', 
        className: classNameFilterCat,
        onClick: () => {filtraPer(gridRef)}
    }]

    //Resetta i filtri in questione
    function resetFilter(resetInput, gridRef) {
        console.log(flagFiltri.prezzo)

        //Svuoto la griglia
        gridRef.current.innerHTML = '';

        //Svuoto la proprietà sul filtro
        flagFiltri[resetInput.name] = null
        
        //Filtri il catalogo in base ai filtri
        const filteredProducts = catalog.filterCatalog({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione, priceProduct: flagFiltri.prezzo})
        
        //Mi creo un secondo catalogo che contiene solo i prodotti filtrati
        const filteredCatalog = new Catalog(filteredProducts);
        
        //Ordino l'array;
        filteredCatalog.sortProducts(flagFiltri.ordine);

        //Imposto il numero di prodotti trovati, dopo aver impostato i filtri
        divTestualeTitleRef.current.textContent = filteredCatalog.products.length !== 1 ? `${filteredCatalog.products.length} risultati trovati` : `${filteredCatalog.products.length} risultato trovato`;
        
        //Appendo alla griglia il nuovo array filtrato
        filteredCatalog.appendToGrid(gridRef)
    }

    function filtraPer(gridRef) {
        console.log(flagFiltri.prezzo)

        //Mi prendo i valori degli input dei filtri
        flagFiltri.valutazione = valutazioneRef.current.querySelector('input[type=radio]:checked')?.value; //Input radio valutazione
        flagFiltri.categoria = categoriaRef.current.querySelector('input[type=radio]:checked')?.value; //Input radio categoria
        flagFiltri.prezzo = rangeSliderRef.current.noUiSlider.get();

        //Svuoto la griglia
        gridRef.current.innerHTML = '';

        //Filtri il catalogo in base ai filtri
        const filteredProducts = catalog.filterCatalog({nameProduct: flagFiltri.nome, categoryProduct: flagFiltri.categoria, valueProduct: flagFiltri.valutazione, priceProduct: flagFiltri.prezzo})
        
        //Mi creo un secondo catalogo che contiene solo i prodotti filtrati
        const filteredCatalog = new Catalog(filteredProducts);
        
        //Ordino l'array;
        filteredCatalog.sortProducts(flagFiltri.ordine);

        //Imposto il numero di prodotti trovati, dopo aver impostato i filtri
        divTestualeTitleRef.current.textContent = filteredCatalog.products.length !== 1 ? `${filteredCatalog.products.length} risultati trovati` : `${filteredCatalog.products.length} risultato trovato`;
        
        //Appendo alla griglia il nuovo array filtrato
        filteredCatalog.appendToGrid(gridRef)
    }

    //Mi creo i ref
    const valutazioneRef = createRef();
    const categoriaRef = createRef();
    const rangeSliderRef = createRef();

    const rangeSlier = DOM.div({ref: rangeSliderRef})

    //Funzione per settare lo slider range
    setRangeSlider(rangeSliderRef.current)

    //Funzione che si attiva quando cambio il valore dello slider
    rangeSliderRef.current.noUiSlider.on('end.one', () => {filtraPer(gridRef)})

    //Mi creo in anticipo il DOM element cosi da poter usare il ref della categoria
    const categoryForm = DOM.form({className: 'filter justify-start flex', ref: categoriaRef},[
        Filter({type: 'reset', name: 'categoria', label: 'Resetta filtri sulla categoria', className: 'btn-soft rounded-full bg-accent/10 m-2', onClick: (e) => {resetFilter(e.target, gridRef)} }),
        ...filterCategory.map(({type, name, label, value, className, onClick}) => Filter({type, name, label, value, className, onClick}))
    ]);

    //Se il filtro proviene direttamente dall'url, il pulsante della categoria in questione viene già 'evidenziato'
    function syncCategoryFilter() {
        categoriaRef.current.querySelectorAll('input[type=radio]')
        .forEach(elem => {
            if(elem.value === flagFiltri.categoria) {
                elem.checked = true;
            }
        })
        /* categoriaRef.current.querySelectorAll('input[type=radio]')
        .find(elem => elem.value === flagFiltri.categoria) */
    }
    syncCategoryFilter();

    return DOM.aside({className: twMerge('p-5 bento-box rounded-2xl h-max sticky top-[2rem]', className)}, [
        DOM.h4({className: 'fs-5 font-semibold mb-5'}, ['Filtra per']),
        DOM.div({className: ''}, [
            //Div con tutti i filtri
            DOM.div({className: 'p-5 bento-box rounded-xl flex flex-col gap-5', ref}, [
                //Filtri valutazione
                DOM.div({className: ''}, [
                    DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Valutazione']),
                    //Form che contiene i bottoni
                    DOM.form({className: 'justify-start filter gap-2 xl:gap-0 h-max group has-[input:checked]:gap-0', ref: valutazioneRef},[
                        Filter({type: 'reset', className: 'mr-2', name: 'valutazione', label: 'Resetta filtri sulla valutazione', onClick: (e) => {resetFilter(e.target, gridRef)} }),
                        ...filterVal.map(({type, name, label, value, className, onClick}) => Filter({type, name, label, value, className, onClick}))
                    ])
                ]),
                //Filtri Categoria
                DOM.div({className: ''}, [
                    DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Categoria']),
                    //Form che contiene i bottoni
                    categoryForm,
                ]),
                //Filtri prezzo
                DOM.div({className: ''}, [
                    DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Prezzo']),
                    //Semplice div che diventerà un range slider
                    rangeSlier,
                ])
            ]),
            //Div con i bottoni
            /* DOM.div({className: 'flex gap-3 mt-4'}, [
                //Resetta filtri
                Button({type: 'reset', status: 'outline', className: 'grow-[1]'}, ['Reimposta']),
                //Applica filtri
                Button({type: 'button', status: 'solid', className: 'grow-[1]', onclick: () => filtraPer(gridRef)}, ['Applica']),
            ]) */
        ])
    ]);
}

export default Sidebar;