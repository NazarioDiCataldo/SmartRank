import DOM from 'just-dom';
import Input from './ui/Input';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import Modal from './ui/Modal';

const Newsletter = () => {
    return DOM.form({method:'get', action: '#', className: 'w-[100%] lg:w-lg mx-auto flex flex-col align-bottom gap-4'}, [
        Input({name: 'newsletter-field', type: 'email', placeholder: 'La tua email'}),
        Checkbox({id: 'newsletter-check'}, ['Ho preso visione della Privacy Policy *']),
        Button({type: 'submit', className: 'btn-accent w-[100%] md:w-max'}, ['Iscriviti'])
    ])
    
}

export default Newsletter;