import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FormTitle from "../../../components/Form/FormTitle";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import { useState } from "react";
import { fcmTools } from "../../../utils/fcmTools";

const schema = z.object({
  age: z.coerce
    .number()
    .min(1, "Un âge valide est attendus")
    .max(120, "Un âge valide est attendus"),
  fcRepos: z.coerce
    .number()
    .min(1, "Une valeur de FC repos valid est attendus")
    .max(250, "Une valeur de Fc min est attendu")
    .optional(),
});

type FcmFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
  age: "",
  fcRepos: "",
};

export default function FcmPage() {
  const [fcMax, setFcMax] = useState<number | string>("");
  const [fcReserve, setFcReserve] = useState<number | string>("");

  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const data: FcmFormData = schema.parse(value);
      const fcRepo = data.fcRepos ?? null;
      const age = data.age;
      const fcMax = fcmTools.getFcMaxTheorique(age);
      setFcMax(fcMax);
      if (fcRepo) {
        setFcReserve(fcmTools.getFcReserve(age, fcRepo));
      }
      setFcmResult(fcMax);
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

        <form.Field name="fcRepos">
          {(field) => (
            <FormField
              field={field}
              isRequired={false}
              label="Fréquence repos"
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
                setFcMax("");
                setFcReserve("");
              }}
            />
          )}
        </form.Subscribe>
      </form>

      {fcMax && (
        // TODO: on peut passer dans un nouveau composant la fcReserve et fcMax pour générer le tableau avec les valeur % de fc 
        <div className="w-80 md:w-150 mx-auto p-4 mt-10">
          <div className="my-5 w-full">
            <label className="input w-full" htmlFor="fcmResult">
              <span className="label">Fréquence Cardique Maximum</span>
              <input type="string" id="fcmResult" value={fcMax} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
