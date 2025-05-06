import DOM, { createRef, getElement } from 'just-dom';
import setActive from '../setActive';
import { validateField } from '../utilities/validation';
import Modal from '../components/ui/Modal';
import setModal from '../utilities/setModal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Checkbox from '../components/ui/Checkbox';
import Button from '../components/ui/Button';

const Contatti = () => { 
    //Oggetto che contiene gli errori
    let errors = {};

    //mi creo le ref
    const modalRef = createRef();
    const submitButtonRef = createRef();

    //Mi creo la modal
    const modal = Modal({className: 'rounded-3xl'}, modalRef);

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
        
        //Recupero la validazione dall'input
        const value_ = inputEl.getAttribute('data-validation');
        const dataValidation = value_.split(' ')
        
        // valido il campo con tutte le sue validazioni
        const { status, message } = validateField(
            dataRequired,
            dataValidation,
            name,
            value
        );
        if (status === "error") {
            // aggiungo il messaggio di errore all'oggetto errors
            errors[name] = message;
            // rimuovo la classe hidden dallo span (messaggio d'errore sotto l'input)
            const errorMessageEl = getElement(`#${name}-error-message`);
            errorMessageEl.classList.remove("hidden");
            errorMessageEl.classList.add("block");
            // aggiungo il testo del messaggio d'errore al contenuto dello span
            errorMessageEl.textContent = message;
            return false;
        } else {
            // rimuovo il messaggio di errore dall'oggetto errors
            delete errors[name];
            // aggiungo la classe hidden allo span (messaggio d'errore sotto l'input)
            const errorMessageEl = getElement(`#${name}-error-message`);
            errorMessageEl.classList.add("hidden");
            errorMessageEl.classList.remove("block");
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
        const fields = formEl.querySelectorAll(`input, select`);
        fields.forEach((field) => {
            if (!handleInputValidation(field)) {
                isValid = false;
            }
        });

        // Se ci sono errori, riabilito il pulsante e interrompo
        if (!isValid) {
            submitButtonRef.current.disabled = false;
            return;
        }

        setModal(modalRef, 'Messaggio inviato', 'Grazie per averci contattato. A breve riceverai una risposta')
        modalRef.current.showModal();
        submitButtonRef.current.disabled = false;
        formEl.reset();
    };

    setActive('contatti')
    document.title = 'Contatti';

    return DOM.main({}, [
        DOM.section({className: 'container my-8 lg:my-14'},[
            DOM.div({className: 'w-full lg:w-3xl mx-auto bento-box rounded-2xl p-5 flex flex-col gap-6'}, [
                DOM.div({className: 'flex flex-col gap-4'}, [
                    //Titolo e sottotitolo del form
                    DOM.h1({className:'fs-2 font-semibold'}, ['Parla con il team di SmartRank.']),
                    DOM.h2({className: 'text-base font-normal'}, ['Compila il form e ti contatteremo a breve. È tutto molto semplice.'])
                ]),
                //Form effettivo
                DOM.form({
                    className: 'flex flex-col gap-4', 
                    action: '#', 
                    method: 'GET', 
                    onsubmit: (e) => {
                        e.preventDefault(); 
                        handleSubmit(e.target)
                    }}, [
                    //Div con input 'nome' e 'cognome'
                    DOM.div({className: 'flex flex-col lg:flex-row gap-4'}, [
                        Input({
                            id: 'contatti-nome',
                            label: 'Inserisci il tuo nome',
                            name: 'nome', 
                            type: 'text', 
                            //Ogni validazione deve essere separata da uno spazio
                            dataValidation: 'min:3 nome',
                            dataRequired: true,
                            placeholder: 'Nome', 
                            className: 'w-full pl-4',
                            onBlur: handleInputValidation,
                            onChange: handleInputValidation,
                        }),
                        Input({
                            id: 'contatti-cognome', 
                            name: 'cognome', 
                            label: 'Inserisci il tuo cognome',
                            dataValidation: 'min:3 nome',
                            dataRequired: true,
                            type: 'text', 
                            placeholder: 'Cognome', 
                            className: 'w-full pl-4',
                            onBlur: handleInputValidation,
                            onChange: handleInputValidation,
                        }),
                    ]),
                    //Div con input 'oggetto' e 'email'
                    DOM.div({className: 'flex flex-col lg:flex-row gap-4'}, [
                        Select({
                            id: 'contatti-oggetto', 
                            name: 'oggetto', 
                            dataValidation: 'select',
                            dataRequired: true,
                            className: 'w-full',
                            onChange: handleInputValidation,
                        }, [
                            DOM.option({selected: "true", value: '---'}, ['Oggetto']),
                            DOM.option({value: 'Segnalazione di un problema'}, ['Segnalazione di un problema']),
                            DOM.option({value: 'Chiarimento'}, ['Chiarimento']),
                            DOM.option({value: 'Altro'}, ['Altro']),
                        ]),
                        Input({
                            id: 'contatti-email', 
                            name: 'email', 
                            type: 'email', 
                            label: 'Inserisci la tua email',
                            dataValidation: 'email',
                            dataRequired: true,
                            placeholder: 'Email', 
                            className: 'w-full pl-4', 
                            showIcon: false,
                            onBlur: handleInputValidation,
                            onChange: handleInputValidation,
                        }),
                    ]),
                    //Textarea
                    Textarea({id:'contatti-messaggio', name:'messaggio', placeholder: 'Messaggio (Opzionale)'}, []),
                    //Checkbox
                    Checkbox({
                        id: 'contatti-privacy', 
                        name:'privacy', 
                        dataValidation: 'checkbox',
                        dataRequired: true,
                        onChange: handleInputValidation
                    }, ['Ho preso visione della Privacy Policy *']),
                    //Submit
                    Button({type: 'submit', status: 'solid', ref: submitButtonRef}, ['Invio'])
                ])
            ])
        ]),
        modal
    ])
}

export default Contatti;