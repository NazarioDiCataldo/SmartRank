import DOM, { createRef } from 'just-dom';
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Carousel = ({navigationWrapperRef}, children) => {
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
    navigationWrapperRef.current.append(navigationWrapper)

    
    const paginationRef = createRef();

    //Mi creo la variabile contenente il DOM element dello slider
    const swiperSlider = DOM.div({className: 'swiper !overflow-visible'}, [
        DOM.div({className: "swiper-wrapper !w-max !pb-4"},[
            ...children.map(elem => {
                return DOM.div({className: 'swiper-slide !w-max  !flex-shrink-0'}, [
                    elem
                ])
            })
        ]),
        DOM.div({ref: paginationRef, className: "swiper-pagination !static *:!bg-accent *:!w-[0.5rem] *:!h-[0.5rem] "}),
    ]);

    // init Swiper:
    new Swiper(swiperSlider, {
        // configure Swiper to use modules
        modules: [Navigation, Pagination],
        slidesPerView: 'auto',
        spaceBetween: 32,
        centeredSlides: false,
        watchOverflow: true,
        grabCursor: true,
        centerInsufficientSlides: false,
        slidesOffsetAfter: 16,
        // Optional parameters

        // If we need pagination
        pagination: {
            el: paginationRef.current,
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