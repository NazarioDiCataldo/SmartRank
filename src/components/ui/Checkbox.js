import DOM from 'just-dom';
import { twMerge } from "tailwind-merge";

const Checkbox = ({id, name, dataValidation = '', DataRequired = false, onChange = () => {}}, children) => {
    return DOM.div({className: ''}, [
      DOM.div({ className: "flex items-center gap-1" }, [
        DOM.input({
          id,
          name,
          type: "checkbox",
          dataValidation,
          DataRequired,
          className: "checkbox checkbox-accent w-[1rem] h-[1rem] rounded-sm",
          onChange: (e) => {onChange(e.target)}
        }),
        DOM.label(
          { className: "body-xs", htmlFor: id },
          children
        ),
      ]),
      DOM.small({ id: `${name}-error-message`, className: "w-full text-error hidden text-left" }, []),
    ])
}

export default Checkbox;