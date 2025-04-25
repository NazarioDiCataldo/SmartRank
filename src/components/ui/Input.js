import DOM from "just-dom";
import { twMerge } from "tailwind-merge";

const Input = ({
    name,
    type,
    label,
    value = "",
    placeholder,
    className = "",
    onChange = () => {},
    onBlur = () => {},
    }) => {   

    let iconSvg = '';

    //avrò un icona per ogni tipo di campo dell'input
    switch(type) {
        case 'search': 
            iconSvg = DOM.createElFromHTMLString(
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>')
                break;
        case 'email': 
            iconSvg = DOM.createElFromHTMLString(`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`)
            break;
        default:
            iconSvg = '';
            break;        
    }

    return DOM.div({ className: "w-[100%]" }, [
        DOM.label({ className: "relative" }, [
            //Div che conterrà l'icona
            DOM.div({className: 'absolute left-3 top-[50%] translate-y-[-40%] z-[2]'}, [ iconSvg ]),
            DOM.input({
                id: name,
                name,
                type,
                placeholder,
                value,
                ariaLabel: label,
                oninput: (e) => onChange(e.target),
                onblur: (e) => onBlur(e.target),
                className: twMerge("input text-white rounded-lg pl-9 pr-4 py-5 bg-white/5 border border-white/10 placeholder:text-white/60 focus:outline-0 focus:border-white/60 transition flex-1 transition-all duration-300", className),
            }),
        ]),
        DOM.small({ id: `${name}-error-message`, className: "text-error hidden" }, []),
    ]);
};

export default Input;