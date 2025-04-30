import { useState } from "react";
import { CloseEyeIcon, OpenEyeIcon } from "../../assets/icons";
import s from "./Input.module.css";
import { FieldValues, Control, Path, useController } from "react-hook-form";

interface MyInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  icon?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  control,
  icon = false,
}: MyInputProps<T>) => {
  const {
    field,
    fieldState: { error },
    formState: { errors, isSubmitted },
  } = useController({ control, name });
  const [show, setShow] = useState(false);

  const changeInputType = show ? "text" : "password";

  return (
    <>
      <div className={s.inputWrapper}>
        <input
          {...field}
          className={s.input}
          id={name}
          type={!icon ? "text" : changeInputType}
        />
        {icon && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className={s.btn}
          >
            {show ? <OpenEyeIcon /> : <CloseEyeIcon />}
          </button>
        )}
      </div>
      {errors && isSubmitted && (
        <label className={s.error} htmlFor={name}>
          {error?.message}
        </label>
      )}
    </>
  );
};

export default Input;
