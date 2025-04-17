import DOM from "just-dom";
import { twMerge } from "tailwind-merge";

const Input = ({
    name,
    type,
    label,
    value = "",
    placeholder,
    className = "",
    onChange = () => {},
    onBlur = () => {},
}) => {
    return DOM.div({ className: "w-[100%]" }, [
        DOM.label({ className: "flex" }, [
            DOM.input({
                id: name,
                name,
                type,
                placeholder,
                value,
                ariaLabel: label,
                oninput: (e) => onChange(e.target),
                onblur: (e) => onBlur(e.target),
                className: twMerge("input bg-white/5 text-white rounded-lg px-4 py-5 border border-white/10 placeholder:text-white/60 focus:outline-white/60 focus:border-white/60 transition flex-1 transition-all duration-300", className),
            }),
        ]),
        DOM.small({ id: `${name}-error-message`, className: "text-error hidden" }, []),
    ]);
};

export default Input;