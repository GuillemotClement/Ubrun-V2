import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import FormField from "../../components/Form/FormField/FormField";
import FormSubscribe from "../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../components/Form/FormTitle";
import { authClient } from "../../libs/better-auth";
import { useNavigate } from "@tanstack/react-router";

const schema = z.object({
	email: z.email().min(1, "Un email valide est attendu").trim(),
	password: z.string().min(1, "Un mot de passe est attendu"),
});

type LoginFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
	email: "",
	password: "",
};

export default function LoginPage() {
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: async (formData: LoginFormData) => {
			const { data, error } = await authClient.signIn.email(formData);

			if (error) {
				throw error;
			}

			return data;
		},
		onSuccess: (data) => {
			console.log(data);
			navigate({ to: "/" });
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
			<FormTitle title="Connexion" />

			<form.Field name="email">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Email"
						type="email"
					/>
				)}
			</form.Field>

			<form.Field name="password">
				{(field) => (
					<FormField
						field={field}
						isRequired={true}
						label="Mot de passe"
						type="password"
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
