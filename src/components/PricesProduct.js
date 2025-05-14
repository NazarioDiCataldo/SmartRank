import DOM from 'just-dom'
import Bentobox from './Bentobox';
import Link from './ui/Link';

const PricesProduct = (prodotto) => {
    const vantaggi = ['Pagamenti sicuri', 'Garanzia di 12 mesi', 'AppleCare incluso']

    return DOM.section({className: 'bento-box border-white/5 border-[1px] rounded-lg backdrop-blur-lg p-4 md:p-5', id: 'prices-product'},[
        DOM.h3({className: 'fs-4 font-semibold mb-8'}, ['Le migliori offerte']),
        //Wrapper card-prezzo
        DOM.div({className: 'flex flex-col gap-8'}, [
            ...prodotto.prezzi.map((p, i) => {
                //Singolo card-prezzo
                return Bentobox({className: ' rounded-sm grid grid-cols-4 place-items-center !h-max first:border-success group gap-6'}, [
                    //Div che contiene il logo del rivenditore
                    DOM.div({className:'flex gap-2 md:gap-4 items-center col-span-full md:col-span-1'}, [
                        DOM.figure({className: 'w-32'}, [
                            DOM.img({className: 'w-full h-auto', src: prodotto.rivenditoriLogo[i]})
                        ]),
                        DOM.h5({className:'body-md hidden'}, [prodotto.rivenditori[i]])
                    ]),
                    //Div che contiene i vantaggi nel comprare da quel rivenditore
                    DOM.div({className:'flex flex-col gap-2 col-span-full md:col-span-1'}, [
                        ...vantaggi.map(v => {
                            return DOM.p({className:'text-success body-xs flex items-center gap-1'}, [
                                DOM.createElFromHTMLString('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>'), 
                                v
                            ])
                        })
                    ]),
                    //Div con il prezzo
                    DOM.div({className: 'group group-first:border-success flex flex-col gap-1 justify-start md:items-center col-span-full md:col-span-1'}, [
                        DOM.small({className: 'text-success body-xs hidden group-first:block'}, ['Miglior prezzo']),
                        DOM.span({className: 'body-lg font-medium'}, [`${p} €`])]),
                    //Div con cta
                    Link({
                        href: '#',
                        className: 'col-span-full md:col-span-1',
                        status: 'solid' }, [
                        'Guarda offerta',
                        DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`)
                    ])
                ])
            })
        ])
    ])
}

export default PricesProduct;