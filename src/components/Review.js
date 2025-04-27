import DOM, { createRef } from 'just-dom';
import { twMerge } from 'tailwind-merge';
import Progress from './ui/Progress';
import Button from './ui/Button';
import setModal from '../utilities/setModal';
import Rating from './ui/Rating';
import setRating from '../utilities/setRating';

const Review = (modalRef, value,  showRedmore = true, idReviews = 'ciaociao') => {
    const ratingRef = createRef()
    const averageRef = createRef()

    //Mi creo l'oggetto rating per modificare le stelle
    const rating = Rating({idReviews, className: 'rating-xs', ref: ratingRef});

    //Mi creo il dom elem della media
    const average = DOM.p({ ref: averageRef, className: 'body-sm font-medium'},[])
    //Impostiamo il numero di stelle in base al numero di recensioni e la somma di queste
    setRating(value, ratingRef, averageRef)

    //Mi creo le prograss bar delle varie specifiche tecniche
    const progressPrestazioni = Progress({value: 4, labelText: 'Prestazioni'})
    const progressDisplay = Progress({value: 4.3, labelText: 'Display'})
    const progressBatteria = Progress({value: 4.3, labelText: 'Batteria'})
    const progressFotocamera = Progress({value: 4.3, labelText: 'Fotocamera'})

    //Mi creo il dom element del bottone
    const button = Button({type: 'button', className: '', status: 'ghost', onclick: () => { 
        setModal(modalRef, '', Review(modalRef, value, showRedmore = false))
        modalRef.current.showModal();
    }}, ['Leggi di più']);

    //in base al valore di showReadmore, mi creo la variabile readMoreClass che sarà aggiunta al twMerge del classname del paragrafo della recensione
    const readMoreClass = showRedmore ? 'h-[3rem] overflow-hidden text-ellipsis mask-b-from-20%' : '';

    return DOM.div({className: 'flex flex-col bento-box border-white/5 border-[1px] rounded-2xl py-5 px-5'}, [
        //Top della card
        DOM.div({className: 'flex gap-4 items-center mb-4'}, [
            //Foto profilo
            DOM.figure({className: 'w-[2rem] h-[2rem]'}, [
                DOM.img({src:'./facebook.svg', alt: 'Foto profilo di Andrea Pasquati', className: 'w-[100%] h-auto'}, [])
            ]),
            DOM.div({className: 'flex flex-col gap-0]'}, [
                //nome utente
                DOM.p({className: 'font-medium text-sm'}, ['Andrea Pasquati']),
                //Data recensione
                /* DOM.small({className: 'body-xs text-white/60'}, ['11/03/2025']) */
                //Rating rapido
                DOM.div({className: 'flex gap-2 items-center flex-wrap'}, [
                    rating,
                    average,
                ]),
            ])

        ]),
        //body della card
        DOM.div({className: 'flex flex-col gap-2'}, [
            DOM.h5({className: 'font-semibold'}, ['Il miglior telefono che abbia mai avuto']),
            DOM.p({className: twMerge('body-sm', readMoreClass)}, [`Già in passato avevo utilizzato il vostro canale per un prestito restituito dopo poco.
Soddisfatto sia della parte online che del contatto telefonico con i vostri agenti.`]),
            showRedmore ? button : null,
        ]),
        //footer della card
        showRedmore 
        ? null
        : DOM.div({className: 'flex flex-wrap gap-4 mt-6'}, [
            progressPrestazioni,
            progressDisplay,
            progressFotocamera,
            progressBatteria,
        ]),
    ])
}

export default Review;