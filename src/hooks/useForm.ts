import { useCallback, useEffect, useRef, useState } from 'react';

import { checkEmptyObject } from '@/utils/commons';

type DefaultType = string | number | boolean | null | undefined;
type ObjectType = Record<string, DefaultType>;
type InputTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type ValidateType = (values: ObjectType) => ObjectType
type AsyncValidateType = Record<string, (value: string) => Promise<Record<string, string>>>;

interface UseFormProps {
  asyncValidate?: AsyncValidateType;
  asyncValidateField?: string[];
  initialValues: ObjectType;
  validate?: ValidateType;
}

function useForm({
  asyncValidate,
  initialValues = {} as ObjectType,
  validate
}: UseFormProps): any[] {
  const fields = useRef({} as any);
  const [values, setValues] = useState<ObjectType>(initialValues);
  const [errors, setErrors] = useState<ObjectType>({});
  const [touched, setTouched] = useState<ObjectType>({});
  const [isValid, setIsValid] = useState(false);
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

    setTouched((prevState) => ({ 
      ...prevState, 
      [name]: true 
    }));

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

    let validateErrors: ObjectType = {};
    let asyncValidateErrors: ObjectType = {};

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
        const promises: Promise<string>[] = [];

        for (const [key, func] of Object.entries(asyncValidate)) {
          if (!validateErrors[key]) {
            promises.push(
              // @ts-ignore
              func(values[key])
            );  
          }
        }

        const responses = await Promise.all(promises);

        responses.forEach((response: string) => {
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

  useEffect(() => {

  }, []);

  return [
    values,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onRef,
    isValid,
    isSubmitting,
  ];  
}

export default useForm;