import { useCallback, useState } from 'react';

type HtmlInputTypes = HTMLInputElement | HTMLTextAreaElement;

function useForm(
  initialValues: Record<string, any>, 
  validate: (values: Record<string, any>) => string, 
  onSubmit: () => void) {
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
}