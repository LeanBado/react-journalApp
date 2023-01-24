import { useMemo } from 'react';
import { useEffect, useState } from 'react';

export const useForm = ( initialForm = {}, validator = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValid, setformValid] = useState({});

    useEffect(() => {
        createValidators()
    }, [formState]);

    const isValid = useMemo(() => {
        for (const i of Object.keys(formValid)) {
            if (formValid[i] !== null) return false //con que haya 1 solo elemento del formulario invalido, devuelve false y no continua
        }   return true
    }
    , [formValid])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckValid = {}
        for (const formField of Object.keys( validator )) {//transforma el objeto validator en iterable.
                    //console.log("formField:",formField)
            const [fn, message] = validator[formField] // se deconstruye la funcion y el mensaje de email
                    //console.log("funcion y mensaje:",fn, message)
                    //console.log("formState[formField]:",formState[formField])
            formCheckValid[`${formField}Valid`] = fn(formState[formField]) ? null : message //en el interín que se le agrega a formCheckValid la propiedad emailValid se ejecuta la funcion con el valor (value) que haya puesto el usuario para ese elemento "email" y si incluye @ tira null, sino el mensaje deconstruido
                    //console.log("formCheckValid:", formCheckValid)
        }
        
        
        setformValid(formCheckValid)
        //console.log("form check:", formCheckValid)

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValid,
        isValid,
    }
}