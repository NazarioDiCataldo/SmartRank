import DOM from 'just-dom'
import { twMerge } from 'tailwind-merge'

const Tab = ({caratteristiche, avanzate, className = '', name = ''}) => {

    return DOM.div({ className: twMerge("tabs tabs-border", className) }, [

        DOM.input({
          type: "radio",
          name,
          className: "tab !shadow-none !w-1/2 !text-white/80 checked:!text-accent !p-0 !body-sm",
          ariaLabel: "Caratteristiche",
          checked: "checked",
        }),
        DOM.div({ className: "tab-content pt-8" }, [
            DOM.div({className: 'grid grid-cols-3 gap-6 md:gap-8'}, [
                ...caratteristiche.map(c => {
                    return DOM.div({className: 'flex flex-col gap-2 col-span-1 place-items-center'}, [
                        DOM.createElFromHTMLString(c.icona),
                        DOM.h5({className: 'text-center font-medium md:whitespace-nowrap'}, [c.label]),
                        DOM.p({className: 'body-sm text-center'}, [c.valore]),
                    ])
                })
            ])
        ]),
        DOM.input({
          type: "radio",
          name,
          className: "tab !shadow-none !w-1/2 !text-white/80 checked:!text-accent !p-0 !body-sm",
          ariaLabel: "Scheda tecnica",
        }),
        DOM.div({ className: "tab-content pt-6" }, [
            DOM.div({ className: "overflow-auto max-h-[21rem] w-full" }, [
                DOM.table({ className: "table table-zebra" }, [
                  DOM.tbody({}, [
                    ...avanzate.map(a => {
                        return DOM.tr({}, [
                            DOM.th({}, [a.label]),
                            DOM.td({}, [a.valore]),
                          ])
                    }),
                  ]),
                ]),
              ])
        ])
      ])      
}

export default Tab;