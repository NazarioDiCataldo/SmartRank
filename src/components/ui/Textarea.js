import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Textarea = ({id, 
    name, 
    placeholder, 
    ariaLabel, 
    className = '',
    dataRequired = false,
    dataValidation = '', 
    onChange = () => {}, 
    onBlur = () => {}}, children) => {

    return DOM.div({className: ''}, [
        DOM.textarea({
            id, 
            name, 
            placeholder, 
            ariaLabel,
            className: twMerge('input h-32 text-white rounded-lg px-4 py-2 bg-white/5 border border-white/10 placeholder:text-white/60 focus:outline-0 focus:border-white/60 transition-all duration-300 resize-none whitespace-pre-line', className),
            dataRequired,
            dataValidation,
            oninput: (e) => onChange(e.target),
            onblur: (e) => onBlur(e.target),
        }, children),
        DOM.small({ id: `${name}-error-message`, className: "text-error hidden" }, []),
    ]) 
}

export default Textarea;