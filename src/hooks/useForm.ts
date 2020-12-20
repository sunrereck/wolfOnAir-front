import { useCallback, useRef, useState } from 'react';

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

function getFilterErrors(errors: any) {
  const filterErrors = { ... errors };

  Object.entries(errors).forEach(([name, value]) => {
    if (!value) delete filterErrors[name];
  })

  return filterErrors;
}

function useForm<Tvalues extends Record<string, unknown>>({
  asyncValidate,
  initialValues = {} as Tvalues,
  validate
}: UseFormProps<Tvalues>): any[] {
  const fields = useRef({} as any);
  const [values, setValues] = useState<Tvalues>(initialValues);
  const [errors, setErrors] = useState<Tvalues>({} as Tvalues);
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

    if (!!validate) {
      const validateErrors = validate({
        [name]: value
      } as Tvalues);

      if (validateErrors[name]) {
        setErrors((prevState) => {
          const filterErrors = getFilterErrors({
            ...prevState,
            [name]: validateErrors[name]
          });
          
          return filterErrors;
        });
      }

      if (validateErrors[name]) {
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

        setErrors((prevState) => {
          const filterErrors = getFilterErrors({
            ...prevState,
            [name]: error[name]
          });
          
          return filterErrors;
        });
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
        setErrors((prevState) => {
          const filterErrors = getFilterErrors({
            ...prevState,
            ...validateErrors
          });
          
          return filterErrors;
        });
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
            } else {
              delete asyncValidateErrors[name];
            }
          });
        });
      }

      if (!checkEmptyObject(asyncValidateErrors)) {
        setIsSubmitting(false);
        setErrors((prevState) => ({
          ...prevState,
          ...asyncValidateErrors
        }))

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