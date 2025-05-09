import DOM, { createRef } from 'just-dom';
import { twMerge } from "tailwind-merge"; 
import Link from './ui/Link';
import Button from './ui/Button';
import { Router } from '@codingspook/vanilla-routing';

const Searchbar = ({label, className = '', placeholder, name }) => {
    //Mi creo i due ref
    const inputRef = createRef();
    const buttonRef = createRef();

    //Valore che inserisce l'utente
    let inputValue = ''

    const input = DOM.input({
        ref: inputRef,
        id: name, 
        name: 'ricerca',
        autocomplete: 'off',
        ariaLabel: label, 
        placeholder, 
        oninput: (e) => handleInput(e.target, buttonRef),
        className: twMerge("input bg-[#F5F7FA] w-[100%] text-primary rounded-3xl px-4 md:px-10 py-7 border border-neutral placeholder:text-neutral focus:outline-neutral/60 focus:border-neutral/60 transition flex-1 transition-all duration-300 z-0", className)});

    function handleInput(inputEl, buttonRef) {
            if(inputEl.value.trim() != '') {
                buttonRef.current.removeAttribute('disabled');
                inputValue = `${inputRef.current.value}`
            } else {
                buttonRef.current.setAttribute('disabled', true);
                inputValue = ``
            }
    } 
    
    //Mi salvo il DOM elem della searchbar in una variabile
    const searchbar = DOM.div({className: 'flex flex-col gap-4 items-center w-full'}, [
        DOM.div({className: 'w-[100%] lg:w-3xl flex justify-center'}, [ //Wrapper principale con il width 100%. Lo utilizziamo solo per centrare la searchbar 
            DOM.form({
                className: 'relative w-[100%]', 
                dataVanillaRouteLink:'spa',
                method: 'GET', 
                action: '/catalogo',
                onsubmit: (e) => {
                    e.preventDefault();
                    if (e.target.action) {
                        Router.go(`/catalogo?ricerca=${inputValue.split(' ').join('-')}`);
                    }
                }
            }, [
                DOM.div({className: 'absolute left-3 top-[50%] translate-y-[-50%] z-[2]'}, [
                    DOM.createElFromHTMLString(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C6F7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search hidden md:block"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
                    )
                ]),
                input,
                Button({
                    type: 'submit', 
                    ref: buttonRef,
                    status: 'solid', 
                    className: `rounded-4xl absolute right-3 top-[50%] translate-y-[-50%] z-[1] active:!translate-y-[-50%] w-max `}, [
                        DOM.span({className: 'hidden md:block'},['Cerca']),
                        DOM.createElFromHTMLString(`
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search md:hidden"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>        `)
                    ]),
                /* DOM.a({className: `btn text-primary btn-accent rounded-4xl border-0 px-[12px] py-[16px] transition-all duration-300 w-max 
                    md:w-max 
                    hover:brightness-[1.1] 
                    focus:outline-0 
                    active:scale[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    absolute right-3 top-[50%] translate-y-[-50%] z-[1] active:!translate-y-[-50%]`,
                    href: `/catalogo`,
                    ref: buttonRef
                    }, [
                        DOM.span({className: 'hidden md:block'},['Cerca']),
                        DOM.createElFromHTMLString(`
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search md:hidden"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>        `)
                    ]), */
            ])
        ]),
        Link({href: '/catalogo', status: 'ghost', className: 'underline'}, ['Scopri tutto il catalogo'])
    ])
    //Metto il valore di disabled di default
    buttonRef.current.setAttribute('disabled', '')
    return searchbar;
}

export default Searchbar;