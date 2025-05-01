import DOM from 'just-dom'
import { twMerge } from "tailwind-merge";

const Button = ({type, className = '', status = 'solid', ...options}, children) => {
    const button = DOM.button({ type, ...options}, children);

    let classes = '';
    //in base allo status deciso che tipo di pulsante sarà
    switch(status) {    
        case 'solid':
            classes = twMerge(`btn btn-accent rounded-[10px] border-0 px-[12px] py-[16px] transition-all duration-300 w-[100%] 
                cursor-pointer
                md:w-max 
                hover:brightness-[1.1] 
                focus:outline-0 
                active:scale[0.98]
                disabled:!opacity-50 disabled:cursor-not-allowed disabled:!bg-accent disabled:text-primary`, className)
            break;
        case 'outline':
            classes = twMerge(`btn px-[12px] py-[16px] rounded-xl border border-[#28E496] bg-transparent 
                text-accent transition-all duration-300 w-[100%] cursor-pointer
                md:w-max
                hover:bg-[#28E496]/10 hover:shadow-[0_0_10px_#28E496]
                focus:outline-none focus:ring-2 focus:ring-[#28E496]/40
                disabled:opacity-50 disabled:cursor-not-allowed`, className)
            break;
        case 'ghost': 
            classes = twMerge(`rounded-xl bg-transparent text-[#28E496] w-[100%] md:w-max
                transition-all duration-200 cursor-pointer
                hover:text-[#28E496]
                focus:outline-none focus:ring-2 focus:ring-[#28E496]/40
                disabled:opacity-50 disabled:cursor-not-allowed`, className)
            break;
        default: 
            classes = twMerge("btn btn-accent rounded-[10px] border-0 px-[12px] py-[16px] transition-all duration-300 w-[100%] md:w-max hover:brightness-[1.1] focus:outline-0 active:scale[0.98]", className)
            break; 
    }

    button.classList = classes
    return button; 
};

export default Button;