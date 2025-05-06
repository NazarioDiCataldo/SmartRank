import DOM, { createRef, getElement } from 'just-dom';
import setActive from '../setActive';
import { routeLocation } from "@codingspook/vanilla-routing";
import Bentobox from '../components/Bentobox';
import Catalog from '../classes/catalog';
import Link from '../components/ui/Link';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import Range from '../components/ui/Range';
import { assignLabel } from '../components/ReviewsProduct';
import { calculateColor } from '../utilities/setRating';
import { validateField } from '../utilities/validation';
import Modal from '../components/ui/Modal';
import setModal from '../utilities/setModal';

//Mi importo il catalogo
const catalog = new Catalog();
await catalog.loadProducts();


const Recensione = () => {
    //Mi prendo il prodotto in base al suo slug, che mi ricavo dalla barra di ricerca
    const slug = routeLocation().search.prodotto;
    const prodotto = catalog.getProductBySlug(slug);

    setActive('')
    document.title = 'Recensione';

    //Oggetto che contiene gli errori
    let errors = {};

    //Oggetto che contiene tutti i campi del form
    let formData = {};

    //mi creo le ref
    const modalRef = createRef();
    const submitButtonRef = createRef();

    //Array di oggetti con tutti i valori dei filtri, che verrà iterato
    const radioValues = [
        {
            value: '1',
            name: '★ 1',
            label: 'valutazione',
            className: 'px-3 md:px-4 rounded-r-none hover:text-white hover:!border-red-500 hover:!bg-red-500/10 active:!border-red-500 active:!bg-red-500/50 active:!text-white focus:!border-red-500 focus:!bg-red-500 focus:!text-white checked:!border-red-500 checked:!bg-red-500 checked:!text-white',
            onClick: appearComment
        },
        {
            value: '2',
            name: '★ 2 ',
            label: 'valutazione',
            className: 'px-3 md:px-4 rounded-none hover:text-white hover:!border-orange-500 hover:!bg-orange-500/10 active:!border-orange-500 active:!bg-orange-500/50 active:!text-white focus:!border-orange-500 focus:!bg-orange-500 focus:!text-white checked:!border-orange-500 checked:!bg-orange-500 checked:!text-white',
            onClick: appearComment
        },
        {
            value: '3',
            name: '★ 3 ',
            label: 'valutazione',
            className: 'px-3 md:px-4 rounded-none hover:text-white hover:!border-yellow-500 hover:!bg-yellow-500/10 active:!border-yellow-500 active:!bg-yellow-500/50 active:!text-white focus:!border-yellow-500 focus:!bg-yellow-500 focus:!text-white checked:!border-yellow-500 checked:!bg-yellow-500 checked:!text-white',
            onClick: appearComment
        },
        {
            value: '4',
            name: '★ 4 ',
            label: 'valutazione',
            className: 'px-3 md:px-4 rounded-none hover:text-white hover:!border-lime-500 hover:!bg-lime-500/10 active:!border-lime-500 active:!bg-lime-500/50 active:!text-white focus:!border-lime-500 focus:!bg-lime-500 focus:!text-white checked:!border-lime-500 checked:!bg-lime-500 checked:!text-white',
            onClick: appearComment
        },
        {
            value: '5',
            name: '★ 5',
            label: 'valutazione',
            className: 'px-3 md:px-4 rounded-l-none hover:text-white hover:!border-green-500 hover:!bg-green-500/10 active:!border-green-500 active:!bg-green-500/50 active:!text-white focus:!border-green-500 focus:!bg-green-500 focus:!text-white checked:!border-green-500 checked:!bg-green-500 checked:!text-white',
            onClick: appearComment
        }
    ]
    
    //Funzione che mostra il commento
    function appearComment(button) {
        
    //Mi salvo il valore
        const value = parseInt(button.value);
        const commentRange = getElement(`#${button.name}-error-message`)
        
        //Controllo il tipo di input (range o radio)
        if(button.type === 'radio') {
            commentRange.classList = calculateColor(value).text
            commentRange.textContent = calculateColor(value).content;
        } else if(button.type === 'range') {
            //Mi prendo il messaggio di errore tramite l'id
            //Gli metto il testo e il colore in base alla scelta
            commentRange.classList = calculateColor(value).text
            commentRange.textContent = calculateColor(value).content;

            //Mi salvo il valore di quante volte è stato trascinato il range
            //Di default è 0
            button.setAttribute('data-count', parseInt(button.getAttribute('data-count')) + 1); 

            //'Coloro' il range in base al valore
            switch(value) {
                case 1: 
                    button.classList = `range [--range-progress:red] [--range-thumb:white] w-full`;
                    break;
                case 2: 
                    button.classList = `range [--range-progress:orange] [--range-thumb:white] w-full`;
                    break;
                case 3:
                    button.classList = `range [--range-progress:yellow] [--range-thumb:white] w-full`;
                    break;
                case 4:
                    button.classList = `range [--range-progress:lime] [--range-thumb:white] w-full`;
                    break;
                case 5:
                    button.classList = `range [--range-progress:green] [--range-thumb:white] w-full`;
                    break;
            }
        
        }
    }

    //Funzione che gestisce gli errori
    const handleInputValidation = (inputEl) => {
        // recupero i valori dall'input
        const name = inputEl.name;
        let value = inputEl.value;
        let dataRequired = inputEl.dataRequired;
    
        //Controllo sul value
        //Se l'input è una checkbox, non ha una proprietà value
        //Quindi controllo se il field è una checkbox
        //Se si, il suo value sarà il suo flag checked (true / false)
        value = inputEl.type === 'checkbox' ? inputEl.checked : value.trim();

        value = inputEl.type === 'range' ? inputEl.getAttribute('data-count') : value;    

        //Recupero la validazione dall'input
        //const value_ = inputEl.getAttribute('data-validation');
        const dataValidation = inputEl.dataset.validation.split(' ')
            
        // valido il campo con tutte le sue validazioni
        const { status, message } = validateField(
            dataRequired,
            dataValidation,
            name,
            value
        );

        const errorMessageEl = getElement(`#${name}-error-message`);
        
        if (status === "error") {
            // aggiungo il messaggio di errore all'oggetto errors
            errors[name] = message;
            // rimuovo la classe hidden dallo span (messaggio d'errore sotto l'input)
            errorMessageEl.classList.remove("hidden");
            errorMessageEl.classList.add("block");
            errorMessageEl.classList.add("text-error");
            // aggiungo il testo del messaggio d'errore al contenuto dello span
            errorMessageEl.textContent = message;
            
            return false;
        } else {
            // rimuovo il messaggio di errore dall'oggetto errors
            delete errors[name];
            // aggiungo la classe hidden allo span (messaggio d'errore sotto l'input)
            errorMessageEl.classList.add("hidden");
            errorMessageEl.classList.remove("block");
            errorMessageEl.classList.remove("text-error");
            return true;
        }
    };

    // funzione che gestisce l'evento submit del form
    const handleSubmit = (formEl) => {

        // disabilito il submit (pulsante)
        submitButtonRef.current.disabled = true;

        // Resetto gli errori
        errors = {};
        let isValid = true;

        // itero su tutti i campi dell'array fields
        const fields = formEl.querySelectorAll(`input:not([type=radio]), textarea`);
        //console.log(fields)
        fields.forEach((field) => {
            if (!handleInputValidation(field)) {
                isValid = false;
                // se la validazione fallisce non proseguo
                // rimuovo il valore dall'oggetto formData
                delete formData[field.name];
            } else {
                formData[field.name] = field.value;
            }
        });

        //Verifico se l'utente ha cliccato su un rating
        const valutationRating = document.querySelectorAll('#radio-valutazione input[type=radio]:checked')

        //Mi prendo il tag small dei rating
        const errorMessageEl = getElement(`#valutazione-error-message`);
        
        //Se l'utente non ha cliccato nessun rating, imposto isValid a false e compare il messaggio di errore
        if(valutationRating.length === 0) {
            isValid = false;
            errorMessageEl.textContent = 'Il campo valutazione è obbligatorio';
            errorMessageEl.classList = 'text-error';
            delete formData['valutazione'];
        } else {
            //Tolgo il tag small di messaggio di errore se l'utente ha selezionato un rating
            errorMessageEl.textContent = 'Il campo valutazione è obbligatorio';
            errorMessageEl.classList = 'hidden';
            formData['valutazione'] = valutationRating[0].value;
        }

        // Se ci sono errori, riabilito il pulsante e interrompo
        if (!isValid) {
            submitButtonRef.current.disabled = false;
            return;
        }

        //Mi salvo tutti i label degli input range (Fotocamera, Display), che sono già in maiuscolo, e mi servono nella fetch
        const labelRange = []

        //Mi prendo tutti gli input range, cosi posso resettarli dopo aver inviato la recensione
        const rangeInput = formEl.querySelectorAll('input[type=range]')
        rangeInput.forEach(r => {
            labelRange.push(r.name.charAt(0).toUpperCase()+r.name.slice(1)) //Rendo maiuscolo l'iniziale di ogni parola
        })

        //mi creo l'oggetto date
        const date = new Date();
        //Mi prendo la data nel momento in cui viene scritta la recensione
        const today = date.toLocaleString('it-IT', {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        })

        //Mi prendo l'orario nel momento in cui viene scritta la recensione
        const now = date.toLocaleString('it-IT', {
            hour: "numeric",
            minute: "numeric",
        })

        //faccio la fetch al json-server per aggiungere la recensione al db
        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            //Mi creo l'oggetto recensione che passerò
            body: JSON.stringify({
                'idProdotto': prodotto.id,
                'autore': 'Nazario Di Cataldo',
                "fotoProfilo": "/profile-picture.jpg",
                "ora": now,
                "data": today,
                "valutazione": parseInt(formData['valutazione']),
                "titolo": formData['titolo'],
                "testo": formData['recensione'],
                "valutazioniTecniche": labelRange.map(l => {
                    return {
                        "etichetta": l,
                        "valore": parseInt(formData[l.toLowerCase()]),
                    }
                })
            }),
        })
        //Se l'operazione va a buon fine svuoto il form e compare la modal di conferma
        .then((data) => {

            // Svuoto form data
            formData = {};
            //Il bottone diventa cliccabile
            submitButtonRef.current.disabled = false;

            setModal(modalRef, 'Recensione pubblicata', 'Grazie per aver condiviso la tua esperienza!')
            modalRef.current.showModal();

            //Reset gli input range
            rangeInput.forEach(r => {
                r.setAttribute('data-count', '0');
                r.setAttribute('value', '1'); 
                r.classList = 'range w-full';
            })

            //Reset del form
            formEl.reset();
        })
        //Se c'è qualche problema compare la modal che avverte dell'errore
        .catch((error) => {
            setModal(modalRef, 'Errore nella pubblicazione', `C'è stato un errore: ${error}`)
            modalRef.current.showModal();
            submitButtonRef.current.disabled = false;
        });
    };

    //Div con bottoni valutazione e commento
    const valutazioniDiv = DOM.div({className: 'flex flex-col gap-2'}, [
        //Div con solo input radio
        DOM.div({className: 'flex w-full', id: 'radio-valutazione'}, [
            ...radioValues.map(obj => {
                return DOM.input({
                    className: 'btn btn-neutral grow-[1] btn-outline hover:text-white/80 focus:text-white/80 active:text-primary ' + obj.className,
                    type: "radio",
                    name: obj.label,
                    ariaLabel: obj.name,
                    value: obj.value,
                    onchange: (e) => {obj.onClick(e.target)},
                })
            }),
        ]),
        DOM.small({ id: `valutazione-error-message`, className: "hidden" }, []),
    ]);

    //Mi creo la modal
    const modal = Modal({className: 'rounded-3xl'}, modalRef);

    return DOM.main({}, [
        DOM.section({className: 'container my-8 lg:my-14'}, [
            Bentobox({id: 'bento-recensioni', className: '!h-auto flex flex-col md:flex-row gap-8'}, [
                //Div di sinistra sul prodotto
                DOM.div({className: 'w-full md:w-1/2 flex flex-col gap-14'}, [
                    //Link torna indietro
                    Link({className: 'underline flex items-center',
                        type: 'button', 
                        status: 'ghost',
                        href: `/catalogo/${slug}` }, [
                        DOM.createElFromHTMLString(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`),
                        'Torna indietro',
                    ]),
                    //Prodotto
                    DOM.div({className: ' flex flex-col items-center h-max sticky top-[3rem]'}, [
                        DOM.h1({className: 'fs-2 font-semibold mb-14 text-center'}, ['Racconta la tua esperienza']),
                        DOM.figure({className: 'mb-8 w-1/2 md:w-2/3 lg:w-1/2'}, [
                            DOM.img({src: `${prodotto.immagine}`, className:'w-full', alt: `Immagine di ${prodotto.nome}, della ${prodotto.marca}`}, [])
                        ]),
                        DOM.h2({className: 'body-lg font-medium'}, [`${prodotto.nome}`])                        
                    ]), 
                ]),
                //Div di destra con il form per la valutazione
                Bentobox({id: 'bento-recensioni-invio', className: '!h-auto w-full md:w-1/2 rounded-lg'}, [
                    //Form con i campi
                    DOM.form({className: 'flex flex-col gap-8', 
                        action: '#', 
                        method: 'POST', 
                        onsubmit: (e) => {
                            e.preventDefault();
                            handleSubmit(e.target)
                        }}, [
                        //Div con gli input radio sulla valutazione e testo
                        DOM.div({className:'flex flex-col gap-4'}, [
                            DOM.h3({className: 'fs-5 font-semibold'}, ['Come valuti questo prodotto?']),
                            //Div con input radio e commento
                            valutazioniDiv,
                        ]),
                        //Div che contiene l'input sul titolo della recensione
                        DOM.div({className:'flex flex-col gap-4'}, [
                            DOM.h3({className: 'fs-5 font-semibold'}, ['Dai un titolo alla tua recensione']),
                            Input({id:'titolo-recensione',
                                name: 'titolo',
                                label: 'Inserisci il titolo della tua recensione',
                                placeholder: 'Titolo della recensione',
                                className: 'pl-4 w-full',
                                dataRequired: true,
                                dataValidation: 'min:8 recensione',
                                onChange: handleInputValidation,
                                onBlur: handleInputValidation,
                            })
                        ]),
                        //Div che contiene l'input sul testo della recensione
                        DOM.div({className:'flex flex-col gap-4'}, [
                            DOM.h3({className: 'fs-5 font-semibold'}, ['Scrivi la tua recensione']),
                            Textarea({id:'testo-recensione',
                                name:'recensione', 
                                ariaLabel: 'Inserisci la tua recensione',
                                placeholder: 'Testo della recensione',
                                className: 'pl-4 w-full',
                                dataRequired: true,
                                dataValidation: 'min:10 recensione',
                                onChange: handleInputValidation,
                                onBlur: handleInputValidation,
                            })
                        ]),
                        //Div che contiene i range e il titolo
                        DOM.div({className:'flex flex-col gap-4'}, [
                            DOM.h3({className: 'fs-5 font-semibold'}, ['Recensioni tecniche']),
                            //Div con solo la colonna di range
                            DOM.div({className: 'flex flex-col gap-4'}, [
                                ...assignLabel(prodotto.categoria).map((l, i) => {
                                    return Range({id: l, 
                                        name: l, 
                                        min: 1, 
                                        max: 5, 
                                        step: 1,
                                        dataCount: "0",
                                        dataRequired: true,
                                        dataValidation: 'range',
                                        onChange: appearComment
                                    })
                                })
                            ])
                        ]),
                        //Checkbox
                        Checkbox({
                            id: 'contatti-privacy', 
                            name:'privacy', 
                            className: 'whitespace-nowrap',
                            dataValidation: 'checkbox',
                            dataRequired: true,
                            onChange: handleInputValidation
                        }, ['Dichiaro che questa recensione è onesta *']),
                        //Submit
                        Button({type: 'submit', status: 'solid', ref: submitButtonRef}, ['Pubblica recensione'])
                    ])
                ])
            ])
        ]),
        modal
    ])
}

export default Recensione;