import DOM, { createRef } from 'just-dom';
import setActive from '../setActive';
import Searchbar from '../components/Searchbar';
import Bentobox from '../components/Bentobox';
import HorizontalCard from '../components/ui/HorizontalCard';
import Link from '../components/ui/Link';
import Carousel from '../components/Carousel';
import Review from '../components/Review';
import Modal from '../components/ui/Modal';
import Catalog from '../classes/catalog';
import { getReviews } from './Dettaglio';


const Homepage = async () => {
    //Mi creo l'oggetto catalogo
    const catalog = new Catalog();
    await catalog.loadProducts();
    catalog.higerValutations();

    //Mi prendo l'iPhone 16 Pro Max
    const iphone16ProMax = catalog.getProductBySlug('iphone-16-pro-max')

    //Mi prendo tutte le recensioni
    const reviews = await getReviews();
    //Mi prendo le ultime 3 recensioni
    const lastThreeRev = reviews.splice(-3).reverse();

    //Mi creo le ref
    const navigationWrapperRef = createRef(); //Ref per il titolo della bento 2, per appendere la navigazione al titolo della sezione
    const carouselRef = createRef(); //Ref per il carosello, serve per mettere le card orizzontali
    carouselRef['target'] = 'carousel';
    const reviewsWrapperRef = createRef(); //Ref per il titolo della bento 5, per appendere la navigazione al titolo della sezione
    const buttonWrapperRef = createRef(); //Ref per il div che contiene la cta, contiene la paginazione dello slider
    const modalRef = createRef();
    

    //Mi creo la modal
    const modal = Modal({}, modalRef);

    const bentoListFragments = [
        //box 1: Cos'è SmartRank
        {
            id: 'bento-1',
            className: 'col-span-6 lg:col-span-2 lg:h-full',
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
            className: 'col-span-6 lg:col-span-4 overflow-hidden lg:h-full',
            value: DOM.fragment([
                DOM.div({ref: navigationWrapperRef, className: 'flex justify-between items-center'}, [
                    DOM.h3({className: 'fs-3 mb-8'}, [`Prodotti più apprezzati`]),
                ]),
                Carousel(navigationWrapperRef, {classSlider: '!flex flex-col ', classCard: '!w-max', refCarousel: carouselRef}, 'auto', 16, true, [
                    ...catalog.products.slice(0, 5).map(p => {
                        return p.createCard('carousel')
                    })
                ])
            ])
        },
        //box 3: Perchè scegliere SmartRank?
        {
            id: 'bento-3',
            className: 'col-span-6 lg:col-span-3 lg:h-full',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-8'}, [`Perchè scegliere SmartRank?`]),
                DOM.ul({className: 'flex flex-col md:flex-row gap-8 w-[100%] items-start'}, [
                    DOM.li({className: 'flex flex-col items-center w-[100%] md:w-1/3 text-center'}, [
                        DOM.createElFromHTMLString(
                            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 24 24" fill="none" stroke="#F5F7FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square-icon lucide-messages-square w-[3.5rem] lg:w-[4rem]"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>`
                        ),
                        DOM.h5({className: 'text-lg font-semibold mt-4 md:mt-6'}, ['Confrontati con altri utenti']),
                        DOM.p({className: 'mt-2'},['Recensioni scritte da chi usa la tecnologia.'])
                    ]),
                    DOM.li({className: 'flex flex-col items-center w-[100%] md:w-1/3 text-center'}, [
                        DOM.createElFromHTMLString(
                            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 24 24" fill="none" stroke="#F5F7FA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet w-[3.5rem] lg:w-[4rem]"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>`
                        ),
                        DOM.h5({className: 'text-lg font-semibold mt-4 md:mt-6'}, ['Miglior prezzo garantito']),
                    DOM.p({className: 'mt-2'},['Mostriamo solo store certificati.'])
                    ]),
                    DOM.li({className: 'flex flex-col items-center w-[100%] md:w-1/3 text-center'}, [
                        DOM.createElFromHTMLString(
                            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 24 24" fill="none" stroke="#F5F7FA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-check-icon lucide-badge-check w-[3.5rem] lg:w-[4rem]"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`
                        ),
                        DOM.h5({className: 'text-lg font-semibold mt-4 md:mt-6'}, ['Oltre l’opinione personale']),
                        DOM.p({className: 'mt-2'}, ['Valutazioni verificate su ogni dettaglio.'])
                    ]),
                ])
            ])
        },
        //box 4: Le nostre categorie
        {
            id: 'bento-4',
            className: 'col-span-6 lg:col-span-3 lg:h-full',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-8'}, [`Le nostre categorie`]),
                DOM.ul({className: 'grid grid-cols-3 grid-rows-2 gap-8 w-[100%] items-center'}, [
                    //Creazione con la lista di categorie
                    //Smartphone
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?categoria=smartphone`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone-icon lucide-smartphone w-[2.5rem] lg:w-[3rem] h-[2.5rem] lg:h-[3rem]"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Smartphone'])
                        ]),
                        Link({className: 'font-medium mt-4 no-underline', href: `/catalogo?categoria=smartphone`}, ['Smartphone'])
                    ]),
                    //Laptop
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?categoria=laptop`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop-icon lucide-laptop w-[2.5rem] lg:w-[3rem] h-[2.5rem] lg:h-[3rem]"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Laptop'])
                        ]),
                        Link({className: 'font-medium mt-4 no-underline', href: `/catalogo?categoria=laptop`, status: 'ghost'}, ['Laptop'])                    ]),
                    //Cuffie
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?categoria=cuffie`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headphones-icon lucide-headphones w-[2.5rem] lg:w-[3rem] h-[2.5rem] lg:h-[3rem]"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Cuffie'])
                        ]),
                        Link({className: 'font-medium mt-4 no-underline', href: `/catalogo?categoria=cuffie`}, ['Cuffie'])
                    ]),
                    //Smartwatch
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?categoria=smartwatch`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-watch-square-icon lucide-watch-square w-[2.5rem] lg:w-[3rem] h-[2.5rem] lg:h-[3rem]"><path d="m15.8 6-.5-2.4c-.2-1-1-1.6-2-1.6h-2.7a2 2 0 0 0-2 1.6L8.2 6"/><rect width="12" height="12" x="6" y="6" rx="2"/><path d="m8.2 18 .5 2.4c.2 1 1 1.6 2 1.6h2.7a2 2 0 0 0 2-1.6l.5-2.4"/><path d="M12 10v2l1 1"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Smartwatch'])
                        ]),
                        Link({className: 'font-medium mt-4 no-underline', href: `/catalogo?categoria=smartwatch`, status: 'ghost'}, ['Smartwatch'])                    ]),
                    //Powerbank
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?categoria=powerbank`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone-charging-icon lucide-smartphone-charging w-[2.5rem] lg:w-[3rem] h-[2.5rem] lg:h-[3rem]"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12.667 8 10 12h4l-2.667 4"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Powerbank'])
                        ]),
                        Link({className: 'font-medium mt-4 no-underline', href: `/catalogo?categoria=powerbank`}, ['Powerbank'])]),
                    //Tablet
                    DOM.li({className: 'flex flex-col items-center w-[100%] text-center'}, [
                        DOM.a({href: `/catalogo?categoria=tablet`, className: 'btn btn-accent btn-circle block w-max h-max p-2', dataVanillaRouteLink:'spa'}, [
                            DOM.createElFromHTMLString(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#0A0F2C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tablet-icon lucide-tablet w-[2.5rem] lg:w-[3rem] h-[2.5rem] lg:h-[3rem]"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>`
                            ),
                            DOM.span({className:'sr-only'}, ['Tablet'])
                        ]),
                        Link({className: 'font-medium mt-4 no-underline', href: `/catalogo?categoria=tablet`}, ['Tablet'])                 
                    ]),
                ])
            ])
        },
        //box 5: Ultime recensioni
        {
            id: 'bento-5',
            className: 'col-span-6 lg:col-span-2 lg:h-full',
            value: DOM.fragment([
                DOM.div({className: 'flex justify-between items-center', ref: reviewsWrapperRef}, [
                    DOM.h3({className: 'fs-3 mb-4'}, [`Ultime recensioni`]),
                ]),
                Carousel(reviewsWrapperRef, {classSlider: '!overflow-hidden', classCard: ''}, 1, 0, true, [
                    ...lastThreeRev.map(r => {
                        const prodotto = catalog.getProductById(r.idProdotto)
                        return Review(modalRef, r, true, prodotto)
                    })
                ])
            ])
        },
        //box 6: E' arrivato iPhone 16 Pro Max
        {
            id: 'bento-6',
            className: 'col-span-6 lg:col-span-4 lg:h-full',
            value: DOM.fragment([
                DOM.h3({className: 'fs-3 mb-4'}, [`È arrivato iPhone 16 Pro Max`]),  
                //grid grid-cols-1 md:grid-cols-6
                DOM.div({className: 'flex flex-col md:flex-row gap-8 md:gap-5'}, [
                    //col-span-1 md:col-span-2 h-max
                    DOM.div({className: 'lg:w-[50%] xl:w-1/2', ref: buttonWrapperRef}, [
                        DOM.ul({className: 'flex flex-col gap-3 mb-4'}, [
                            DOM.li({className: ''}, [
                                DOM.strong({className: 'font-semibold'}, ['Il nuovo iPhone 16 Pro Max è su SmartRank. ']),
                                'Leggi le recensioni, scopri i dettagli tecnici e confronta i prezzi dai rivenditori certificati.']),
                            DOM.li({className: ''}, [
                                DOM.strong({className: 'font-semibold'}, ['Hai già provato l’iPhone 16 Pro Max? ']),
                                'Condividi la tua esperienza e aiuta altri utenti a scegliere consapevolmente. Ogni recensione conta']),
                        ]),
                        DOM.div({className: 'flex flex-col md:flex-row lg:flex-col xl:flex-row  gap-4 md:gap-3'}, [
                            Link({href: '/recensione?prodotto=iphone-16-pro-max', status: 'outline', className:'order-2 md:order-1 lg:order-2 xl:order-1 !w-full md:!w-max lg:!w-full xl:!w-max'}, ['Lascia una recensione']),
                            Link({href: '/catalogo/iphone-16-pro-max', status: 'solid', className:'order-1 md:order-2 lg:order-1 xl:order-2 !w-full md:!w-max lg:!w-full xl:!w-max'}, ['Scopri di più'])
                        ])
                    ]),
                    DOM.div({className: 'col-span-2 md:col-span-1'}, [
                        HorizontalCard({
                            id: iphone16ProMax.id, 
                            href: iphone16ProMax.url,
                            className: 'w-full md:w-[19rem] lg:w-[17.5rem] xl:w-[22rem]',
                            cardOptions: {
                                src: iphone16ProMax.immagine,
                                mark: iphone16ProMax.marca,
                                title: iphone16ProMax.nome,
                                lowestPrice: iphone16ProMax.prezzi[0],
                                alt: `Anteprima di ${iphone16ProMax.nome}, della ${iphone16ProMax.marca}`,
                            },
                            reviewObj: {idReview: `Rating-${iphone16ProMax.id}` , reviews: iphone16ProMax.getAllValutations().valutazioni},
                        })
                    ])
                ])
            ])
        }
    ]
    
    setActive('home')
    document.title = 'Homepage';

    //getProducts(navigationWrapperRef)

    return DOM.main({}, [
        //Hero Section
        DOM.section({ className: 'container text-center my-8 lg:my-14 flex flex-col items-center'}, [
            DOM.h1({className: 'fs-1 mb-4'},['Cerca. Confronta. Fidati di chi ne capisce.']),
            DOM.h2({className: 'body-lg mb-6'}, ['Leggi cosa ne pensano gli altri, confronta i prezzi e compra dai migliori rivenditori.']),
            //Mi posiziono la searchbar
            Searchbar({label: 'Nome di un prodotto o categoria',className: ''  ,placeholder: 'Cerca un prodotto o una categoria...', name: 'hero-search'}),
        ]),
        //Griglia con bentobox
        DOM.section({className: 'container grid grid-cols-6 gap-6'}, bentoListFragments.map(e => {
                const {id, value, className} = e
                return Bentobox({id, className}, [value])
            })
        ),
        modal,
    ])
}

export default Homepage;