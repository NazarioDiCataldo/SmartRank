import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

const Bentobox = ({id, className = ''}, children) => {
    return DOM.div({id, className: twMerge('bento-box border-white/5 border-[1px] rounded-2xl backdrop-blur-lg py-5 px-5 lg:h-[360px]', className)}, [children])
}

export default Bentobox;