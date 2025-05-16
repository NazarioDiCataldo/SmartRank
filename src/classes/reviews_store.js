import Review from "../components/Review";

//Mi creo la classe che contiene tutte le recensioni
export default class ReviewsStore {

    constructor(reviews = []) {
        this.reviews = reviews;
    }

    //Aggiungo una review all'array
    addReview(review) {
        if(review) this.reviews.push(review)
    }

    //Appendo il nuovo array filtrato alla griglia
    appendToGrid(gridRef, modalRef) {

        this.reviews.forEach(r => {
            gridRef.append(Review(modalRef, r,  false))
        })
    }

    filterReviews({titleReview = null, valueReview = null, dateReview = null}) {
        return this.reviews.filter(r => {

            // Se nessun filtro è attivo, ritorna tutto
            if (!titleReview && !valueReview && !dateReview) {
                    
                //Quindi vuol dire che il prodotto non sarà scartato
                return true;
            }

            //Se ha superato la prima condizione, vuol dire che ci sono dei filtri
            //Andiamo a vedere se il prodotto passa le condizioni successive
            //Impostiamo di default true, quindi partiamo che il prodotto passerà
            let matches = true;

            //Se è attivo il filtro titleReview, vediamo se combacia il titolo della recensione inserito dall'utente 
            if(titleReview) {    
                //Matches sarà uguale a un true o false
                //Verifichiamo prima che matches sia true, quindi per il momento la recensione sta soddisfando i filtri precedenti
                //Poi verifichiamo se la stringa passata dall'utente, sia inclusa nel titolo della recensione, trascritto tutto in minuscolo
                matches = matches && r.titolo.toLowerCase().includes(titleReview.toLowerCase());
            }

            //Se è attivo il filtro valueReview, vediamo se la valutazione della recensione è maggiore o uguale a quella scelta dall'utente 
            if(valueReview) {
                //Matches sarà uguale a un true o false
                //Verifichiamo prima che matches sia true, quindi per il momento la recensione sta soddisfando i filtri precedenti
                //Poi verifichiamo se la valutazione della recensione, trasformata in integer, sia maggiore o uguale del filtro
                matches = matches && r.valutazione >= parseFloat(valueReview);
            }

            //Se è attivo il filtro valueReview, vediamo se la valutazione della recensione è maggiore o uguale a quella scelta dall'utente 
            if(dateReview) {
                //Mi creo la data corrente
                const currentDate = new Date();
                //Mi prendo la data filtrata, quindi devo vedere tutte le recensioni pubblicati negli ultimi [num] giorni
                //Ovvero vedere se la data di quella recensione è minore della data corrente, meno il numero di giorni inserito dall'utente
                const filterDate = new Date(currentDate - parseInt(dateReview) * 24 * 60 * 60 * 1000)
                //Variabile date che prende sia l'orario che la data della recensione
                const reviewDate = new Date(`${r.data}, ${r.ora}`)
                matches = matches && reviewDate >= filterDate;
            }

            return matches
        })
    }

    //Ordina l'array di recensioni in base ad un parametro
    sortReviews(order) {
        
        switch(order) {
            case 'Recensioni più recenti':
                this.lastlyReviews();
                break;
            case 'Recensioni meno recenti':
                this.oldestReviews();
                break;
            case 'Valutazioni più alte':
                this.higerRatings();
                break;
            case 'Valutazioni più basse':
                this.lowerRatings();
                break;
            default: 
                this.lastlyReviews();
                break;
        }
    }

    //Recensioni più recenti
    lastlyReviews() {
        function compare( a, b ) {
            const dateA = new Date(`${a.data}, ${a.ora}`)
            const dateB = new Date(`${b.data}, ${b.ora}`)

            if ( dateA > dateB){
              return -1;
            }
            if ( dateA < dateB ){
              return 1;
            }
            return 0;
          }
          
        this.reviews.sort(compare);
    }

    //Recensioni meno recenti
    oldestReviews() {
        function compare( a, b ) {
            const dateA = new Date(`${a.data}, ${a.ora}`)
            const dateB = new Date(`${b.data}, ${b.ora}`)

            if ( dateA < dateB){
              return -1;
            }
            if ( dateA > dateB ){
              return 1;
            }
            return 0;
          }
          
        this.reviews.sort(compare);
    }

    //Valutazioni più alte
    higerRatings() {
        function compare( a, b ) {
            if ( a.valutazione > b.valutazione ){
              return -1;
            }
            if ( a.valutazione < b.valutazione){
              return 1;
            }
            return 0;
          }
          
        this.reviews.sort(compare);
    }

    //Valutazioni più basse
    lowerRatings() {
        function compare( a, b ) {
            if ( a.valutazione < b.valutazione){
              return -1;
            }
            if ( a.valutazione > b.valutazione){
              return 1;
            }
            return 0;
          }
          
        this.reviews.sort(compare);
    }

    //Ritorna la singola recensione e può essere cercata tramite id, titolo, testo, valutazione o idProdotto
    getSingleReview({id = null, titolo = null, testo = null, valutazione = null, idProdotto = null}) {
        const filterValue = id || titolo || testo || valutazione || idProdotto
        return this.reviews.filter(r => {
            if(filterValue) {
                if(r[filterValue] === filterValue) {
                    return r[filterValue]
                }
            }
        })
    }   
}