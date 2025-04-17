import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Rating = ({id, className = ''}) => {
    return DOM.div({
        id, 
        className: twMerge('flex w-max ', className)},[]);
        /* onclick: initializeRating({id, half, halfShow, readOnly, numbers: floatAverage, starOn, starHalf, hints: arrayHints, onclick: onChange })},
        []) */
}


export default Rating;