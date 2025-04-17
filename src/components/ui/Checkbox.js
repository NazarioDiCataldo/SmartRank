import DOM from 'just-dom';
import { twMerge } from "tailwind-merge";

const Checkbox = ({ id }, children) => {
    return DOM.div({ className: "flex items-center gap-1" }, [
        DOM.input({
          type: "checkbox",
          className: "checkbox checkbox-accent w-[1rem] h-[1rem] rounded-sm",
          id: "defaultCheckbox1",
        }),
        DOM.label(
          { className: "body-xs", htmlFor: "defaultCheckbox1" },
          children
        ),
      ]);
}

export default Checkbox;