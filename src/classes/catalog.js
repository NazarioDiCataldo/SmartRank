import DOM from 'just-dom';
import { averageCalculator } from '../utilities/setRating';
import Product from './product';
import { getReviews } from '../pages/Dettaglio';
import ReviewsStore from './reviews_store';

export default class Catalog {
    constructor(products = []){
        this.products = products;
    }

    addProduct(product) {
        this.products.push(product)
    }
    
    getProductById(id) {
        const [prodotto] = this.products.filter(p => p.id === id)
        return prodotto;
    }

    getProductBySlug(url) {
        const [prodotto] = this.products.filter(p => p.url === url)
        return prodotto;
    }

    appendToGrid(gridRef, array = this.products){

        const productsFragment = DOM.fragment(            
            array.map(p => p.createCard(gridRef.target))
        )
        gridRef.current.append(productsFragment)
    }

    async loadProducts(messageRef = null) {
        const reviewsStore = new ReviewsStore()

        try {
            reviewsStore.reviews = await getReviews("")

            const res = await fetch("http://localhost:3000/products")
            const data = await res.json();
            data.map(p => {
                            //Mi creo l'oggetto prodotto
                            const product = new Product(p.id, p.nome, p.url, p.marca, p.categoria, p.immagine, p.prezzi, p.rivenditori, p.rivenditoriLogo, p.caratteristiche, p.caratteristicheAvanzate)
                            //aggiungo la recensioni al prodotto
                            product.addReview(reviewsStore.reviews);
                            //Imposto la valutazione del prodotto
                            product.setValutazion()
                            //aggiungo il prodotto al catalogo
                            this.addProduct(product)
                        })
        } catch (err) {
            messageRef.current.textContent = `Errore nel recupero dei prodotti: ${err}`;
        }
    }

    filterCatalog({nameProduct = null, categoryProduct = null, valueProduct = null, priceProduct = null}) {

        const filtered = this.products.filter(p => {
            // Se nessun filtro è attivo, ritorna tutto
            if (!nameProduct && !categoryProduct && !valueProduct && !priceProduct) {
                    
                //Quindi vuol dire che il prodotto non sarà scartato
                return true;
            }

            //Se ha superato la prima condizione, vuol dire che ci sono dei filtri
            //Andiamo a vedere se il prodotto passa le condizioni successive
            //Impostiamo di default true, quindi partiamo che il prodotto passerà
            let matches = true;

            //Se attivo il filtro nameProduct, il nome inserito dall'utente, vediamo se combacia
            if(nameProduct) {
                const nameWithSpaces = nameProduct.split('-').join(' ');         
                //Matches sarà uguale a un true o false
                //Verifichiamo prima che matches sia true, quindi per il momento il prodotto sta soddisfando i filtri precedenti
                //Poi verifichiamo se la stringa passata dall'utente, sia inclusa nel nome del prodotto, trascritto tutto in minuscolo
                matches = matches && p.nome.toLowerCase().includes(nameWithSpaces.toLowerCase());
            }

            //Poi verifichiamo se è presente il filtro sulla categoria
            if(categoryProduct) {
                //Prima verifichiamo che matches sia ancora true
                //Poi verifichiamo se la categoria del prodotto, corrisponda a quella scelta dall'utente
                matches = matches && p.categoria.toLowerCase() === categoryProduct.toLowerCase();
            }

            //Terza condizione: verificare se la valutazione del prodotto è maggiore o uguale a quella scelta dall'utente
            if (valueProduct) {
                //Verifica se matches sia ancora true
                //Mi calcolo la media delle recensioni, attraverso una funzione e verifico se questa è maggiore o uguale a quella chiesta dall'utente
                matches = matches && averageCalculator(p.getAllValutations().valutazioni) >= valueProduct;
            }

            //Quarta condizione: verificare se il prezzo più basso del prodotto è compreso tra il range di prezzo scelto dall'utente
            if(priceProduct) { //Verifico se è presente il filtro sul prezzo
                
                //Prima verifico se matches sia ancora true
                //Poi controllo se il prezzo più basso prezzi[0] è più alto o uguale del valore minimo priceProduct[0]
                //e se è anche più basso o uguale al valore massimo priceProduct[1]
                matches = matches && (p.prezzi[0] >= priceProduct[0] && p.prezzi[0] <= priceProduct[1])
            }
    
            //Alla fine di tutto ritorno matches
            //Se matches sarà ancora true, il prodotto soddisfa i filtri e sarà passato all'array finale, che verrà mappato
            //Se matches sarà false, il prodotto sarà scartato dall'array finale
            return matches;
        })

        return filtered
    }

    sortProducts(order) {
        switch(order) {
            case 'Rilevanza': 
                this.defaultSort();
                break;
            case 'Recensioni più alte':
                this.higerValutations();
                break;
            case 'Recensioni più basse':
                this.lowerValutations();
                break;
            case 'Prezzo più basso':
                this.higerPrice();
                break;
            case 'Prezzo più alto':
                this.lowerPrice();
                break;
            default: 
                this.defaultSort();
                break;
        }
    }

    higerPrice() {
        function compare( a, b ) {
            if ( a.prezzi[0] < b.prezzi[0] ){
              return -1;
            }
            if ( a.prezzi[0] > b.prezzi[0]){
              return 1;
            }
            return 0;
          }
          
        this.products.sort(compare);
    }

    lowerPrice() {
        function compare( a, b ) {
            if ( a.prezzi[0] > b.prezzi[0] ){
              return -1;
            }
            if ( a.prezzi[0] < b.prezzi[0]){
              return 1;
            }
            return 0;
          }
          
        this.products.sort(compare);
    }

    higerValutations() {
        function compare( a, b ) {
            if ( a.valutazione > b.valutazione ){
              return -1;
            }
            if ( a.valutazione < b.valutazione ){
              return 1;
            }
            return 0;
          }
          
        this.products.sort(compare);
    }

    lowerValutations() {
        function compare( a, b ) {
            if ( a.valutazione < b.valutazione ){
              return -1;
            }
            if ( a.valutazione > b.valutazione ){
              return 1;
            }
            return 0;
          }
          
        this.products.sort(compare);
    }

    defaultSort() {
        function compare( a, b ) {
            if ( a.id < b.id ){
              return -1;
            }
            if ( a.id > b.id ){
              return 1;
            }
            return 0;
          }
          
        this.products.sort(compare);
    }
}