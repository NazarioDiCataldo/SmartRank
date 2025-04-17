const setActive = (pathname) => {
    //Prendo tutte le a e le rimuovo la classe 'current-page'
    const aTags = document.querySelectorAll('.list-navbar a');
    aTags.forEach(elem => {
        elem.classList.remove('current-page');
        //Se il pathname include parte del text content della a allora aggiungo la classe 'current-page'
        if(pathname.includes(elem.textContent)) {
            elem.classList.add("current-page");
        }
    })
}

export default setActive