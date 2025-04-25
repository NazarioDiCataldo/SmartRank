import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Filter = ({type, name, label, className = ''}) => {
    if(type == 'filter') {
        return DOM.input({
            className: twMerge("btn btn-accent hover:text-white/80 focus:text-white/80 active:text-primary m-2", className),
            type: "radio",
            name: label,
            ariaLabel: name,
          });
          
    } if (type == 'reset') {
        return DOM.input({ className: twMerge("btn btn-square m-2 btn-accent hover:text-white/80 focus:text-white/80 active:text-primary", className), type: "reset", value: "×" });
    }
}

export default Filter;