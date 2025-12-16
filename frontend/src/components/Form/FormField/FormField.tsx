import type { AnyFieldApi } from "@tanstack/react-form";
import FormFieldInfo from "./FormFieldInfo";
import FormInput from "./FormInput";

type FormFieldProps = {
  field: AnyFieldApi;
  label: string;
  isRequired: boolean;
  type: string;
};

export default function FormField({
  field,
  label,
  isRequired,
  type,
}: FormFieldProps) {
  return (
    <div className="my-5 w-full">
      <label className="input w-full" htmlFor={field.name}>
        <span className="label">
          {label}{" "}
          {isRequired && (
            <span className="text-red-500 font-bold text-xs">*</span>
          )}
        </span>
        <input type="number" />
      </label>
      <FormFieldInfo field={field} />
    </div>
  );
}
