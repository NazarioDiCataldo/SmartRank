import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Filter = ({type, name, label, value, dataName = '', className = '', onClick = () => {}}) => {
    if(type == 'filter') {
        return DOM.input({
            className: twMerge("btn btn-accent hover:text-primary focus:text-primary active:text-primary transition-all duration-300", className),
            type: "radio",
            name: label,
            dataName,
            ariaLabel: name,
            value,
            onclick: onClick,
          });
          
    } if (type == 'reset') {
        return DOM.input({ 
            className: twMerge("btn btn-square btn-accent hover:text-white/80 focus:text-white/80 active:text-white transition-all duration-300", className), 
            type: "reset", 
            value: "×",
            name,
            dataName,
            ariaLabel: label,
            onclick: onClick,
         });
    }
}

export default Filter;