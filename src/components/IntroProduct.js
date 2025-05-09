import DOM, { createRef } from 'just-dom';
import Link from './ui/Link';
import Rating from './ui/Rating';
import setRating from '../utilities/setRating';
import Colors from './ui/Colors';
import { allRatings } from './ReviewsProduct';

const IntroProduct = (product, reviews) => {
    //Mi creo i vari path per le breadcrumb
    const breadcrumbPaths = [
        {
            nome: 'Home',
            url: '/'
        }, 
        {
            nome: 'Catalogo',
            url: '/catalogo',
        }, 
        {
            nome: product.nome,
            url: `/catalogo/${product.url}`
        }
    ]

    //Mi creo i ref
    const ratingRef = createRef()
    const coloreRef = createRef() //Quando seleziono il colore, compare anche la label con il colore scelto
    const averageRef = createRef()

    //Mi creo l'oggetto rating per modificare le stelle
    const rating = Rating({idReview: `rating-${product.url}`, className: 'rating-md', ref: ratingRef});

    //array di valutazioni (stelle) 
    const arrayAllRatings = [];
    allRatings(reviews, arrayAllRatings)
    
    //Mi creo il dom elem della media
    const average = DOM.p({ref: averageRef},[])
    //Impostiamo il numero di stelle in base al numero di recensioni e la somma di queste
    setRating(arrayAllRatings, ratingRef, averageRef)

    return DOM.section({id: 'intro-product'}, [
        //breadcrumb
        DOM.div({className: 'flex gap-2'}, [
            ...breadcrumbPaths.map(({nome, url}) => {
                //Assegno la classe gruop a tutti i div parent
                return DOM.div({className: 'flex gap-2 group '}, [
                    Link({href: url, className: 'underline text-white', status: 'ghost'}, nome), 
                    DOM.span({className: 'group-last:hidden'}, ['/'])]) //Se questo è l'ultimo gruppo, allora questo span sarà nascosto
                })
        ]),
        //Div che contiene foto a sinistra e testo a destra
        DOM.div({className: 'w-full flex flex-col md:flex-row mt-8 gap-8'}, [
            //Contenitore dell'immagine
            DOM.div({className: 'w-full md:w-1/2 flex justify-center'}, [
                DOM.figure({className: 'w-5/6 lg:w-3/4'}, [
                    DOM.img({src: product.immagine, className: 'w-full object-contain h-full', alt: `Immagine di ${product.nome}, della ${product.marca}`})
                ])
            ]),
            DOM.div({className: 'w-full md:w-1/2 flex flex-col gap-6 md:gap-4 lg:gap-8'}, [
                //Div con titolo (nome prodotto) e sottotitolo (marca)
                DOM.div({className: 'flex gap-2 flex-col pt-4 md:pt-0 lg:pt-4'}, [
                    DOM.h1({className: 'fs-2 order-2'}, [`${product.nome}`]),
                    DOM.h2({className: 'order-1 text-white/60'}, [`${product.marca}`])
                ]),
                //Div con recensioni
                DOM.div({className: 'flex flex-col gap-3 w-full'}, [
                    DOM.div({className: 'flex gap-2 items-center lg:flex-wrap'}, [
                        rating,
                        average,
                        DOM.small({className: 'text-sm text-white/60 flex'}, [`${arrayAllRatings.length} ${arrayAllRatings.length === 1 ? 'recensione' : 'recensioni'}`]),
                    ]),
                    DOM.a({
                        href: '#reviews-product',
                        className: `d-block p-1 rounded-xl bg-transparent text-[#28E496] w-[100%] md:w-max
                                    transition-all duration-200 underline
                                    hover:text-[#28E496]
                                    focus:outline-none focus:ring-2 focus:ring-[#28E496]/40
                                    disabled:opacity-50 disabled:cursor-not-allowed`,
                        }, ['Leggi le recensioni'])
                ]),
                //Div con prezzo
                DOM.div({className: 'flex flex-col gap-2'}, [
                    DOM.span({className: 'text-white/60 flex gap-1 items-baseline'}, [
                        'a partire da',
                        DOM.p({className: 'text-xl text-white font-medium'}, [`${product.prezzi[0]} €`])
                    ]),
                    DOM.a({
                        href: '#prices-product',
                        className: `d-block p-1 rounded-xl bg-transparent text-[#28E496] w-[100%] md:w-max
                                    transition-all duration-200 underline
                                    hover:text-[#28E496]
                                    focus:outline-none focus:ring-2 focus:ring-[#28E496]/40
                                    disabled:opacity-50 disabled:cursor-not-allowed`,
                        }, ['Guarda le offerte'])
                ]),
                //Div con colori                
                  //Colors({color: cls, name: 'Colore', checked: true})
                DOM.div({className: 'flex flex-col gap-3'}, [
                    DOM.label({className: "body-lg text-white font-medium flex gap-2 items-baseline", htmlFor: 'colore'}, [
                        `Colore: `,
                        DOM.span({id: 'label-color', className: 'body-sm font-normal', ref: coloreRef}, ['Argento'])
                    ]),
                    DOM.div({className: 'flex gap-2'}, [
                        ...product.coloriClassi.map((cls, i) => Colors({className: cls, name: 'colore', checked: true, ref: coloreRef, color: product.colori[i]})) 
                    ])
                ])
            ])
        ])
    ])
}

export default IntroProduct;