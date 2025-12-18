import type { AnyFieldApi } from "@tanstack/react-form";

type FormLabelFieldProps = {
	label: string;
	field: AnyFieldApi;
	isRequired: boolean;
};

// TODO: fix the style * with boolean

export default function FormLabelField({
	label,
	field,
	isRequired,
}: FormLabelFieldProps) {
	return (
		<label htmlFor={field.name} className="label">
			{isRequired && <span className="text-red-500 text-xs font-bold">*</span>}
			{label} :
		</label>
	);
}
