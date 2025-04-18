import DOM, { createRef } from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";
import Searchbar from '../components/Searchbar';
import Bentobox from '../components/Bentobox';
import HorizontalCard from '../components/ui/HorizontalCard';
import initializeRating from '../utilities/setRating';


const Homepage = () => {
    const bentoListFragments = [
        //box 1: Cos'è SmartRank
        {
            id: 'bento-1',
            className: 'col-span-6 md:col-span-2',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Cos'è SmartRank?`]),
                DOM.div({className: 'flex flex-col gap-2'}, [
                    DOM.p({}, [
                        'SmartRank è la piattaforma dove appassionati di tecnologia condividono ',
                        DOM.strong({}, [
                            'recensioni autentiche'
                        ]),
                        '.'
                    ]),
                    DOM.p({}, [
                        'Confronta i prezzi, leggi ',
                        DOM.strong({}, [
                            'esperienze reali '
                        ]),
                        'e trova solo ', 
                        DOM.strong({}, [
                            'rivenditori verificati'
                        ]),
                        '.'
                    ])
                ])
            ]),
        },
        //box 2: Prodotti più recensiti
        {
            id: 'bento-2',
            className: 'col-span-6 md:col-span-4',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Prodotti più recensiti`]),
                DOM.div({className: 'w-[100%] flex gap-8'}, [
                    HorizontalCard({
                        id: 'ciao',
                        href: '#',
                        cardOptions: {
                            src: './youtube.svg',
                            mark: 'Apple',
                            title: 'Iphone XS',
                            reviews: [5, 4.5, 3, 3.2, 5, 4.5, 3, 2, 5, 5, 5],
                            lowestPrice: 200,
                            alt: 'Immagine Iphone',
                        }
                    }),
                    HorizontalCard({
                        id: 'ciao',
                        href: '#',
                        cardOptions: {
                            src: './youtube.svg',
                            mark: 'Apple',
                            title: 'Iphone XS',
                            reviews: [5, 4.5, 3, 3.2, 5, 4.5, 3, 2, 5, 5, 5],
                            lowestPrice: 200,
                            alt: 'Immagine Iphone',
                        }
                    }),
                ])
                
                
                /* initializeRating({
                    id: `rating-ciao`,
                    totalReviews: 4,
                    reviews: [5, 4.5, 3, 3.2],
                    halfShow: true,
                    readOnly: true
                }), */
            ])
        },
        //box 3: Perchè scegliere SmartRank?
        {
            id: 'bento-3',
            className: 'col-span-6 md:col-span-3',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Perchè scegliere SmartRank?`]),
            ])
        },
        //box 4: Le nostre categorie
        {
            id: 'bento-4',
            className: 'col-span-6 md:col-span-3',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Le nostre categorie`]),
            ])
        },
        //box 5: Dicono di noi
        {
            id: 'bento-5',
            className: 'col-span-6 md:col-span-2',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Dicono di noi`]),
            ])
        },
        //box 6: Come funziona SmartRank?
        {
            id: 'bento-6',
            className: 'col-span-6 md:col-span-4',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Come funziona SmartRank?`]),
            ])
        }
    ]
    
    setActive('Home')
    document.title = 'Homepage';
    return DOM.main({}, [
        //Hero Section
        DOM.section({ className: 'container text-center my-8 md:my-18'}, [
            DOM.h1({className: 'fs-1 mb-4'},['Cerca. Confronta. Fidati di chi ne capisce.']),
            DOM.h2({className: 'body-lg mb-6'}, ['Leggi cosa ne pensano gli altri, confronta i prezzi e compra dai migliori rivenditori.']),
            //Mi posiziono la searchbar
            Searchbar({label: 'Nome di un prodotto o categoria',className: 'w-[100%] md:w-2xl'  ,placeholder: 'Cerca un prodotto o una categoria...', name: 'hero-search'}),
        ]),
        //Griglia con bentobox
        DOM.section({className: 'container grid grid-cols-6 gap-6'}, bentoListFragments.map(e => {
                const {id, value, className} = e
                return Bentobox({id, className}, value)
            })
        ),
        
    ])
}

export default Homepage;