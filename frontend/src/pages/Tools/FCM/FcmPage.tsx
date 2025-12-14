/*
this use for calculate FCM for a user.

User can choise if want the basique formule or the formulaire with fc repos.

i need to get age and sexe for the user. If user want second formule, i need to know his fc repo

TODO: get age with user data
*/
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  age: z.string().regex(/^\d*$/, "La valeur doit être un nombre"),
  // fcMin: z.string().regex(/^\d*$/, "La valeur doit être un nombre").optional(),
  sexe: z.enum(["man", "woman"], {
    errorMap: () => ({ message: "Selectionner un sexe" }),
  }),
});

type formData = z.infer<typeof schema>;

const getFcMinBasique = (age: number): number => {
  const maxValue = 220;

  return maxValue - age;
};

export default function FcmPage() {
  const [result, setResult] = useState<number | null>(null);

  const defaultValues = {
    age: "",
    // fcMin: "",
  };

  const form = useForm({
    defaultValues,
    validatorAdaptator: zodValidator(),
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      const numericAge = Number(value.age);
      const fcMax = getFcMinBasique(numericAge);
      setResult(fcMax);
    },
  });

  return (
    <>
      <p>FC Max = {result}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-80 md:w-150"
      >
        <h2>Fréquence Cardique</h2>

        <form.Field
          name="age"
          children={(field) => (
            <div className="flex flex-col mb-4">
              <label htmlFor={field.name} className="label mb-2 text-black">
                Âge :
              </label>
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="100"
                className="input w-full"
              />
            </div>
          )}
        />
        {/*
        <form.Field
          name="fcMin"
          children={(field) => (
            <div className="flex flex-col mb-4">
              <label htmlFor={field.name} className="label mb-2 text-black">
                Fréquence cardique minimal :
              </label>
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Fréquence cardiaque minimal"
                className="input w-full"
              />
            </div>
          )}
        />*/}

        <form.Field
          name="sexe"
          children={(field) => (
            <div className="flex flex-col mb-4">
              <label className="label mb-2 text-black">Sexe :</label>
              <div className="flex gap-4">
                {/* Radio Homme */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field.name}
                    value="homme"
                    checked={field.state.value === "homme"}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-4 h-4"
                  />
                  <span>Homme</span>
                </label>

                {/* Radio Femme */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field.name}
                    value="femme"
                    checked={field.state.value === "femme"}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-4 h-4"
                  />
                  <span>Femme</span>
                </label>
              </div>

              {/* Afficher les erreurs */}
              {field.state.meta.errors.length > 0 && (
                <div className="text-red-500 text-sm mt-2">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-center gap-x-5">
              <button
                type="reset"
                onClick={(e) => {
                  e.preventDefault();
                  setResult(null);
                  setPurcent(null);
                  setValue(null);
                  form.reset();
                }}
                className="btn btn-neutral"
              >
                Effacer
              </button>

              <button
                type="submit"
                disabled={!canSubmit}
                className="btn btn-primary"
              >
                {isSubmitting ? "..." : "Calculer"}
              </button>
            </div>
          )}
        />
      </form>
    </>
  );
}
