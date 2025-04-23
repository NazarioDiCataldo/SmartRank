const setModal = (modalRef, review) => {
    const modalBody = modalRef.current.querySelector('.modal-body')
    modalBody.innerHTML = '';
    modalBody.append(review)
}
export default setModal;