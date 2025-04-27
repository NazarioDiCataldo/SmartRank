const setModal = (modalRef, modalTitle = '', children) => {
    const modalBody = modalRef.current.querySelector('.modal-body')
    const modalHead = modalRef.current.querySelector('.modal-head')
    const modalH3 = modalHead.querySelector('.modal-head h3')

    modalH3.textContent = modalTitle;
    if(modalTitle !== '') {
        modalH3.classList.add('mb-5')
    } else {
        modalH3.classList.remove('mb-5')
    }

    modalBody.innerHTML = '';
    modalBody.append(children)
}
export default setModal;