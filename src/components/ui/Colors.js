import DOM from 'just-dom'
import { twMerge } from 'tailwind-merge';

const Colors = ({color, name, checked = false, ref = '', className = ''}) => {
    
    function changeLabel(color, ref) {
        console.log(color)
        //Assegno il colore alla label
        ref.current.textContent = color;
    }

    return DOM.input({
        type: "radio",
        name,
        checked,
        value: color,
        className: twMerge('radio', className),
        onchange: (e) => {changeLabel(e.target.value, ref)}
      });
      
}

export default Colors