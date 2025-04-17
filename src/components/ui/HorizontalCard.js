import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';
import Rating from './Rating';

const HorizontalCard = ({id, className = '', href, cardOptions}) => {
    const {src, mark, title, numReviews, reviews, lowestPrice, alt} = cardOptions;
    return DOM.a({id, href, className: 'flex w-max gap-3 py-6 px-4 rounded-2xl bg-gradient-to-tl from-[rgba(40, 228, 150, 15%) to-[rgba(255,255,255,5%)]]'}, [
        DOM.figure({className: 'h-[198px]'},[
            DOM.img({src, className: 'h-[100%]', alt},[])
        ]),
        DOM.div({className: 'flex flex-col justify-between'}, [
            DOM.div({className: 'gap-3'}, [
                DOM.p({}, mark),
                DOM.h5({},title)
            ]),
            Rating({id: `rating-${id}`}),
            DOM.div({className: 'text-right flex gap-2'}, [
                DOM.span({className: 'text-sm text-white/60'}, ['da ']),
                DOM.strong({className: 'text-white text-xl'}, [`${lowestPrice} €`])
            ])
        ])
    ])
}

export default HorizontalCard;