import DOM from 'just-dom'
import Header from './components/Header';
import Offcanvas from './components/ui/Offcanvas';
import Footer from './components/Footer';

const App = () => {
    return DOM.fragment([
        Header(),
        DOM.div({dataVanillaRouteEle: 'router-wrap'}),
        Footer(),
    ])

};

export default App;