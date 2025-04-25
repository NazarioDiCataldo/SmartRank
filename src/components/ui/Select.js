import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

//I children saranno i vari option tag,
//Per una migliore UX, il primo farà da 'label' e non sarà selezionabile (basta mettergli disabled)
const Select = ({name, className = ''}, children) => {
    return DOM.select({name, className: twMerge('select rounded-lg px-4  border border-white/10 focus:outline-0 focus:border-white/60 transition flex-1 transition-all duration-300', className)}, 
    children)
}

export default Select;