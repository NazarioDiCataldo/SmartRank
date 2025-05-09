import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';
import Rating from './Rating';
import setRating from '../../utilities/setRating';

const HorizontalCard = ({id, className = '', href, cardOptions, reviewObj}) => {
    //Destructuring dei dettagli del prodotto per la card
    const {src, mark, title, lowestPrice, alt} = cardOptions;

    //Destructuring delle recensioni
    const {idReview, reviews} = reviewObj;

    const ratingRef = createRef()
    const averageRef = createRef()
    //Mi creo l'oggetto rating per modificare le stelle
    const rating = Rating({idReview, ref: ratingRef});
    //Mi creo il dom elem della media
    const average = DOM.p({ ref: averageRef},[])
    //Impostiamo il numero di stelle in base al numero di recensioni e la somma di queste
    setRating(reviews, ratingRef, averageRef)

    //Mi creo la card
    return DOM.a({id, href: `/catalogo/${href}`, className: twMerge('flex w-[16rem] md:w-[24rem] h-full flex-shrink-0 items-center gap-3 py-5 px-4 rounded-2xl border-white/5 border-[1px] bg-gradient-to-br shadow-[0_0_12px_rgba(40,228,150,0.1)] hover:shadow-[0_0_16px_1px_rgba(40,228,150,0.15)] from-[rgba(40,228,150,15%)] hover:from-15% to-[rgba(255,255,255,5%)] hover:to-75% hover: scale-[1.02] hover:translate-y-[-2px] transition-all duration-300', className)}, [

        //Immagine
        DOM.figure({className: 'w-1/2'},[
            DOM.img({src, className: 'w-full h-auto', alt},[])
        ]),
        //Sezione testuale
        DOM.div({className: 'flex flex-col gap-4 w-1/2'}, [
            //Testo e titolo
            DOM.div({className: 'gap-3'}, [
                DOM.small({className: 'text-white/60'}, mark),
                DOM.h5({className: 'md:whitespace-nowrap'},title)
            ]),
            //Rating
            DOM.div({className: 'flex gap-2 flex-col items-baseline'}, [
                rating,
                average,
                DOM.small({className: 'text-sm text-white/60 '}, [` ${reviews.length} ${reviews.length === 1 ? 'recensione' : 'recensioni'}`]),
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