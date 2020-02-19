import { useState } from "react";

function useValidationInput(defaultValue: string) {
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setValid] = useState(false);
  const [isError, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, errorMessage, isValid, isError, onChange] as [
    string,
    string,
    boolean,
    boolean,
    typeof onChange
  ];
}

export default useValidationInput;
