import DOM from 'just-dom'
import Offcanvas from './ui/Offcanvas';

const Header = () => {
    return DOM.header({ className: 'w-[100%]'}, [
        DOM.nav({ className: 'container flex py-4 justify-between'}, [
            DOM.a({ href: '/', dataVanillaRouteLink:'spa'}, [
                DOM.img({ src: '../logo-negativo.svg', width: '128', alt:'Ritorna alla home'})
            ]),
            //Mi chiamo l'offcanvas direttamente nell'header, visto che contiene anche l'hamburger
            Offcanvas({id: 'offcanvasHeader'}),
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