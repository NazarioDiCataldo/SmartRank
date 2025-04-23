import DOM from 'just-dom';
import Button from './Button';

const Modal = (modalRef) => {

    return DOM.dialog({id: 'modal', className: "modal", ref: modalRef}, [
        DOM.div({ className: "modal-box bento-box p-5 rounded-[36px]" }, [
          DOM.h3({ className: "text-lg font-bold" }, [``]),
          //Modal body
          DOM.div({className: "p-0 modal-body" }, []),
          DOM.div({ className: "modal-action" }, [
              Button({type:'button', className: '', status: 'solid', onclick: () => {modalRef.current.close()}}, ['Chiudi'])
          ]),
        ]),
      ]);      
      
}

export default Modal;