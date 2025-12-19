import { useForm } from "@tanstack/react-form";
import { z } from "zod"; 
import FormTitle from "../../components/Form/FormTitle";
import FormField from "../../components/Form/FormField/FormField";
import FormSubscribe from "../../components/Form/FormSubscribe/FormSubscribe";

const schema = z.object({
  email: z.email("Une email valide est attendu").trim(),
  name: z.string().min(2, "Un nom valide est attendu").trim(),
  password: z.string().min(8, "Un mot de passe de 8 caractères est attendus"),
  confirmPassword: z.string().min(8, "Une confirmation de mot de passe est attendu").trim()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirmation du mot de passe invalide",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
}


export default function RegisterPage(){

  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => (
      console.log(value)
    ),
  });

  return (
    <form 
      className="border"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      
    <FormTitle title="Inscription"/>     
      
    <form.Field name="name">
      {(field) => (
        <FormField
          field={field}
          isRequired={true}
          label="Nom"
          type="text"
        />
      )}
    </form.Field>

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

    <form.Field name="confirmPassword">
      {(field) => (
        <FormField
          field={field}
          isRequired={true}
          label="Confirmation du mot de passe"
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
  )
}