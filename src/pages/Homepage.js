import DOM, { createRef } from 'just-dom';
import setActive from '../setActive';
import Searchbar from '../components/Searchbar';
import Bentobox from '../components/Bentobox';
import HorizontalCard from '../components/ui/HorizontalCard';
import Carousel from '../components/Carousel';


const Homepage = () => {
    const navigationWrapperRef = createRef();
    const bentoListFragments = [
        //box 1: Cos'è SmartRank
        {
            id: 'bento-1',
            className: 'col-span-6 lg:col-span-2',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-8'}, [`Cos'è SmartRank?`]),
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
            className: 'col-span-6 lg:col-span-4 overflow-hidden',
            value: DOM.fragment([
                DOM.div({ref: navigationWrapperRef, className: 'flex justify-between items-center'}, [
                    DOM.h3({className: 'fs-3 mb-8'}, [`Prodotti più recensiti`]),
                ]),
                Carousel({navigationWrapperRef}, [
                    HorizontalCard({
                        id: 'ciao',
                        href: '#',
                        cardOptions: {
                            src: './youtube.svg',
                            mark: 'Apple',
                            title: 'Iphone XS',
                            idReviews: 'evi-1',
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
                            idReviews: 'evi-2',
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
                            idReviews: 'evi-3',
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
                            idReviews: 'evi-4',
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
            className: 'col-span-6 lg:col-span-3',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-8'}, [`Perchè scegliere SmartRank?`]),
                DOM.ul({className: 'flex flex-col md:flex-row gap-8 w-[100%] items-center'}, [
                    DOM.li({className: 'flex flex-col items-center w-[100%] md:w-1/3 text-center'}, [
                        DOM.createElFromHTMLString(
                            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 24 24" fill="none" stroke="#F5F7FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square-icon lucide-messages-square w-[3.5rem] lg:w-[4rem]"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>`
                        ),
                        DOM.h5({className: 'font-medium mt-4 md:mt-6'}, ['Confrontati con altri utenti']),
                        DOM.p({className: 'text-sm mt-2'},['Recensioni scritte da chi usa la tecnologia.'])
                    ]),
                    DOM.li({className: 'flex flex-col items-center w-[100%] md:w-1/3 text-center'}, [
                        DOM.createElFromHTMLString(
                            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 24 24" fill="none" stroke="#F5F7FA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet w-[3.5rem] lg:w-[4rem]"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>`
                        ),
                        DOM.h5({className: 'font-medium mt-4 md:mt-6'}, ['Miglior prezzo garantito']),
                    DOM.p({className: 'text-sm mt-2'},['Mostriamo solo store certificati.'])
                    ]),
                    DOM.li({className: 'flex flex-col items-center w-[100%] md:w-1/3 text-center'}, [
                        DOM.createElFromHTMLString(
                            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 24 24" fill="none" stroke="#F5F7FA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-check-icon lucide-badge-check w-[3.5rem] lg:w-[4rem]"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`
                        ),
                        DOM.h5({className: 'font-medium mt-4 md:mt-6'}, ['Oltre l’opinione personale']),
                        DOM.p({className: 'text-sm mt-2'}, ['Valutazioni verificate su ogni dettaglio.'])
                    ]),
                ])
            ])
        },
        //box 4: Le nostre categorie
        {
            id: 'bento-4',
            className: 'col-span-6 lg:col-span-3',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Le nostre categorie`]),
                DOM.ul({className: 'grid grid-cols-3 grid-rows-2 gap-8 w-[100%] items-center'}, [
                    //Creazione con la lista di categorie
                    //Smartphone
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?categoria=smartphone`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone-icon lucide-smartphone w-[3rem] lg:w-[3.5rem] h-[3rem] lg:h-[3.5rem]"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Smartphone'])
                        ]),
                        DOM.a({className: 'font-medium mt-4 text-accent', href: `/catalogo?category=smartphone`, dataVanillaRouteLink:'spa'}, ['Smartphone']),
                    ]),
                    //Laptop
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?category=laptop`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop-icon lucide-laptop w-[3rem] lg:w-[3.5rem] h-[3rem] lg:h-[3.5rem]"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Laptop'])
                        ]),
                        DOM.a({className: 'font-medium mt-4 text-accent', href: `/catalogo?categoria=smartphone`, dataVanillaRouteLink:'spa'}, ['Laptop']),                    
                    ]),
                    //Cuffie
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?category=cuffie`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headphones-icon lucide-headphones w-[3rem] lg:w-[3.5rem] h-[3rem] lg:h-[3.5rem]"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Cuffie'])
                        ]),
                        DOM.a({className: 'font-medium mt-4 text-accent', href: `/catalogo?categoria=cuffie`, dataVanillaRouteLink:'spa'}, ['Cuffie']),                  

                    ]),
                    //Smartwatch
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?category=smartwatch`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-watch-square-icon lucide-watch-square w-[3rem] lg:w-[3.5rem] h-[3rem] lg:h-[3.5rem]"><path d="m15.8 6-.5-2.4c-.2-1-1-1.6-2-1.6h-2.7a2 2 0 0 0-2 1.6L8.2 6"/><rect width="12" height="12" x="6" y="6" rx="2"/><path d="m8.2 18 .5 2.4c.2 1 1 1.6 2 1.6h2.7a2 2 0 0 0 2-1.6l.5-2.4"/><path d="M12 10v2l1 1"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Smartwatch'])
                        ]),
                        DOM.a({className: 'font-medium mt-4 text-accent', href: `/catalogo?categoria=smartwatch`, dataVanillaRouteLink:'spa'}, ['Smartwatch']),                  
                    ]),
                    //Powerbank
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?category=smartwatch`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone-charging-icon lucide-smartphone-charging w-[3rem] lg:w-[3.5rem] h-[3rem] lg:h-[3.5rem]"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12.667 8 10 12h4l-2.667 4"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Powerbank'])
                        ]),
                        DOM.a({className: 'font-medium mt-4 text-accent', href:`/catalogo?categoria=powerbank`, dataVanillaRouteLink:'spa'}, ['Powerbank']),                  
                    ]),
                    //Tablet
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?category=smartwatch`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tablet-icon lucide-tablet w-[3rem] lg:w-[3.5rem] h-[3rem] lg:h-[3.5rem]"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Tablet'])
                        ]),
                        DOM.a({className: 'font-medium mt-4 text-accent', href:`/catalogo?categoria=tablet`, dataVanillaRouteLink:'spa'}, ['Tablet']),                  
                    ]),
                ])
            ])
        },
        //box 5: Dicono di noi
        {
            id: 'bento-5',
            className: 'col-span-6 lg:col-span-2',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Dicono di noi`]),
            ])
        },
        //box 6: Come funziona SmartRank?
        {
            id: 'bento-6',
            className: 'col-span-6 lg:col-span-4',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`Come funziona SmartRank?`]),
            ])
        }
    ]
    
    setActive('Home')
    document.title = 'Homepage';
    return DOM.main({}, [
        //Hero Section
        DOM.section({ className: 'container text-center my-8 lg:my-17 flex flex-col items-center'}, [
            DOM.h1({className: 'fs-1 mb-4'},['Cerca. Confronta. Fidati di chi ne capisce.']),
            DOM.h2({className: 'body-lg mb-6'}, ['Leggi cosa ne pensano gli altri, confronta i prezzi e compra dai migliori rivenditori.']),
            //Mi posiziono la searchbar
            Searchbar({label: 'Nome di un prodotto o categoria',className: ''  ,placeholder: 'Cerca un prodotto o una categoria...', name: 'hero-search'}),
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