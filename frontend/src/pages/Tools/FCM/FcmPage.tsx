import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormTitle from "../../../components/Form/FormTitle";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import { getFCmax } from "../../../utils/fcmTools";
import { useState } from "react";

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
  
  const [fcmResult, setFcmResult] = useState<number | string>("");
  
  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const data: FcmFormData = schema.parse(value);
      setFcmResult(getFCmax(data.age));
      // console.log(getFCmax(data.age));
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
      
      <div className="">
        <div className="my-5 w-full">
          <label className="input w-full" htmlFor="resultat">
            <input type="number" value={fcmResult } />
          </label>
        </div>
      </div>
    </div>
  );
}
