import type { AnyFieldApi } from "@tanstack/react-form";

type FormInputProps = {
	field: AnyFieldApi;
	type: string;
};

export default function FormInput({ field, type }: FormInputProps) {
	return (
		<input
			type={type}
			id={field.name}
			name={field.name}
			value={field.state.value}
			onBlur={field.handleBlur}
			onChange={(e) => field.handleChange(e.target.value)}
		/>
	);
}
