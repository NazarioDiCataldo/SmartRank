import DOM, { createRef } from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";
import IntroProduct from '../components/IntroProduct';
import Bentobox from '../components/Bentobox';
import DescriptionProduct from '../components/DescriptionProduct';
import ReviewsProduct from '../components/ReviewsProduct';
import PricesProduct from '../components/PricesProduct';
import Modal from '../components/ui/Modal';
import ReviewsStore from '../classes/reviews_store';

export async function getReviews(idProdotto = '', errorTextRef = null) { 
    try {
        const endpoint = idProdotto ? `http://localhost:3000/reviews?idProdotto=${idProdotto}` : 'http://localhost:3000/reviews'; 
        const res = await fetch(endpoint);
        const reviews = await res.json();
        return reviews

    } catch (err) {
        //Se c'è un errore, ritorna una p con un messaggio di errore
        errorTextRef.current.classList.remove('hidden');
        errorTextRef.current.textContent = `Errore nel recupero dei prodotti: ${err}`;
    }
}

const Dettaglio = () => {
    //Mi creo il contenitore di recensioni
    const reviewsStore = new ReviewsStore();

    setActive(routeLocation())
    document.title = 'Dettaglio';

    //Mi prendo lo slug
    const { id } = routeLocation().params;

    //Mi creo le ref
    const errorTextRef = createRef() //Ref al testo di errore
    const bentoboxRef = createRef() //Ref al wrapper che contiene tutta la scheda prodotto
    const modalRef = createRef();

    const modal = Modal({className: 'rounded-3xl'}, modalRef)

    //Messaggio di errore, di default è nascosto
    const errorText = DOM.span({className: 'text-white hidden text-center', ref: errorTextRef}, []);

    const getSingleProduct = async () => {
        try {
            // recupero il singolo prodotto con slug corrispondente a quello del database
            const res = await fetch(`http://localhost:3000/products?url=${id}`);
            const product = await res.json();

            //Destructuring dell' array per ricavare l'oggetto
            const [prodotto] = product;

            //Mi salvo le recensioni in una variabile
            reviewsStore.reviews = await getReviews(prodotto.id, errorTextRef)

            //Creazioni delle varie sezioni della pagina
            bentoboxRef.current.append(errorText)
            bentoboxRef.current.append(IntroProduct(prodotto, reviewsStore.reviews)) //Intro (foto prodotto, nome, prezzo, recensioni)
            bentoboxRef.current.append(DescriptionProduct(prodotto)) //Sezione descrizione: testi, tab
            bentoboxRef.current.append(ReviewsProduct(modalRef, reviewsStore, prodotto.categoria, prodotto.nome, prodotto.url)) //Sezione recensioni
            bentoboxRef.current.append(PricesProduct(prodotto))

            errorTextRef.current.classList.add('hidden');
        } catch (err) {
            console.log(err)
            //Se c'è un errore, ritorna una p con un messaggio di errore
            errorTextRef.current.classList.remove('hidden');
            errorTextRef.current.textContent = `Errore nel recupero dei prodotti: ${err}`;
        }

    };

    //Chiamo la funzione
    getSingleProduct();

    return DOM.main({className: 'container py-8 lg:py-14'}, [
        //Wrapper principale
        Bentobox({id: `scheda-${id}`, ref: bentoboxRef, className:'!h-max flex flex-col gap-14'}, []),
        //modal
        modal
    ])
}

export default Dettaglio;