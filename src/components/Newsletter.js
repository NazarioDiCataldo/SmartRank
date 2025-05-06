import DOM, { createRef, getElement } from 'just-dom';
import Input from './ui/Input';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import Modal from './ui/Modal';
import { validateField } from '../utilities/validation';
import setModal from '../utilities/setModal';

const Newsletter = () => {
    let errors = {}

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

    const handleSubmit = (formEl) => {

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
            return;
        }

        setModal(modalRef, 'Iscrizione effettuata', 'Grazie per esserti iscritto alla nostra newsletter')
        modalRef.current.showModal();
        formEl.reset();
    };

    //Creiamo il ref della modal
    const modalRef = createRef();

    const modal = Modal({className: 'rounded-3xl'}, modalRef);

    return DOM.div({}, [
        DOM.form(
            {method:'get', 
                action: '#', 
                onsubmit: (e) => {
                    e.preventDefault();
                    handleSubmit(e.target);
                },
                className: 'w-[100%] lg:w-lg mx-auto flex flex-col align-bottom gap-4'}, [
            Input({
                id: 'newsletter-field',
                name: 'email', 
                type: 'email',
                label: 'Inserisci la tua email per iscriverti alla newsletter', 
                placeholder: 'La tua email',
                dataValidation: 'email',
                dataRequired: true,
                onChange: handleInputValidation
            }),
            Checkbox({
                id: 'newsletter-check',
                name: 'privacy',
                dataValidation: 'checkbox',
                dataRequired: true,
                onChange: handleInputValidation 
            }, ['Ho preso visione della Privacy Policy *']),
            Button({type: 'submit', className: 'btn-accent w-[100%] md:w-max'}, ['Iscriviti'])
        ]),
        modal
    ])
    
}

export default Newsletter;