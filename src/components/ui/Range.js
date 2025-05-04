import DOM from 'just-dom';
import { twMerge } from 'tailwind-merge';

/* noUiSlider.create(ciao, {
  start: [min, max],
  range: {
    "min": min,
    "max": max
  },
  connect: true,
  tooltips: true,
  formatter: "integer",
  cssClasses: {
    target: "relative h-2 rounded-full bg-secondary/10 range-slider-disabled:pointer-events-none range-slider-disabled:opacity-50",
    base: "size-full relative z-1",
    origin: "absolute top-0 end-0 rtl:start-0 size-full origin-[0_0] rounded-full",
    handle: "absolute top-1/2 end-0 rtl:start-0 size-4 bg-base-100 border-[3px] border-secondary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-secondary active:ring-[3px]",
    connects: "relative z-0 w-full h-2 overflow-hidden",
    connect: "absolute top-0 end-0 rtl:start-0 z-1 size-full bg-secondary origin-[0_0]",
    touchArea: "absolute -top-1 -bottom-1 -start-1 -end-1",
    tooltip: "bg-secondary text-sm text-secondary-content shadow-accent-300/20 py-1 px-2 rounded-selector mb-2 absolute bottom-full start-2/4 -translate-x-2/4 rtl:translate-x-2/4 shadow-md"
  }
}) */

/* , dataRangeSlider: `{
        "start": [${min}, ${max}],
        "range": {
          "min": ${min},
          "max": ${max}
        },
        "connect": true,
        "tooltips": true,
        "formatter": "integer",
        "cssClasses": {
          "target": "relative h-2 rounded-full bg-secondary/10 range-slider-disabled:pointer-events-none range-slider-disabled:opacity-50",
          "base": "size-full relative z-1",
          "origin": "absolute top-0 end-0 rtl:start-0 size-full origin-[0_0] rounded-full",
          "handle": "absolute top-1/2 end-0 rtl:start-0 size-4 bg-base-100 border-[3px] border-secondary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-secondary active:ring-[3px]",
          "connects": "relative z-0 w-full h-2 overflow-hidden",
          "connect": "absolute top-0 end-0 rtl:start-0 z-1 size-full bg-secondary origin-[0_0]",
          "touchArea": "absolute -top-1 -bottom-1 -start-1 -end-1",
          "tooltip": "bg-secondary text-sm text-secondary-content shadow-accent-300/20 py-1 px-2 rounded-selector mb-2 absolute bottom-full start-2/4 -translate-x-2/4 rtl:translate-x-2/4 shadow-md"
        }
      }` */

const Range = ({id, name, min, max, step, className = '', onChange = () => {}}) => {
    return DOM.div({}, [
      DOM.label({className: 'font-medium mb-2', htmlFor: name}, [name]),
      DOM.input({
        id,
        name,
        type: "range",
        min,
        max,
        value: 0,
        className: twMerge("range w-full", className),
        step,
        oninput: (e) => onChange(e.target)
      }),
      DOM.div({ className: "flex justify-between px-2.5 mt-2 text-xs" }, [
        DOM.span({/* className: '!text-red-500' */}, ["1"]),
        DOM.span({/* className: '!text-orange-500' */}, ["2"]),
        DOM.span({/* className: '!text-yellow-500' */}, ["3"]),
        DOM.span({/* className: '!text-lime-500' */}, ["4"]),
        DOM.span({/* className: '!text-green-500' */}, ["5"]),
      ]),
      DOM.small({ id: `${name}-error-message`, className: "hidden" }, []),
    ])
    
}

export default Range;