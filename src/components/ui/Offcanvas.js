import DOM, { createRef } from 'just-dom';
import {twMerge} from 'tailwind-merge';


const Offcanvas = ({id, className = ''}) => {
  //Mi prendo il ref della checkbox che attiva o chiude la modal
  const modalToggleInputRef = createRef()

  //Funzione per chiudere / aprire la modal quando clicco un link
  function toggleModal() {
    const checkbox = modalToggleInputRef.current;
    checkbox.checked ? checkbox.checked = false : checkbox.checked = true
  }

  return DOM.div({id, className: "drawer w-max rounded-md z-[100]" }, [
    DOM.input({
      ref: modalToggleInputRef,
      id: "offcanvasNav",
      type: "checkbox",
      className: "drawer-toggle",
    }),
    DOM.div({ className: "drawer-content"}, [
      DOM.label({ htmlFor: "offcanvasNav", className: "btn btn-primary lg:hidden hamburger-btn drawer-button", role: 'button'}, [
          DOM.img({src: '/menu.svg', alt: ''}, []),
          DOM.span({className:'sr-only'}, ['Apri menù'])
        ]),
    ]),
    //Offcanvas
    DOM.div({ className: twMerge("drawer-side w-full md:w-[50%] flex flex-col offcanvas-gradient !right-[0rem] !left-[unset]", className), }, [
      //Offcanvas Header
      DOM.div({className: 'flex justify-between w-full p-4'}, [
        DOM.a({ href: '/', dataVanillaRouteLink:'spa'}, [
          DOM.img({ src: '/logo-negativo.svg', width: '128', alt:'Ritorna alla home'})
        ]),
        DOM.label({ htmlFor: "offcanvasNav", className: "btn btn-primary btn-circle lg:hidden hamburger-btn drawer-button drawer-overlay", role: 'button'}, [
            DOM.createElFromHTMLString(`
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`),
            DOM.span({className:'sr-only'}, ['Chiudi menù'])
          ]),
      ]),
      //Offcanvas body
      DOM.div({className: 'p-4'}, [
        DOM.ul({ className: 'list-navbar flex flex-col gap-5 '}, [
          DOM.li({}, [
            DOM.a({ href: '/', dataVanillaRouteLink:'spa', className: 'fs-2 block', onclick: () => toggleModal()}, ['Home']),
          ]),
          DOM.li( {}, [
            DOM.a({ href: '/catalogo', dataVanillaRouteLink:'spa', className: 'fs-2 block', onclick: () => toggleModal()}, ['Catalogo']),
          ]),
          DOM.li( {}, [
            DOM.a({ href: '/contatti', dataVanillaRouteLink:'spa', className: 'fs-2 block', onclick: () => toggleModal()}, ['Contatti']),
          ])
        ])
      ]),
    ]),
  ]);
      
}

export default Offcanvas;