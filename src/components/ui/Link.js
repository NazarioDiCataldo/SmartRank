import { Router } from '@codingspook/vanilla-routing';
import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Link = ({href = ``, className, status = 'ghost', ...options}, children) => {
    
    const link = DOM.a({href, onclick: (e) => {
        e.preventDefault();
        if (href) {
            Router.go(href);
        }
    }, ...options}, children)
    let classes = '';

    switch(status) {
        case 'solid':
            classes = twMerge(`btn text-primary body-md btn-accent rounded-[10px] border-0 px-[12px] py-[16px] transition-all duration-300 w-[100%] 
                md:w-max 
                hover:brightness-[1.1] 
                focus:outline-0 
                active:scale[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed `, className)
            break;
        case 'outline':
            classes = twMerge(`btn btn-accent body-md px-[12px] py-[16px] rounded-xl border border-[#28E496] bg-transparent 
                text-accent font-semibold transition-all duration-200 w-[100%] 
                md:w-max
                hover:bg-[#28E496]/10 hover:shadow-[0_0_10px_#28E496]
                focus:outline-none focus:ring-2 focus:ring-[#28E496]/40
                disabled:opacity-50 disabled:cursor-not-allowed`, className)
            break;
        case 'ghost': 
            classes = twMerge(`block p-1 body-md rounded-xl bg-transparent text-[#28E496] w-[100%] md:w-max
                transition-all duration-200
                hover:text-[#28E496]
                focus:outline-none focus:ring-2 focus:ring-[#28E496]/40
                disabled:opacity-50 disabled:cursor-not-allowed`, className)
            break;
        default: 
            classes = twMerge(`btn px-[12px] py-[16px] rounded-xl border border-[#28E496] bg-transparent 
                text-primary font-semibold transition-all duration-200 w-[100%] 
                md:w-max
                hover:bg-[#28E496]/10 hover:shadow-[0_0_10px_#28E496]
                focus:outline-none focus:ring-2 focus:ring-[#28E496]/40
                disabled:opacity-50 disabled:cursor-not-allowed `, className)
    }

    link.classList = classes
    return link; 
}

export default Link;