import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';

const SwiperPagination = ({className = ''}, children = []) => {
    const paginationRef = createRef();

    const pagination = DOM.div({
        ref: paginationRef, 
        className: twMerge(`swiper-pagination !static *:!bg-accent *:!w-[0.5rem] *:!h-[0.5rem]`, className)}, [])
        
        paginationRef.current.append(
            DOM.p({},['pippo'])
        )

    if(children.length > 0) {
        console.log(paginationRef.current.querySelectorAll('span'))
    }
    return pagination
}

export default SwiperPagination;