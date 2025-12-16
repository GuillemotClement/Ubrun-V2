import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormTitle from "../../../components/Form/FormTitle";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import { getFCmax } from "../../../utils/fcmTools";
import { useState } from "react";

const schema = z.object({
  age: z.coerce
    .number()
    .min(1, "Un âge valide est attendus")
    .max(120, "Un âge valide est attendus"),
});

type FcmFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
  age: "",
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
      console.log("Age comme nombre:", data.age, typeof data.age);
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
              onReset={() => {
                form.reset();
                setFcmResult("");
              }}
            />
          )}
        </form.Subscribe>
      </form>

      {fcmResult && (
        <div className="w-80 md:w-150 mx-auto p-4 mt-10">
          <div className="my-5 w-full">
            <label className="input w-full" htmlFor="fcmResult">
              <span className="label">Fréquence Cardique Maximum</span>
              <input type="string" id="fcmResult" value={fcmResult} />
            </label>
          </div>
        </div>
      )}
      
      
      
      
      
      
      
      
      
    </div>
  );
}
