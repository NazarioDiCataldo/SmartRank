import DOM from 'just-dom';
import { twMerge } from "tailwind-merge";
import Button from './ui/Button';

const Searchbar = ({label, className = '', placeholder, name }) => {
    return DOM.div({className: 'w-[100%] lg:w-3xl flex justify-center'}, [ //Wrapper principale con il width 100%. Lo utilizziamo solo per centrare la searchbar 
        DOM.div({className: 'relative w-[100%]'}, [
            DOM.div({className: 'absolute left-3 top-[50%] translate-y-[-50%] z-[2]'}, [
                DOM.createElFromHTMLString(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C6F7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
                )
            ]),
            DOM.input({
                id: name, 
                ariaLabel: label, 
                placeholder, 
                className: twMerge("input bg-[#F5F7FA] w-[100%] text-primary rounded-3xl px-10 py-7 border border-neutral placeholder:text-neutral focus:outline-neutral/60 focus:border-neutral/60 transition flex-1 transition-all duration-300 z-0", className)}),
                Button({type: 'submit', className: 'btn-accent rounded-4xl absolute right-3 top-[50%] translate-y-[-50%] z-[1]'}, ['Cerca'])
        ])
    ]) 
}

export default Searchbar;