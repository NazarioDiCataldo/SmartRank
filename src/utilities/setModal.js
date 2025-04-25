const setModal = (modalRef, modalTitle = '', children) => {
    const modalBody = modalRef.current.querySelector('.modal-body')
    modalRef.current.querySelector('.modal-head h3').textContent = modalTitle;
    modalBody.innerHTML = '';
    modalBody.append(children)
}
export default setModal;