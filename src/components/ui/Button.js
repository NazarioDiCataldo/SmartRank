import DOM from 'just-dom'
import { twMerge } from "tailwind-merge";

const Button = ({type, className = '' }, children) => {
    return DOM.button({ type, className: twMerge("btn rounded-[10px] border-0 px-[12px] py-[16px] transition-all duration-300 hover:brightness-[1.1] focus:outline-0 active:scale[0.98]", className) }, children);
};

export default Button;