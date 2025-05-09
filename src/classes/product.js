import Card from "../components/ui/Card";
import HorizontalCard from "../components/ui/HorizontalCard";
import { averageCalculator } from "../utilities/setRating";

export default class Product {

    constructor(id, nome, url, marca, categoria, immagine, prezzi, rivenditori, rivenditoriLogo, caratteristiche, caratteristicheAvanzate) {
        this.id = parseInt(id);
        this.nome = nome;
        this.url = url;
        this.marca = marca;
        this.categoria = categoria;
        this.immagine = immagine;
        this.prezzi = prezzi;
        this.rivenditori = rivenditori;
        this.rivenditoriLogo = rivenditoriLogo;
        this.caratteristiche = caratteristiche;
        this.caratteristicheAvanzate = caratteristicheAvanzate;
        this.recensioni = [];
        this.valutazione = 0;
    }

    //Passo direttamente l'array di recensioni su cui verranno filtrati per idProdotto
    addReview(reviews) {
        reviews.forEach(r => {
            if(r.idProdotto === this.id) {
                this.recensioni.push(r);
            }
        })
    }

    //Funzione che ritorna tutte le valutazioni, utile per calcolare la media e il numero di recensioni
    getAllValutations() {
        //Mi creo un array di appoggio che contiene tutti le valutazioni
        const arrayValues = [];
        this.recensioni.forEach(r => arrayValues.push(r.valutazione));

        //Ritorno un oggetto che contiene sia l'array stesso che la sua lunghezza
        return {
            valutazioni: arrayValues,
            lunghezza: arrayValues.length,
        }
    }

    //Imposta la valutzione media finale
    setValutazion() {
        this.valutazione = parseFloat(averageCalculator(this.getAllValutations().valutazioni))
    }

    createCard(target) {

        if(!target) {
            return Card({
                id: this.id, 
                url: this.url, 
                cardOptions: {nome: this.nome, marca: this.marca, categoria: this.categoria, immagine: this.immagine, prezzi: this.prezzi}, 
                reviewObj: {idReview: `Rating-${this.id}` , reviews: this.getAllValutations().valutazioni}})
        } else {
            return HorizontalCard({
                id: this.id, 
                href: this.url,
                cardOptions: {
                    src: this.immagine,
                    mark: this.marca,
                    title: this.nome,
                    lowestPrice: this.prezzi[0],
                    alt: `Anteprima di ${this.nome}, della ${this.marca}`,
                },
                reviewObj: {idReview: `Rating-${this.id}` , reviews: this.getAllValutations().valutazioni},
            })
        }
    }
}