import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';
import Filter from './ui/Filter';
import Range from './ui/Range';
import Button from './ui/Button';

const Sidebar = ({className = '', ref}) => {
    return DOM.aside({className: twMerge('p-5 bento-box rounded-2xl h-max sticky top-[2rem]', className)}, [
        DOM.h4({className: 'fs-5 font-semibold mb-5'}, ['Filtra per']),
        DOM.form({className: '', method: 'GET', action: '#'}, [
            //Div con tutti i filtri
            DOM.div({className: 'p-5 bento-box rounded-xl flex flex-col gap-5', ref}, [
                //Filtri valutazione
                DOM.div({className: ''}, [
                    DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Valutazione']),
                    //Form che contiene i bottoni
                    DOM.div({className: 'flex filter'},[
                        Filter({type: 'reset'}),
                        Filter({type: 'filter', name: '5 ★', label: '5 stelle', className: 'btn-outline'}),
                        Filter({type: 'filter', name: '4.5 ★', label: '4.5 stelle', className: 'btn-outline'}),
                        Filter({type: 'filter', name: '4 ★', label: '4 stelle', className: 'btn-outline'}),
                    ])
                ]),
                //Filtri Categoria
                DOM.div({className: ''}, [
                    DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Categoria']),
                    //Form che contiene i bottoni
                    DOM.div({className: 'filter justify-start flex'},[
                        Filter({type: 'reset', className: 'btn-soft rounded-full bg-accent/10'}),
                        Filter({type: 'filter', name: 'Smartphone', label: 'smartphone', className: 'btn-soft rounded-full bg-accent/10'}),
                        Filter({type: 'filter', name: 'Tablet', label: 'tablet', className: 'btn-soft rounded-full bg-accent/10'}),
                        Filter({type: 'filter', name: 'Laptop', label: 'laptop', className: 'btn-soft rounded-full bg-accent/10'}),
                        Filter({type: 'filter', name: 'Cuffie', label: 'cuffie', className: 'btn-soft rounded-full bg-accent/10'}),
                        Filter({type: 'filter', name: 'Smartwatch', label: 'smartwatch', className: 'btn-soft rounded-full bg-accent/10'}),
                        Filter({type: 'filter', name: 'Powerbank', label: 'powerbank', className: 'btn-soft rounded-full bg-accent/10'}),
                    ])
                ]),
                //Filtri prezzo
                DOM.div({className: ''}, [
                    DOM.h5({className: 'fs-6 font-semibold mb-2'}, ['Prezzo']),
                    Range({min: '0', max: '1500'}),
                ])
            ]),
            //Div con i bottoni
            DOM.div({className: 'flex gap-3 mt-4'}, [
                Button({type: 'reset', status: 'outline', className: 'grow-[1]'}, ['Reimposta']),
                Button({type: 'submit', status: 'solid', className: 'grow-[1]'}, ['Applica']),
            ])
        ])
    ]);
}

export default Sidebar;