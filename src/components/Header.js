import DOM from 'just-dom'

const Header = () => {
    return DOM.header({ className: 'w-[100%]'}, [
        DOM.nav({ className: 'container flex py-4 justify-between'}, [
            DOM.a({ href: '/', dataVanillaRouteLink:'spa'}, [
                DOM.img({ src: './logo-negativo.svg', width: '128', alt:'Ritorna alla home'})
            ]),
            DOM.button({className:'btn btn-primary lg:hidden hamburger-btn', 
                ariaLabel: 'Menù',
                ariaHasPopup: "dialog",
                ariaExpanded: "false",
                ariaControls: "offcanvasNavbar",
                dataOverlay: "#offcanvasNavbar"}, [
                DOM.img({src: './menu.svg'}, [])
            ]),
            DOM.ul({ className: 'list-navbar hidden lg:flex gap-4 '}, [
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
    ]);
}

export default Header;