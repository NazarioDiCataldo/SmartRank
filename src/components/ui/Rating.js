import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Rating = ({idReviews, className = '', ref}) => {
    return DOM.div({id: idReviews, ref, className: twMerge("rating rating-sm rating-half gap-0", className) }, [
        DOM.div({
          className: "mask mask-star-2 mask-half-1",
          ariaLabel: "0.5 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "1 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "1.5 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "2 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "2.5 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "3 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "3.5 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "4 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "4.5 star",
        }),
        DOM.div({
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "5 star",
        }),
      ]);
      
      
        /* onclick: initializeRating({id, half, halfShow, readOnly, numbers: floatAverage, starOn, starHalf, hints: arrayHints, onclick: onChange })},
        []) */
}


export default Rating;