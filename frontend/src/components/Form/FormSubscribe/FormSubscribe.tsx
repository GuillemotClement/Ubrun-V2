type FormSubscribeProps = {
  canSubmit: boolean;
  isSubmitting: boolean;
  onReset: () => void;
};

export default function FormSubscribe({
  canSubmit,
  isSubmitting,
  onReset,
}: FormSubscribeProps) {
  return (
    <div className="flex justify-center gap-x-5">
      <button type="reset" onClick={onReset} className="btn btn-neutral">
        Effacer
      </button>

      <button type="submit" disabled={!canSubmit} className="btn btn-primary">
        {isSubmitting ? "..." : "Calculer"}
      </button>
    </div>
  );
}
