//Avremo 10 diverse combinazioni
function getRatingIndex(score) {
    // Ogni stella ha due "mezze": quindi 5 * 2 = 10 livelli
    // Moltiplichiamo per 2 per ottenere l’indice corretto (da 1 a 10)
    return Math.round(score * 2);
}

export function calculateColor(average) {
  if (average >= 4.5) {
      return {
          background: 'bg-green-500',
          text: 'text-green-500', // Verde
          content: 'Ottimo',
          color: 'green-500',
      }
    } else if (average >= 3.5) {
      return {
          background: 'bg-lime-500', // Verde chiaro
          text: 'text-lime-500',
          content: 'Buono',
          color: 'lime-500',
      }
    } else if (average >= 2.5) {
      return {
          background: 'bg-yellow-500', // Giallo
          text: 'text-yellow-500',
          content: 'Nella media',
          color: 'yellow-500',
      }
    } else if (average >= 1.5) {
      return {
          background: 'bg-orange-500',
          content: 'Deludente',
          text: 'text-orange-500', // Arancio
          color: 'orange-500',
      }
    } else if (average >= 0.5) {
      return {
          background: 'bg-red-500',
          content: 'Pessimo',
          text: 'text-red-500', // Rosso
          color: 'red-500'
      }
    } else {
      return {
        background: 'bg-gray-800', // Neutro
        text: 'text-white/80',
        content : 'Nessuna recensione',
        color: 'gray-800'
      } 
    }
}

//Mi calcolo la media delle recensioni
export function averageCalculator(reviews) {
    if(reviews.length > 0) {
      const sum = reviews.reduce((acc, currVal) => acc + currVal, 0);
      const av = sum / reviews.length;
      return av.toFixed(1);
    } else {
      return 0
    }
}

const setRating = (reviews, ratingRef, averageRef) => {
  const av = averageCalculator(reviews);
  //#00b67a verde  4.5 - 5 stelle
  //#73cf11 verde-chiaro 2 4 stelle
  //#ffce00 giallo 3 - 3.5 stelle
  //#ff8622 arancio 2 - 2.5 stelle
  //#ff3722 rosso 1 - 1.5 stelle 
  const color = calculateColor(av);
    //La media diventa indice dell'array, per cui sarà moltiplicata per 2
    const index = getRatingIndex(av);
    
    const stars = ratingRef.current.querySelectorAll(`.mask`);
    //Tolgo il checked, in caso il valore delle recensioni venisse aggiornato
    stars.forEach((element, i) => {
        stars[i].style.opacity = '0.2';
        const maskHalf = i % 2 === 0 ? 'mask-half-1' : 'mask-half-2'; 
        element.removeAttribute('checked')
        element.classList = 'mask mask-star-2 ' + maskHalf;
    });

    // Applica il checked giusto
    for(let i = 1; i <= index; i++) {
      stars[i - 1].style.opacity = '1';
      stars[i - 1].classList.add(color.background);
      if(i === index) {
          stars[i - 1].setAttribute('checked', 'checked')
        }
    }

    averageRef.current.textContent = av;
    averageRef.current.classList = color.text;
}

export default setRating;