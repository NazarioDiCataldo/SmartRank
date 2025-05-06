import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperPagination from './ui/SwiperPagination';


//Slider per view = auto quando vogliamo in una viewport/sezione entri più di una slide
//Slider per view = 1 quando ogni sezione/viewport è occupata da una sola slide
//offsetAfter = 16 si abbina ad auto, e permette di mostrare per intero l'ultima card, forzando lo slider ad aggiungere un margine destro
//offsetAfter = 0 elimina il margine destro
const Carousel = (ref, {classSlider, classCard}, slidePerView = 'auto', offsetAfter = 0, showNavigation = true, children) => {

    //Voglio mettere i bttoni della navigazione affianco al titolo h3
    const leftButtonRef = createRef();
    const rightButtonRef = createRef();

    //Mi creo i dom elements dei due pulsanti
    const navigationWrapper = DOM.div({className: 'flex gap-4'}, [
        DOM.button({ref: leftButtonRef, type:'button', disabled: false, className: "swiper-button-prev !hidden lg:!block !static !btn !btn-accent !btn-circle after:!text-base ", onclick: () => { rightButtonRef.current.removeAttribute('disabled') }},[
            DOM.span({className:'sr-only'}, ['Naviga alla slide precedente'])
        ]),
        DOM.button({ref: rightButtonRef, type:'button', disabled: false, className: "swiper-button-next !hidden lg:!block !static !btn !btn-accent !btn-circle after:!text-base", onclick: () => { leftButtonRef.current.removeAttribute('disabled') }}, [
            DOM.span({className:'sr-only'}, ['Naviga alla slide successiva'])
        ]),
    ])
    
    if(showNavigation) {
        ref.current.append(navigationWrapper)
    }


    //Mi chiamo il DOM Element SwiperPagination
    const pagination = SwiperPagination({})

    //Mi creo la variabile contenente il DOM element dello slider
    const swiperSlider = DOM.div({className: twMerge('swiper !overflow-visible', classSlider)}, [
        DOM.div({className: "swiper-wrapper !w-max !pb-3"},[
            ...children.map(elem => {
                return DOM.div({className: twMerge('swiper-slide !h-auto', classCard)}, [
                    elem
                ])
            })
        ]),
        pagination
    ]);

    // init Swiper:
    new Swiper(swiperSlider, {
        // configure Swiper to use modules
        modules: [Navigation, Pagination],
        slidesPerView: slidePerView,
        spaceBetween: 32,
        centeredSlides: false,
        watchOverflow: true,
        grabCursor: true,
        centerInsufficientSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: offsetAfter,
        // Optional parameters

        // If we need pagination
        pagination: {
            el: pagination,
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: rightButtonRef.current,
            prevEl: leftButtonRef.current,
        },

      });

      return swiperSlider;
}

export default Carousel;