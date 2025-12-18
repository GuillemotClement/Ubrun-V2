import type { AnyFieldApi } from "@tanstack/react-form";

type FormFieldInfoProps = {
	field: AnyFieldApi;
};

// TODO: voir pour une refacto du code fournis par Gemini

export default function FormFieldInfo({ field }: FormFieldInfoProps) {
	const { isTouched, errors, isValidating } = field.state.meta;
	const hasErrors = isTouched && errors.length > 0;

	return (
		<div className="text-center mt-2">
			{hasErrors ? (
				<em
					role="alert"
					style={{ color: "red", fontSize: "0.875rem", display: "block" }}
				>
					{errors
						.map((error) => {
							// Si l'erreur est un objet (Zod), on affiche .message
							// Si c'est déjà une string, on l'affiche directement
							return typeof error === "object" && error !== null
								? error.message
								: error;
						})
						.join(", ")}
				</em>
			) : null}

			{isValidating ? (
				<span style={{ fontSize: "0.875rem", color: "blue" }}>
					Validation...
				</span>
			) : null}
		</div>
	);
}
