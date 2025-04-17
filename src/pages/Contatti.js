import DOM from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";

const Contatti = () => {
    setActive('Contatti')
    document.title = 'Contatti';
    return DOM.div({}, ['ciao'])
}

export default Contatti;