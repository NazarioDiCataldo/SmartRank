import DOM from 'just-dom'

const Colors = ({color, name, checked = false}) => {
    return DOM.input({
        type: "radio",
        name,
        checked,
        className:
          `radio border-${color}-300 checked:text-${color}-600 checked:border-${color}-600`,
      });
      
}

export default Colors