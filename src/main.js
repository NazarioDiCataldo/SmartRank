import './style.css';
import 'flyonui/flyonui';
import { BrowserRoute } from '@codingspook/vanilla-routing';
import App from './App';
import DOM from 'just-dom';
import Homepage from './pages/Homepage';
import Catalogo from './pages/Catalogo';
import Contatti from './pages/Contatti';
import Recensione from './pages/Recensione';
import Dettaglio from './pages/Dettaglio';

const routes = [
  {
      pathname: '/',
      element: Homepage,
  },
  {
      pathname: '/catalogo',
      element: Catalogo,
  },
  {
      pathname: '/contatti',
      element: Contatti,
  },
  {
      pathname: '/recensione',
      element: Recensione,
  },
  {
    pathname: '/catalogo/:id', //Id sarà l'id del prodotto che verrà passato dinamicamente e determinerà la pagina del dettaglio
    element: Dettaglio,
},
]

DOM.createRoot("app", App());
BrowserRoute(routes)

function ciao() {
  console.log(document.querySelector(`#rating-ciao`))
}
ciao()