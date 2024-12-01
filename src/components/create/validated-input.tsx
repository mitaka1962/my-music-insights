import { FormSchema } from "@/lib/validations/share-mylist-form";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function ValidatedInput({
  name,
  label,
  register,
  errors,
  placeholder = '',
  max,
  autoComplete = 'off',
}: {
  name: keyof FormSchema;
  label: string | React.ReactNode;
  register: UseFormRegister<FormSchema>;
  errors: FieldErrors<FormSchema>;
  placeholder?: string;
  max?: number;
  autoComplete?: string;
}) {
  return (
    <div className="form-control">
      <div className="label">
        <label htmlFor={name} className="label-text">{label}</label>
      </div>
      <input
        id={name}
        {...register(name)}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={clsx("input input-bordered input-sm w-full", { 'input-error': errors[name] })} />
      <div className="label py-1 items-start">
        <span className={clsx("label-text-alt min-h-4", errors[name] ? 'text-error' : 'text-opacity-70')}>
          {errors[name] && errors[name].message}
        </span>
        {max ? <span className="label-text-alt text-nowrap text-opacity-60">{`最大${max}文字`}</span> : null}
      </div>
    </div>
  );
}
