import DOM from 'just-dom';
import Button from './Button';
import { twMerge } from 'tailwind-merge';

const Modal = ({className = ''}, modalRef) => {

    return DOM.dialog({id: 'modal', className: "modal", ref: modalRef}, [
        DOM.div({ className: twMerge("modal-box bento-box p-5 rounded-[36px]", className) }, [
          //Modal head
          DOM.div({className: 'modal-head flex justify-between'}, [
            DOM.h3({ className: "text-lg font-bold" }, ['']),
          ]),
          //Modal body
          DOM.div({className: "p-0 modal-body" }, []),
          //Modal footer
          DOM.div({ className: "modal-action" }, [
              Button({type:'button', className: '', status: 'solid', onclick: () => {modalRef.current.close()}}, ['Chiudi'])
          ]),
        ]),
      ]);      
      
}

export default Modal;