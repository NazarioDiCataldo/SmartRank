import DOM from  'just-dom';
import Tab from './ui/Tab';
import Bentobox from './Bentobox';

const DescriptionProduct = (prodotto) => {

    //Array che contiene i titoli 
    const arrayTitle = ['Panoramica prodotto', 'Perché sceglierlo', 'Dettagli']

    return DOM.section({className: 'bento-box border-white/5 border-[1px] rounded-lg backdrop-blur-lg p-4 md:p-5 flex flex-col lg:flex-row gap-10'}, [
        //Div che contiene i testi 
        DOM.div({className: 'w-full lg:w-1/2 flex flex-col gap-6 col-span-1 order-2 lg:order-1'}, [
            ...arrayTitle.map((title, i) => {
                return DOM.div({className:'flex flex-col gap-2'}, [
                    DOM.h3({className: 'fs-4 text-semibold'}, [title]),
                    DOM.p({}, [prodotto.descrizioni[i]])
                ])
            })
        ]),
        //Div che contiene la tab
        DOM.div({className: 'w-full lg:w-1/2 max-h-full order-1 lg:order-2'}, [
            DOM.div({className: 'md:bento-box md:border-white/5 md:border-[1px] md:rounded-md md:backdrop-blur-lg md:p-5 h-full'}, [
                Tab({className: 'w-full', name: 'tab-caratteristiche', caratteristiche: prodotto.caratteristiche, avanzate: prodotto.caratteristicheAvanzate })
            ])
        ]),
    ])
} 

export default DescriptionProduct;