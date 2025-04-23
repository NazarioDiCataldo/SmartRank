import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

function calculateColor(average) {
    if (average >= 4.5) {
        return {
            background: 'bg-green-500',
            text: 'text-green-500', // Verde
        }
      } else if (average >= 3.5) {
        return {
            background: 'bg-lime-500', // Verde chiaro
            text: 'text-lime-500',
        }
      } else if (average >= 2.5) {
        return {
            background: 'bg-yellow-500', // Giallo
            text: 'text-yellow-500',
        }
      } else if (average >= 1.5) {
        return {
            background: 'bg-orange-500',
            text: 'text-orange-500' // Arancio
        }
      } else if (average >= 0.5) {
        return {
            background: 'bg-red-500',
            text: 'text-red-500' // Rosso
        }
      } else {
        return '#999'; // Neutro
      }
}

const Progress = ({value, labelText}) => {
    //Mi calcolo la percentaule della progress bar
    const perc = Math.min((value / 5) * 100, 100)
    //Colore della progress
    const color = calculateColor(value);
    const progress = DOM.div({className: `rounded-3xl h-[100%] ${color.background}`}, []);
    progress.style.width = `${perc}%`;

    return DOM.div({className: ' w-[8rem]'}, [
        DOM.p({className: 'font-medium'}, labelText),
        DOM.div({className: 'flex items-center gap-2'}, [
            DOM.div({className: `bg-white rounded-3xl w-[100%] h-[0.75rem] `}, [
                progress,
            ]),
            DOM.p({className: `text-sm ${color.text}`}, [`${value}`])
        ]),
    ])
}


export default Progress;