import DOM, { createRef } from 'just-dom';
import { twMerge } from "tailwind-merge"; 
import Link from './ui/Link';

const Searchbar = ({label, className = '', placeholder, name }) => {
    //Mi creo i due ref
    const inputRef = createRef();
    const buttonRef = createRef();

    function handleInput(inputEl, buttonRef) {
        if(inputEl.value.trim() != '') {
            buttonRef.current.removeAttribute('disabled');
            buttonRef.current.href= `/catalogo?ricerca=${inputRef.current.value}`
        } else {
            buttonRef.current.setAttribute('disabled', true);
            buttonRef.current.href= `/catalogo`
        }
    } 

    //Mi salvo il DOM elem della searchbar in una variabile
    const searchbar = DOM.div({className: 'w-[100%] lg:w-3xl flex justify-center'}, [ //Wrapper principale con il width 100%. Lo utilizziamo solo per centrare la searchbar 
        DOM.form({
            className: 'relative w-[100%]', 
            method: 'GET', 
            action: '#'}, [
            DOM.div({className: 'absolute left-3 top-[50%] translate-y-[-50%] z-[2]'}, [
                DOM.createElFromHTMLString(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C6F7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search hidden md:block"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
                )
            ]),
            DOM.input({
                ref: inputRef,
                id: name, 
                autocomplete: 'off',
                ariaLabel: label, 
                placeholder, 
                oninput: (e) => handleInput(e.target, buttonRef),
                className: twMerge("input bg-[#F5F7FA] w-[100%] text-primary rounded-3xl px-4 md:px-10 py-7 border border-neutral placeholder:text-neutral focus:outline-neutral/60 focus:border-neutral/60 transition flex-1 transition-all duration-300 z-0", className)}),
            Link({
                href: `/catalogo`, 
                status: 'solid',
                className: 'rounded-4xl w-max absolute right-3 top-[50%] translate-y-[-50%] z-[1] active:!translate-y-[-50%] text-primary', 
                ref: buttonRef}, [
                    DOM.span({className: 'hidden md:block'},['Cerca']),
                    DOM.createElFromHTMLString(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search md:hidden"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>        `)
                ])
        ])
    ])
    //Metto il valore di disabled di default
    buttonRef.current.setAttribute('disabled', '')
    return searchbar;
}

export default Searchbar;