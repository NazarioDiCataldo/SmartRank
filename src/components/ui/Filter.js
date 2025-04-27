import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Filter = ({type, name, label, value, className = '', onClick = () => {}}) => {
    if(type == 'filter') {
        return DOM.input({
            className: twMerge("btn btn-accent hover:text-white/80 focus:text-white/80 active:text-primary", className),
            type: "radio",
            name: label,
            ariaLabel: name,
            value,
            onclick: onClick,
          });
          
    } if (type == 'reset') {
        return DOM.input({ 
            className: twMerge("btn btn-square btn-accent hover:text-white/80 focus:text-white/80 active:text-primary", className), 
            type: "reset", 
            value: "×",
            name,
            ariaLabel: label,
            onclick: onClick,
         });
    }
}

export default Filter;