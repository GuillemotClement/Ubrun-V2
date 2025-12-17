import FcmForm from "./FcmForm";
import FcmTable from "./FcmTable";
import { useState } from "react";

export default function FcmPage() {
  const [fcMax, setFcMax] = useState<number>(0);
  const [fcRepo, setFcRepo] = useState<number>(0);
  const [showFcForm, setShowFcForm] = useState<boolean>(false);

  const toggleFormFc = () => {
    setShowFcForm(!showFcForm);
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
        <label className="label" onClick={toggleFormFc}>
          <input type="checkbox" className="checkbox" />
          Je ne connais pas ma fréquence cardiaque maximal
        </label>
      </fieldset>

      {showFcForm && (
        <div className="card flex-1">
          {/*Permet de fournir la FC max si user ne la connait*/}
          <FcmForm setFcMax={setFcMax} setFcRepo={setFcRepo} />
        </div>
      )}

      <div className="card flex-1">
        <FcmForm setFcMax={setFcMax} setFcRepo={setFcRepo} />
      </div>

      {fcMax > 0 && (
        <div className="card flex-1">
          <FcmTable fcMax={fcMax} fcRepo={fcRepo} />
        </div>
      )}
    </div>
  );
}
