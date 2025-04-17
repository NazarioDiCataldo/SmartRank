import DOM from 'just-dom';
import {twMerge} from 'tailwind-merge';

const Offcanvas = ({id, className}) => {
    return DOM.div(
        {
          id,
          className: twMerge("overlay overlay-open:translate-x-0 drawer drawer-start hidden offcanvas-gradient", className),
          role: "dialog",
          tabIndex: "-1",
        },
        [
          DOM.div({ className: "drawer-header flex justify-between" }, [
            DOM.a({ href: '/', dataVanillaRouteLink:'spa'}, [
                DOM.img({ src: './logo-negativo.svg', width: '128', alt:'Ritorna alla home'})
            ]),
            DOM.button(
              {
                type: "button",
                className: "btn btn-primary btn-circle hamburger-btn",
                ariaLabel: "Chiudi menù",
                dataOverlay: `#${id}`,
              },
              [DOM.span({ className: "icon-[tabler--x] size-5 text-white" })]
            ),
          ]),
          DOM.div({ className: "drawer-body" }, [
            DOM.ul({ className: 'list-navbar flex flex-col gap-4 '}, [
                DOM.li( {}, [
                    DOM.a({ href: '/', dataVanillaRouteLink:'spa'}, ['Home']),
                ]),
                DOM.li( {}, [
                    DOM.a({ href: '/catalogo', dataVanillaRouteLink:'spa'}, ['Catalogo']),
                ]),
                DOM.li( {}, [
                    DOM.a({ href: '/contatti', dataVanillaRouteLink:'spa'}, ['Contatti']),
                ])
            ])
          ]),
        ]
      );
      
}

export default Offcanvas;