import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "../../libs/axios";
import { useForm } from "@tanstack/react-form";
import FormTitle from "../../components/Form/FormTitle";
import FormField from "../../components/Form/FormField/FormField";
import FormSubscribe from "../../components/Form/FormSubscribe/FormSubscribe";

const schema = z.object({
	name: z.string().min(2, "Un nom de club valide est attendu"),
	city: z.string().min(2, "Une ville est attendu"),
	sport: z.string().min(2, "Un sport est attendu"),
});

type ClubFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
	name: "",
	city: "",
	sport: "",
};

export default function ClubForm() {
	const mutation = useMutation({
		mutationFn: async (formData: ClubFormData) => {
			const { data, error } = await api.post("/club", formData);

			if (error) {
				throw error;
			}

			return data;
		},
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (ctx) => {
			console.error("Erreur serveur: ", ctx.message);
		},
	});

	const form = useForm({
		defaultValues,
		validators: {
			onChange: schema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			mutation.mutate(value);
		},
	});

	return (
		<form
			className="w-200 mx-auto my-10"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FormTitle title="Nouveau club" />

			<form.Field name="name">
				{(field) => (
					<FormField field={field} isRequired={true} label="Nom" type="text" />
				)}
			</form.Field>

			<form.Field name="city">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Ville"
						type="text"
					/>
				)}
			</form.Field>

			<form.Field name="sport">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Sport"
						type="text"
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
						onReset={() => form.reset()}
					/>
				)}
			</form.Subscribe>
		</form>
	);
}
