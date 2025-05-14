import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Bentobox = ({id, className = '', ref = ''}, children) => {
    return DOM.div({id, className: twMerge('bento-box border-white/5 border-[1px] rounded-2xl backdrop-blur-lg p-4 md:p-5 lg:h-[23rem]', className), ref}, children)
}

export default Bentobox;