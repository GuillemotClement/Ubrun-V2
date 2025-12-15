/*
this use for calculate FCM for a user.

User can choise if want the basique formule or the formulaire with fc repos.

i need to get age and sexe for the user. If user want second formule, i need to know his fc repo

TODO: get age with user data
*/
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormTitle from "../../../components/Form/FormTitle";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";

const schema = z.object({
  age: z.coerce
    .number<string>()
    .min(1, { error: "Un âge valide est attendus" })
    .max(120, { error: "Age invalide" }),
});

type FcmFormData = z.infer<typeof schema>;

const defaultValues = {
  age: "" as string | number,
};

export default function FcmPage() {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const data: FcmFormData = schema.parse(value);
      console.log(data.age); // on obtient bien un number ici
    },
  });

  return (
    <div className="container mx-auto py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-80 md:w-150 mx-auto border border-stone-300 rounded shadow p-4"
      >
        <FormTitle title="Fréquence Cardique" />

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
              onReset={() => form.reset()}
            />
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
