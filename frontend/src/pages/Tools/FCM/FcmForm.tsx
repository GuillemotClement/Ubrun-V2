import { useState } from "react";
import { z } from "zod";
import { fcmTools } from "../../../utils/fcmTools";
import { useForm } from "@tanstack/react-form";
import FormField from "../../../components/Form/FormField/FormField";
import FormSubscribe from "../../../components/Form/FormSubscribe/FormSubscribe";
import FormTitle from "../../../components/Form/FormTitle";

const schema = z.object({
  age: z.coerce
    .number()
    .min(1, "Un âge valide est attendus")
    .max(120, "Un âge valide est attendus"),
  // fcRepos: z.coerce
  //   .number()
  //   .min(1, "Une valeur de FC repos valid est attendus")
  //   .max(250, "Une valeur de Fc min est attendu")
  //   .optional(),
});

type FcmFormData = z.infer<typeof schema>;

const defaultValues: z.input<typeof schema> = {
  age: "",
  // fcRepos: "",
};

type FcmFormProps = {
  setFcMax: (age: number) => void;
};

export default function FcmForm({ setFcMax }: FcmFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const data: FcmFormData = schema.parse(value);
      const age = data.age;
      setFcMax(fcmTools.getFcMaxTheorique(age));
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
      <FormTitle title="Fréquence cardique maximal" />

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
