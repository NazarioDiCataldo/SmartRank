import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';
import Progress from './ui/Progress';
import Button from './ui/Button';
import setModal from '../utilities/setModal';
import Rating from './ui/Rating';
import setRating from '../utilities/setRating';
import Link from './ui/Link';

const Review = (modalRef, rev, showRedmore = true, prodotto = null) => {

    const ratingRef = createRef()
    const averageRef = createRef()

    //Destructuring di rev, l'oggeto che contiene la recensione
    const { autore, data, ora, fotoProfilo, valutazione, titolo, testo, valutazioniTecniche } = rev;

    //Mi creo le classi in base al valore di showReadmore
    //Se questo è true, allora saranno valori 'piccoli' che andranno nelle anteprime delle recensioni o in zone secondarie
    //Se questo è false, allora saranno valori 'medi' che andranno nella pagina recensioni

    //Mi creo l'oggetto rating per modificare le stelle
    const classRating = showRedmore ? 'rating-xs' : 'rating-sm';
    //in base al valore di showReadmore, mi creo la variabile readMoreClass che sarà aggiunta al twMerge del classname del paragrafo della recensione
    const readMoreClass = showRedmore ? 'h-[1rem] overflow-hidden text-ellipsis mask-b-from-20%' : '';
    const classText = 'body-lg'; 
    const classImage = showRedmore ? 'w-[2.5rem] h-[2.5rem]' : 'w-[3rem] h-[3rem]';

    const rating = Rating({idReviews: '', className: classRating, ref: ratingRef});

    //Mi creo il dom elem della media
    const average = DOM.p({ ref: averageRef, className: 'body-sm font-medium'},[])
    //Impostiamo il numero di stelle in base al numero di recensioni e la somma di queste
    setRating([valutazione], ratingRef, averageRef)

    //Mi creo le prograss bar delle varie specifiche tecniche
    const arrayProgress = valutazioniTecniche.map(({etichetta, valore}) => Progress({value: valore, labelText: etichetta, className: 'w-full'}))

    //Mi creo il dom element del bottone
    const button = Button({type: 'button', className: '', status: 'ghost', onclick: () => { 
        setModal(modalRef, '', Review(modalRef, rev, showRedmore = false, prodotto))
        modalRef.current.showModal();
    }}, ['Leggi di più']);

    return DOM.div({className: 'flex flex-col bento-box border-white/5 border-[1px] rounded-2xl p-4 md:p-5 h-full'}, [
        //Top della card
        DOM.div({className: 'flex gap-4 items-center mb-4'}, [
            //Foto profilo
            DOM.figure({className: `${classImage}`}, [
                DOM.img({src: fotoProfilo, alt: `Foto profilo di ${autore}`, className: 'w-full h-full object-cover rounded-full'}, [])
            ]),
            DOM.div({className: 'flex flex-col gap-0 w-full'}, [
                //Div che contiene nome utente e data
                DOM.div({className: 'flex flex-col md:flex-row justify-between items-baseline w-full'},[
                    //nome utente
                    DOM.p({className: `font-medium body-md`}, [`${autore}`]),
                    //data
                    DOM.small({className:`body-sm text-white/80 ${showRedmore ? 'hidden' : null}`}, [`${data} ${ora}`])
                ]),
                //Rating rapido
                DOM.div({className: 'flex gap-2 items-center flex-wrap'}, [
                    rating,
                    average,
                ]),
            ])

        ]),
        //Riferimento al prodotto
        DOM.div({className:`gap-2 items-center mb-2 ${prodotto ? 'flex' : 'hidden'}`}, [
            DOM.p({className: 'text-white/60'}, ['Su']),
            Link({href: `/catalogo/${prodotto?.url}`, className: 'underline'}, [`${prodotto?.nome}`])
        ]),
        //body della card
        DOM.div({className: 'flex flex-col justify-between h-full'}, [
            DOM.div({className: 'flex flex-col gap-2'}, [
                DOM.h5({className: `font-medium ${classText}`}, [`${titolo}`]),
                DOM.p({className: twMerge('body-md', readMoreClass)}, [`${testo}`]),
            ]),
            showRedmore ? button : null,
        ]),
        //footer della card
        showRedmore 
        ? null
        : DOM.div({className: `grid ${prodotto ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'} gap-4 pt-8`}, [
            ...arrayProgress
        ]),
    ])
}

export default Review;