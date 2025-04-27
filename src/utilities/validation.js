export const validateField = (required = false, types, name, value) => {
    // Prima controllo se il campo è vuoto
    if (value === "") {
        if (required) {
            return {
                status: "error",
                message: `Il campo ${name} è obbligatorio`,
            };
        } else {
            return {
                status: "success",
            };
        }
    }

    // se non è vuoto, controllo le validazioni
    // Se non ci sono validazioni, ritorno success
    if (!types || types.length === 0) {
        return {
            status: "success",
        };
    }
    for (const type of types) {
        // Estrae il numero dal tipo di validazione se presente (es. "min:4" -> 4)
        const [validationType, value_] = type.split(":");
        const numericValue = value_ ? parseInt(value_) : null;
        
        switch (validationType) {
            case "min":
                if (value.length < numericValue) {
                    return {
                        status: "error",
                        message: `Il campo ${name} deve essere almeno di ${numericValue} caratteri`,
                    };
                }
                break;
            case "max":
                if (value.length > numericValue) {
                    return {
                        status: "error",
                        message: `Il campo ${name} deve essere almeno di ${numericValue} caratteri`,
                    };
                }
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return {
                        status: "error",
                        message: `Il campo ${name} deve contenere un'email valida`,
                    };
                }
                break;
            case "nome":
                if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
                    return {
                        status: "error",
                        message: `Il campo ${name} contiene caratteri non validi`,
                    };
                }
                break;
            case "select":
                if (value === '---') {
                    return {
                        status: "error",
                        message: `Il campo ${name} è obbligatorio`,
                    };
                }
                break;
            case "checkbox":
                if (value !== true) {
                        return {
                            status: "error",
                            message: `Il campo ${name} è obbligatorio`,
                        };
                    }
                    break;
            default:
                break;
        }
    }

    // Se tutte le validazioni passano, ritorna success
    return {
        status: "success",
    };
};