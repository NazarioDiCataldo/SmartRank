import DOM from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";

const Recensione = () => {
    setActive('')
    document.title = 'Recensione';
    return DOM.div({}, ['ciao'])
}

export default Recensione;