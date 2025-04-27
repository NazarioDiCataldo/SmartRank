import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

//I children saranno i vari option tag,
//Per una migliore UX, il primo farà da 'label' e non sarà selezionabile (basta mettergli disabled)
const Select = ({name, dataRequired = false, dataValidation = '',className = '', onChange = () => {}}, children) => {
    return DOM.div({className: twMerge(' ',className)},[
        DOM.select({
        name,
        dataRequired,
        dataValidation,
        onchange: (e) => {onChange(e.target)}, 
        className: 'select rounded-lg border h-auto py-2 w-full border-white/10 focus:outline-0 focus:border-white/60 transition-all duration-300'}, 
    children),
        DOM.small({ id: `${name}-error-message`, className: "text-error hidden" }, []),
    ])
}

export default Select;