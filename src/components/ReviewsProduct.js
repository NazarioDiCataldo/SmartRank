import DOM, { createRef } from 'just-dom'
import Bentobox from './Bentobox'
import Link from './ui/Link'
import setRating, { averageCalculator, calculateColor } from '../utilities/setRating'
import Rating from './ui/Rating'
import Progress from './ui/Progress'
import Input from './ui/Input'
import Button from './ui/Button'
import Select from './ui/Select'
import Review from './Review'

//Funzione che mette in un array tutte le valutazioni, per poi essere iterato
export function allRatings(reviews, arrayAllRatings) {
    reviews.forEach(r => {
        arrayAllRatings.push(r.valutazione)
    })
}

export function assignLabel(categoria) {
    let labels = []
    switch(categoria) {
        case 'smartphone': 
            labels = ['Fotocamera', 'Display', 'Batteria', 'Prestazioni']
            break
        case 'tablet': 
            labels = ['Fotocamera', 'Display', 'Batteria', 'Prestazioni']
            break
        case 'laptop': 
            labels = ['CPU', 'Display', 'Batteria', 'Memoria']
            break
        case 'cuffie': 
            labels = ['Autonomia', 'Audio', 'Microfono', 'Connettività'];
            break
        case 'smartwatch' :
            labels = ['Display', 'Sensori', 'Autonomia', 'App'];
            break
        case 'powerbank':
            labels = ['Capacità', 'Ricarica', 'Peso', 'Compatibilità']
            break
    }

    return labels;
}


const ReviewsProduct = (modalRef, reviews, categoria, nomeProdotto, slugProdotto) => {

    //Mi creo i ref
    const ratingRef = createRef()
    const averageRef = createRef()
    const gridRef = createRef()
    const inputSearchRef = createRef();
    const fallBackRef = createRef();

    //Messaggio in caso non ci siano recensioni
    const fallBack = DOM.div({className: `flex-col gap-3 w-full items-center ${reviews.length > 0 ? 'hidden' : 'flex'}`, ref: fallBackRef}, [
        DOM.p({className: 'font-medium body-lg'}, ['Questo prodotto non ha ancora recensioni']),
        Link({status:'solid', className: 'flex items-center gap-1', href: `/recensione?prodotto=${slugProdotto}`}, ['Racconta la tua esperienza'])
    ])

    //array di valutazioni (stelle) 
    const arrayAllRatings = [];
    allRatings(reviews, arrayAllRatings) //Array di stelle 
    
    //Mi inizializzo la matrice con i 4 indici
    const matrixValTech = [[],[],[],[]]

    //Mi riempio la matrice, dove ogni indice sarà occupato da un array 
    reviews.forEach(r => {
        r.valutazioniTecniche.forEach(({valore}, i) => {
            matrixValTech[i].push(valore)
        })
    })
    
    //Mi creo il label di etichette, in base alla categoria del prodotto
    const labels = assignLabel(categoria)

    //Per una maggiore chiarezza, mi creo un'array di oggetti che conterrà la label e la media delle valutazioni
    const objProgress = [];

    matrixValTech.forEach((r, i) => {
        objProgress[i] = {
            'etichetta': labels[i],
            'mediaValori': averageCalculator(r)
        }
    })

    //Mi calcolo la media delle recensioni
    const av = averageCalculator(arrayAllRatings);
    const avColor = calculateColor(av)

    //Mi creo l'oggetto rating per modificare le stelle
    const rating = Rating({idReview: 'rating-prodotto', ref: ratingRef, className: 'rating-sm'});

    //Mi creo il dom elem della media
    const average = DOM.p({ ref: averageRef},[])
    //Impostiamo il numero di stelle in base al numero di recensioni e la somma di queste
    setRating(arrayAllRatings, ratingRef, averageRef)

    //Mi creo l'input per la ricerca
    const input = Input({
        name: 'searchbar-catalogo-mobile', 
        type: 'search', 
        ref: inputSearchRef,
        classNameDiv: 'w-full lg:w-3/5', 
        label: 'Cerca un prodotto', 
        placeholder: 'Cerca un prodotto',
        //onChange: filterInput,
    });
    //Mi creo le prograss bar delle varie specifiche tecniche
    const arrayProgress = objProgress.map(({etichetta, mediaValori}) => Progress({value: mediaValori, labelText: etichetta, className: '!w-full' }))

    return DOM.section({id: 'reviews-product', className: 'bento-box border-white/5 border-[1px] rounded-lg backdrop-blur-lg p-5'},[
        DOM.h3({className: 'fs-4 font-semibold mb-8'}, [`Tutte le recensioni su ${nomeProdotto}`]),
        //Griglia
        DOM.div({className: 'grid grid-cols-1 md:grid-cols-8 lg:grid-cols-7 gap-12 md:gap-8', ref: gridRef}, [
            //Div di sinistra
            DOM.div({className: 'flex flex-col col-span-full md:col-span-3 lg:col-span-2'}, [
                //Sidebar con media recensioni
                DOM.div({className:' h-max md:sticky md:top-[2rem]'}, [
                    Bentobox({className: '!h-max flex flex-col md:flex-row flex-wrap gap-4 md:justify-between items-center align-center mb-8'}, [
                        //Media recensioni
                        DOM.div({className: ' flex flex-col items-center gap-2 grow-[1]'},[
                            DOM.h5({className: `${avColor.text} fs-3 text-center w-full`}, [`${av}`]),
                            //Rating
                            DOM.div({className: 'flex gap-2 items-center flex-col'}, [
                                DOM.p({className: `${avColor.text} text-center`}, [`${avColor.content}`]),
                                rating,
                                DOM.small({className: 'text-sm text-white/60 '}, [`${arrayAllRatings.length} ${arrayAllRatings.length === 1 ? 'recensione' : 'recensioni'}`]),
                            ]),
                        ]),
                        //Progress bar
                        DOM.div({className: `flex-col w-full gap-2 ${reviews.length > 0 ? 'flex' : 'hidden'}`}, [
                            ...arrayProgress
                        ])
                    ]),
                    //CTA per le recensioni
                    DOM.div({className: `flex-col gap-3 ${reviews.length > 0 ? 'flex' : 'hidden'}`}, [
                        DOM.p({className: 'font-medium body-lg'}, ['Hai provato questo prodotto?']),
                        Link({status:'ghost', className: 'underline flex items-center gap-1', href: `/recensione?prodotto=${slugProdotto}`}, [
                            'Racconta la tua esperienza',
                            DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-line-icon lucide-pen-line"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>`)
                        ])
                    ])
                ]),
            ]),
            //Recensioni
            DOM.div({className: 'flex flex-col gap-8 col-span-1 md:col-span-5 lg:col-span-5'}, [
                //Div che contiene i filtri
                DOM.div({className: `flex-col lg:flex-row gap-4 w-full hidden`}, [
                    //barra di ricercaa
                    input,
                    //div che contiene la select e il bottone
                    DOM.div({className: 'flex gap-4 w-full lg:w-2/5 '}, [
                        //bottone che aziona la modal con i filtri
                        Button({
                            type: 'button', 
                            status: 'solid', 
                            className: '!w-1/2 md:!w-max', 
                            onclick: () => {
                            setModal(modalRef, 'Filtra per', 'sidebarRef.current')
                            modalRef.current.showModal()}}, [
                            'Filtri',
                            DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`)
                        ]),
                        //Select per ordinare
                        Select({name: 'select-recensioni', className: 'h-full'}, [
                            DOM.option({disabled: "true", selected: "true"}, ['Ordina per']),
                            DOM.option({}, ['Recensioni più alte']),
                            DOM.option({}, ['Recensioni più basse']),
                        ])
                    ]),
                ]),  
                //Div che contiene le recensioni
                DOM.div({className: 'flex flex-col gap-8'},[
                    fallBack,
                    ...reviews.map(r => {
                        return Review(modalRef, r,  false)
                    })
                ])
            ])
        ])
    ])
}

export default ReviewsProduct