//Array di oggetti con i vari colori delle stelline piene e metà
const ratingValueColors = [
    {
        starOn: './star-on-terribile.svg',
        starHalf: './star-half-on-terribile.svg',
    },
    {
        starOn: './star-on-deludente.svg',
        starHalf: './star-half-on-deludente.svg',
    },
    {
        starOn: './star-on-mediocre.svg',
        starHalf: './star-half-on-mediocre.svg',
    },
    {
        starOn: './star-on-buono.svg',
        starHalf: './star-half-on-buono.svg',
    },
    {
        starOn: './star-on-ottimo.svg',
        starHalf: './star-half-on-ottimo.svg',
    },
]

//Calcola la media delle recensioni
const averageCalculator = (numberOfReviews, reviews) => {
    const sum = reviews.reduce((acc, currValue) => acc + currValue, 0)
    const average = sum / numberOfReviews;

    //Rilascia un oggetto che contiene la media, espressa solo in numero intero e decimale, con 2 cifre dopo la virgola
    return {
        floatAverage: average.toFixed(2),
        intAverage: average.toFixed(0)
    }
}

const initializeRating = ({id, half = 'false', halfShow, readOnly, totalReviews, reviews, onclick = () => {}}) => {
    //destructuring per ricavare sia la media intera che decimale
    const {floatAverage, intAverage} = averageCalculator(totalReviews, reviews);
    //in base alla media intera, mi prendo il 'colore' della stella. Infatti utilizzo la media come indice dell' array
    //media 1 -> indice 0, perchè gli array partono da 0
    const {starOn, starHalf} = ratingValueColors[intAverage - 1]

    //Mi creo un oggetto Raty
    const raty = new Raty(document.querySelector(`#${id}`), {
        score: 5, //numero massimo di stelle
        half, //se è possibile selezionare anche metà stella
        halfShow, //mostrare la metà stellina
        readOnly,
        number: floatAverage, //quante stelle piene
        starOn, //src della stella piena
        starHalf, //src della stella a metà
        hints, //title attribute per ogni valutazione
        click: () => {
            onclick(); //callback
        }
    })
    raty.init();
}

export default initializeRating;