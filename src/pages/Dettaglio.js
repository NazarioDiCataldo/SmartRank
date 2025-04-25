import DOM from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";

const Dettaglio = () => {
    setActive(routeLocation())
    document.title = 'dettaglio';
    return DOM.div({}, ['ciao'])
}

export default Dettaglio;