import DOM from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";

const Catalogo = () => {
    setActive('Catalogo')
    document.title = 'Catalogo';
    return DOM.div({}, ['ciao'])
}

export default Catalogo