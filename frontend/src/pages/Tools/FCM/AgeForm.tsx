import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../../components/Form/FormTitle";
import { fcmTools } from "../../../utils/fcmTools";

const schema = z.object({
	age: z.coerce
		.number()
		.min(1, "Un âge valide est attendus")
		.max(120, "Un âge valide est attendus"),
});

type AgeFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
	age: "",
};

type AgeFormProps = {
	setFcMax: (age: number) => void;
};

export default function AgeFormProps({ setFcMax }: AgeFormProps) {
	const form = useForm({
		defaultValues,
		validators: {
			onChange: schema,
		},
		onSubmit: ({ value }) => {
			const data: AgeFormData = schema.parse(value);
			const age = data.age;
            const fcMax = fcmTools.getFcMaxTheorique(age);
			setFcMax(fcMax);
		},
	});

	return (
		<form
			className="p-5"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FormTitle title="Âge" />

			<form.Field name="age">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Âge"
						type="number"
					/>
				)}
			</form.Field>

			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<FormSubscribe
						canSubmit={canSubmit}
						isSubmitting={isSubmitting}
						onReset={() => {
							form.reset();
							setFcMax(0);
						}}
					/>
				)}
			</form.Subscribe>
		</form>
	);
}
