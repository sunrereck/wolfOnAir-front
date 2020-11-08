import { useCallback, useState } from 'react';

type HtmlInputTypes = HTMLInputElement | HTMLTextAreaElement;

function useForm(
  initialValues: Record<string, any>, 
  validate: (values: Record<string, any>) => Record<string, any>, 
  onSubmit?: () => void): [
    Record<string, any>,
    Record<string, any>,
    boolean,
    (e: React.ChangeEvent<HtmlInputTypes>) => void,
    (e: React.ChangeEvent<HtmlInputTypes>) => void,
  ] {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({})
  const [isValied, setIsValied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HtmlInputTypes>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  const onCheckError = (e:  React.ChangeEvent<HtmlInputTypes>) => {
    const errors = validate(values);

    setErrors(errors);
  }

  return [
    values,
    errors,
    isSubmitting,
    onChange,
    onCheckError
  ];
}

export default useForm;