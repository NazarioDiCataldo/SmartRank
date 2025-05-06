import DOM from 'just-dom';
import { twMerge } from "tailwind-merge";

const Checkbox = ({id, name, className = '', dataValidation = '', DataRequired = false, onChange = () => {}}, children) => {
    return DOM.div({className: ''}, [
      DOM.div({ className: "flex items-center gap-1" }, [
        DOM.input({
          id,
          name,
          type: "checkbox",
          dataValidation,
          DataRequired,
          className: twMerge("checkbox checkbox-accent w-[1rem] h-[1rem] rounded-sm", className),
          onChange: (e) => {onChange(e.target)}
        }),
        DOM.label(
          { className: "body-xs whitespace-nowrap", htmlFor: id },
          children
        ),
      ]),
      DOM.small({ id: `${name}-error-message`, className: "w-full text-error hidden text-left" }, []),
    ])
}

export default Checkbox;