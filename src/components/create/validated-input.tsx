import { FormSchema } from "@/lib/validations/share-mylist-form";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function ValidatedInput({
  name,
  label,
  register,
  errors,
  placeholder = '',
  autoComplete = 'off',
}: {
  name: keyof FormSchema;
  label: string | React.ReactNode;
  register: UseFormRegister<FormSchema>;
  errors: FieldErrors<FormSchema>;
  placeholder?: string;
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
      <div className="label py-1">
        <span className="label-text-alt text-error min-h-4">
          {errors[name] && errors[name].message}
        </span>
      </div>
    </div>
  );
}
