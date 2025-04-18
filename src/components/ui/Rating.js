import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Rating = ({id, className = '', ref}) => {

    return DOM.div({ref, className: "rating rating-sm rating-half" }, [
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-1",
          ariaLabel: "0.5 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "1 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "1.5 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "2 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "2.5 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "3 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "3.5 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "4 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-1 ",
          ariaLabel: "4.5 star",
        }),
        DOM.input({
          type: "radio",
          name: "rating-11",
          className: "mask mask-star-2 mask-half-2 ",
          ariaLabel: "5 star",
        }),
      ]);
      
      
        /* onclick: initializeRating({id, half, halfShow, readOnly, numbers: floatAverage, starOn, starHalf, hints: arrayHints, onclick: onChange })},
        []) */
}


export default Rating;