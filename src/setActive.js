const setActive = (pathname) => {
    //Il pathname può essere sia una stringa che è un ogetto, se è una stringa mi prendo direttamente il suo valore
    //se è un oggetto, mi prendo la proprietà pathname che contiene il pathname corretto
    const correctPathname = typeof(pathname) === 'object' ? pathname.pathname : pathname
    //Prendo tutte le a e le rimuovo la classe 'current-page'
    const aTags = document.querySelectorAll('.list-navbar a');
    aTags.forEach(elem => {
        elem.classList.remove('current-page');
        //Se il pathname include parte del text content della a allora aggiungo la classe 'current-page'
        if(correctPathname.includes(elem.textContent.toLowerCase())) {
            elem.classList.add("current-page");
        }
    })
}

export default setActive