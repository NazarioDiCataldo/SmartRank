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
import ReviewsStore from '../classes/reviews_store'
import Modal from './ui/Modal'
import setModal from '../utilities/setModal'
import Filter from './ui/Filter'

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

const flagFiltri = {
    valutazione: null,
    data: null,
    titolo: null,
    ordine: 'Rilevanza'
}

const ReviewsProduct = (modalRef, reviewsStore, categoria, nomeProdotto, slugProdotto) => {

    //Funzione per filtrare le recensioni in base a quello che scrive l'utente
    function filterInput(inputEl) {
        //Controllo attraverso l'attributo data-name
        const naming = inputEl.getAttribute('data-name')

        //Controllo a quale tipo di filtri appartiene e modifico il flag
        switch(naming){
            case 'titolo':
                if(inputEl.value.trim() === '') {
                    flagFiltri[naming] = null
                } else {
                    flagFiltri[naming] = inputEl.value.trim();
                }
                break;
            case 'valutazione': 
                flagFiltri[naming] = valutazioneRef.current.querySelector('input[type=radio]:checked')?.value; //Trasformo il valore della valutazione in int
                break;
            case 'data': 
                //Siccome il value delle radio è nel formato '[num]-days', a me interessa solo il primo numero
                //Quindi splitto il value per prendermi solo il numero di giorni precedenti e lo trasformo in int
                const isChecked = dataPubblicazioneRef.current.querySelector('input[type=radio]:checked')
                if(isChecked.length === 0 || isChecked.value === 'default') {
                    flagFiltri[naming] = null
                } else {
                    flagFiltri[naming] = isChecked.value.split('-').shift()
                } 
                break;
            case 'ordine':
                flagFiltri[naming] = inputEl?.value;
                break;
            
            //Se clicco il tasto reset nei filtri per la valutazione, azzera i filtri per la valutazione
            case 'reset':
                flagFiltri.valutazione = null;
                break;
            
        }

        //Prima svuogo la griglia di recensioni
        reviewsDivRef.current.innerHTML = ''

        //Mi salvo su una variabile il nuovo array filtrato
        const newStore = reviewsStore.filterReviews({titleReview: flagFiltri.titolo, valueReview: flagFiltri.valutazione, dateReview: flagFiltri.data})
       
        //Mi creo un secondo catalogo che contiene solo i prodotti filtrati
        const filteredReviews = new ReviewsStore(newStore);

        //Mi salvo le variabili di fallback in caso non ci sia nessuna recensione, dopo il filtraggio
        const fallBackParagraph = fallBackRef.current.querySelector('p')
        const fallBackLink = fallBackRef.current.querySelector('a')

        //Se l'array di recensioni filtrati è vuoto, prevedo un messaggio che invita a cambiare i filtri di ricerca
        if(filteredReviews.reviews.length === 0) {
            fallBackRef.current.classList.remove('hidden')
            fallBackRef.current.classList.add('flex')

            fallBackParagraph.textContent = 'Nessun prodotto trovato. Prova a cambiare i filtri di ricerca';
            fallBackLink.classList.remove('flex')
            fallBackLink.classList.add('hidden')
        } else {
            //Se invece la ricerca porta a qualcosa, azzero le modifiche fatte alle fallback
            fallBackRef.current.classList.add('hidden')
            fallBackRef.current.classList.remove('flex')

            fallBackParagraph.textContent = 'Questo prodotto non ha ancora recensioni';
            fallBackLink.classList.add('flex')
            fallBackLink.classList.remove('hidden')
        }

        //Se sono attivi dei filtri, aggiungo un badge al bottone dei filtri
        //Migliora la UX
        //Se attivo un solo filtro uscirà 1, se attivi 2 uscirà 2, mentre se nessun filtri è attivo allora il badge sarà nascosto

        let contatore = 0;//Mi creo il contatore, che sarà incrementato ogni volta che un filtro è attivo

        if(flagFiltri.valutazione) contatore++;
        
        if(flagFiltri.data) contatore++;
        
        if(contatore === 0) {
            badge.classList.add('hidden')
        } else {
            badge.textContent = `${contatore}`
            badge.classList.remove('hidden');
        }
        
        //Ordino l'array;
        filteredReviews.sortReviews(flagFiltri.ordine);

        //Appendo alla griglia il nuovo array filtrato
        filteredReviews.appendToGrid(reviewsDivRef.current, modalRef.current)
    }

    //Mi creo i ref
    const ratingRef = createRef()
    const averageRef = createRef()
    const gridRef = createRef()
    const inputSearchRef = createRef();
    const fallBackRef = createRef();
    const reviewsDivRef = createRef();
    const modalFiltersRef = createRef();
    const valutazioneRef = createRef();
    const dataPubblicazioneRef = createRef();

    //Messaggio in caso non ci siano recensioni
    const fallBack = DOM.div({className: `flex-col gap-3 w-full items-center ${reviewsStore.reviews.length > 0 ? 'hidden' : 'flex'}`, ref: fallBackRef}, [
        DOM.p({className: 'font-medium body-lg'}, ['Questo prodotto non ha ancora recensioni']),
        Link({status:'solid', className: 'flex items-center gap-1', href: `/recensione?prodotto=${slugProdotto}`}, ['Racconta la tua esperienza'])
    ])

    //array di valutazioni (stelle) 
    const arrayAllRatings = [];
    allRatings(reviewsStore.reviews, arrayAllRatings) //Array di stelle 
    
    //Mi inizializzo la matrice con i 4 indici
    const matrixValTech = [[],[],[],[]]

    //Mi riempio la matrice, dove ogni indice sarà occupato da un array 
    reviewsStore.reviews.forEach(r => {
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
        name: 'searchbar-titolo', 
        dataName: 'titolo',
        type: 'search', 
        ref: inputSearchRef,
        classNameDiv: 'col-span-1 h-full',
        className: '!w-full', 
        label: 'Cerca un prodotto', 
        placeholder: 'Cerca un prodotto',
        onBlur: filterInput,
    });
    //Mi creo le prograss bar delle varie specifiche tecniche
    const arrayProgress = objProgress.map(({etichetta, mediaValori}) => Progress({value: mediaValori, labelText: etichetta, className: '!w-full' }))

    //Div che contiene le reviews
    const reviewsDiv = DOM.div({className: 'flex flex-col gap-8'},[
        fallBack,
        DOM.div({id:'reviewsDiv', className:'flex flex-col gap-8', ref: reviewsDivRef},[
            ...reviewsStore.reviews.reverse().map(r => {
                return Review(modalRef, r,  false)
            })
        ])
    ])

    //Variabile con classi comuni dei filtri sulla valutazione
    const classNameFilterVal = 'xl:grow-[1] btn-outline !mx-0 checked:rounded-lg group-has-[input:checked]:grow-0';

    //Array di oggetti con tutti i valori dei filtri, che verrà iterato
    const filterVal = [
        {
            type: 'filter',
            value: '4.5',
            name: '★ 4.5 +',
            label: '4.5 stelle',
            dataName: 'valutazione',
            className: classNameFilterVal + ' lg:rounded-r-none',
            onClick: (e) => {filterInput(e.target)}
        },
        {
            type: 'filter',
            value: '4',
            name: '★ 4 +',
            label: '4 stelle',
            dataName: 'valutazione',
            className: classNameFilterVal + ' lg:rounded-none',
            onClick: (e) => {filterInput(e.target)}
        },
        {
            type: 'filter',
            value: '3',
            name: '★ 3 +',
            label: '3 stelle',
            dataName: 'valutazione',
            className: classNameFilterVal + ' lg:rounded-l-none',
            onClick: (e) => {filterInput(e.target)}
        }
    ]

    //Array di oggetti con i radio
    const filterDate = [
        {
            name: 'radio-data',
            dataName: 'data',
            value: 'default',
            label: 'Tutte le recensioni',
            checked: true,
        },
        {
            name: 'radio-data',
            dataName: 'data',
            value: '30-days',
            label: 'Ultimi 30 giorni',
            checked: false,
        },
        {
            name: 'radio-data',
            dataName: 'data',
            value: '90-days',
            label: 'Ultimi 3 mesi',
            checked: false,
        },
        {
            name: 'radio-data',
            dataName: 'data',
            value: '182-days',
            label: 'Ultimi 6 mesi',
            checked: false,
        },
        {
            name: 'radio-data',
            dataName: 'data',
            value: '365-days',
            label: 'Ultimi 12 mesi',
            checked: false,
        }
    ]

    //Filtri valutazione
    const formRatingsFilter = DOM.div({className: ''}, [
        DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Valutazione']),
        //Form che contiene i bottoni
        DOM.form({
            className: 'justify-start filter gap-2 xl:gap-0 h-max group has-[input:checked]:gap-0', 
            ref: valutazioneRef},[
            Filter({type: 'reset', className: 'mr-2', name: 'valutazione', dataName: 'reset', label: 'Resetta filtri sulla valutazione', onClick: (e) => {filterInput(e.target)} }),
            ...filterVal.map(({type, name, label, value, className, dataName, onClick}) => Filter({type, name, label, value, dataName, className, onClick}))
        ])
    ])

    //Filtri data di pubblicazione
    const formDateFilter = DOM.div({className: ''}, [
        DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Data di pubblicazione']),
        //Form che contiene i radio
        DOM.form({
            className: 'flex flex-col gap-4',
            ref: dataPubblicazioneRef,
        }, [
            ...filterDate.map(({name, value, label, checked, dataName}) => {
                return DOM.div({className: 'flex gap-2'}, [
                    DOM.input({
                        type: "radio",
                        name,
                        value,
                        dataName,
                        className: "radio radio-accent",
                        checked: `${checked ? 'checked' : ''}`,
                        onchange: (e) => {filterInput(e.target)}
                    }),
                    DOM.label({htmlFor: `${name}`, className: 'font-medium'}, [`${label}`])
                ])
            })
        ])
    ])

    //Mi creo la modal per i filtri
    const modalFilters = Modal({className: 'rounded-3xl'}, modalFiltersRef);
    //Imposto la modal per i filtri
    setModal(modalFiltersRef, 'Filtra per', DOM.div({className: 'p-5 bento-box rounded-xl flex flex-col gap-5'}, [
        formRatingsFilter,
        formDateFilter
    ]));

    const badge = DOM.div({ className: "badge badge-xs badge-primary hidden"}, [""]);

    //bottone che apre la modal dei filtri
    const buttonFilters = Button({
        type: 'button', 
        status: 'solid', 
        className: '!col-span-1 !w-full', 
        onclick: () => {
        modalFiltersRef.current.showModal()}}, [
        'Filtri',
        DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`),
        badge
    ]);

    return DOM.section({id: 'reviews-product', className: 'bento-box border-white/5 border-[1px] rounded-lg backdrop-blur-lg p-4 md:p-5'},[
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
                            DOM.h5({className: `${avColor.text} fs-1 text-center w-full`}, [`${av}`]),
                            //Rating
                            DOM.div({className: 'flex gap-2 items-center flex-col'}, [
                                DOM.p({className: `${avColor.text} text-center`}, [`${avColor.content}`]),
                                rating,
                                DOM.small({className: 'text-sm text-white/60 '}, [`${arrayAllRatings.length} ${arrayAllRatings.length === 1 ? 'recensione' : 'recensioni'}`]),
                            ]),
                        ]),
                        //Progress bar
                        DOM.div({className: `flex-col w-full gap-2 ${reviewsStore.reviews.length > 0 ? 'flex' : 'hidden'}`}, [
                            ...arrayProgress
                        ])
                    ]),
                    //CTA per le recensioni
                    DOM.div({className: `flex-col gap-3 ${reviewsStore.reviews.length > 0 ? 'flex' : 'hidden'}`}, [
                        DOM.p({className: 'font-medium body-lg'}, ['Hai provato questo prodotto?']),
                        Link({status:'solid', className: 'flex items-center gap-1', href: `/recensione?prodotto=${slugProdotto}`}, [
                            'Scrivi la tua esperienza',
                            DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-line-icon lucide-pen-line"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>`)
                        ])
                    ])
                ]),
            ]),
            //Recensioni
            DOM.div({className: 'flex flex-col gap-8 col-span-1 md:col-span-5 lg:col-span-5'}, [
                //Div che contiene i filtri
                DOM.div({className: `grid grid-cols-1 md:grid-cols-2 gap-4 w-full`}, [
                    //barra di ricercaa
                    input,
                    //div che contiene la select e il bottone
                    DOM.div({className: 'grid grid-cols-2 md:grid-cols-3 col-span-1 gap-4'}, [
                        //bottone che aziona la modal con i filtri
                        buttonFilters,
                        //Select per ordinare
                        Select({
                            name: 'select-ordine', 
                            dataName: 'ordine',
                            onChange: filterInput,
                            className: 'col-span-1 md:col-span-2'}, [
                            DOM.option({disabled: "true", selected: "true"}, ['Ordina per']),
                            DOM.option({}, ['Recensioni più recenti']),
                            DOM.option({}, ['Recensioni meno recenti']),
                            DOM.option({}, ['Valutazioni più alte']),
                            DOM.option({}, ['Valutazioni più basse']),
                        ])
                    ]),
                ]),  
                //Div che contiene le recensioni
                reviewsDiv
            ])
        ]),
        modalFilters
    ])
}

export default ReviewsProduct