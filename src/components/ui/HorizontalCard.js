import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';
import Rating from './Rating';
import setRating from '../../utilities/setRating';

const HorizontalCard = ({id, className = '', href, cardOptions}) => {
    const {src, mark, title, reviews, lowestPrice, alt} = cardOptions;
    const ratingRef = createRef()
    const averageRef = createRef()
    //Mi creo l'oggetto rating per modificare le stelle
    const rating = Rating({id: `rating-${id}`, ref: ratingRef});
    //Mi creo il dom elem della media
    const average = DOM.p({ ref: averageRef},[])
    //Impostiamo il numero di stelle in base al numero di recensioni e la somma di queste
    setRating(reviews, ratingRef, averageRef)

    //Mi creo la card
    return DOM.a({id, href,className: 'flex w-[100%] lg:w-min-[20rem] gap-3 py-5 px-4 rounded-2xl border-white/5 border-[1px] bg-gradient-to-br shadow-[0_0_12px_rgba(40,228,150,0.1)] hover:shadow-[0_0_16px_1px_rgba(40,228,150,0.15)] from-[rgba(40,228,150,15%)] hover:from-15% to-[rgba(255,255,255,5%)] hover:to-75% hover: scale-[1.02] hover:translate-y-[-2px] transition-all duration-300'}, [

        //Immagine
        DOM.figure({className: 'w-[50%]'},[
            DOM.img({src, className: 'h-[100%]', alt},[])
        ]),
        //Sezione testuale
        DOM.div({className: 'flex flex-col gap-4 w-[50%]'}, [
            //Testo e titolo
            DOM.div({className: 'gap-3'}, [
                DOM.p({}, mark),
                DOM.h5({},title)
            ]),
            //Rating
            DOM.div({className: 'flex gap-2 items-center flex-wrap'}, [
                rating,
                average,
                DOM.small({className: 'text-sm text-white/60 '}, [` ${reviews.length} recensioni`]),
            ]),
            //Prezzo              
            DOM.div({className: ' w-[100%] justify-end flex items-end gap-2'}, [
                DOM.span({className: 'body-sm text-white/60'}, ['da ']),
                DOM.strong({className: 'text-white body-xl'}, [`${lowestPrice} €`])
            ])
        ])
    ])
}

export default HorizontalCard;