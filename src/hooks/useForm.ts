import { useCallback, useEffect, useRef, useState } from 'react';

import { checkEmptyObject } from '@/utils/commons';

type InputTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type ValidateType<Tvalues> = (values: Tvalues) => Tvalues
type AsyncValidateType = {
  [name: string]: (value: string) => Promise<{
    [name: string]: string
  }>
};

interface UseFormProps<Tvalues> {
  asyncValidate?: AsyncValidateType;
  initialValues: Tvalues;
  validate?: ValidateType<Tvalues>;
}

function useForm<Tvalues extends Record<string, unknown>>({
  asyncValidate,
  initialValues = {} as Tvalues,
  validate
}: UseFormProps<Tvalues>): any[] {
  const fields = useRef({} as any);
  const [values, setValues] = useState<Tvalues>(initialValues);
  const [errors, setErrors] = useState<Tvalues>({} as Tvalues);
  // const [touched, setTouched] = useState<Tvalues>({} as Tvalues);
  // const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<InputTypes>) => {
    const {value, name} = e.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const onBlur = async (e: React.ChangeEvent<InputTypes>) => {
    const { value, name } = e.target;

    // setTouched((prevState) => ({ 
    //   ...prevState, 
    //   [name]: true 
    // }));

    if (!!validate) {
      const errors = validate({
        ...values,
        [name]: value
      });

      setErrors((prevState) => ({
        ...prevState,
        [name]: errors[name]
      }));

      if (errors[name]) {
        return;
      }
    }

    if (!!asyncValidate) {
      const asyncValidateNames = Object.keys(asyncValidate);
      const asyncFieldIndex = asyncValidateNames.findIndex((field) => (field === name));

      if (asyncFieldIndex < 0) {
        return;
      }

      try { 
        const error = await asyncValidate[name](value);

        setErrors((prevState) => ({
          ...prevState,
          ...error
        }));
      } catch (err) {
        setErrors((prevState) => ({
          ...prevState,
          [name]: 'async validate error!'
        }));
      }
    }
  }

  const onSubmit = (
    submit: () => Promise<void>,
    submitError?: (err?: Error) => void
  ) => async (e?: React.BaseSyntheticEvent): Promise<void> => {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.persist();
    }

    setIsSubmitting(true);

    let validateErrors = {} as Tvalues;
    let asyncValidateErrors = {} as Record<string, string>;

    if (!!validate) {
      validateErrors = validate(values);

      if (!checkEmptyObject(validateErrors)) {
        setIsSubmitting(false);
        setErrors(validateErrors);

        const errorFields = Object.keys(validateErrors);

        fields.current[errorFields[0]].focus();
      }
    }

    try {
      if (!!asyncValidate) {
        const promises: Promise<Record<string, string>>[] = [];

        for (const [key, func] of Object.entries(asyncValidate)) {
          if (!validateErrors[key]) {
            promises.push(
              func(values[key] as string)
            );  
          }
        }

        const responses = await Promise.all(promises);

        responses.forEach((response: Record<string, string>) => {
          Object.entries(response).forEach((arr) => {
            const [name, error] = arr;

            if (!!error) {
              asyncValidateErrors[name] = error;
    
              setErrors((prevState) => ({
                ...prevState,
                [name]: error
              }));
            }
          })
        })
      }

      if (!checkEmptyObject(asyncValidateErrors)) {
        setIsSubmitting(false);

        const errorFields = Object.keys(asyncValidateErrors);

        fields.current[errorFields[0]].focus();

        return;
      }

      await submit();

      setIsSubmitting(false);
    } catch (err) {
      if (submitError) {
        submitError(err);
      }
    }
  };

  const onRef = useCallback((ref) => {
    if (ref) {
      const {name} = ref;

      fields.current[name] = ref;  
    } 
  }, [])

  // useEffect(() => {
  //   let isValid = true;

  //   for (const [, value] of Object.entries((errors))) {
  //     if (!!value) {
  //       isValid = false;
  //     }
  //   }

  //   setIsValid(isValid);
  // }, []);

  return [
    values,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onRef,
    isSubmitting,
    // isValid
  ];  
}

export default useForm;