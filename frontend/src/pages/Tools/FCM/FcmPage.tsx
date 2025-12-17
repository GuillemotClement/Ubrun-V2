import { useStableCallback } from "@tanstack/react-router";
import FcmForm from "./FcmForm";
import FcmTable from "./FcmTable";
import { useState } from "react";

export default function FcmPage() {
  const [fcMax, setFcMax] = useState<number>(0);

  return (
    <div className="container border mx-auto flex">
      <div className="card flex-1">
        <FcmForm setFcMax={setFcMax} />
      </div>

      {fcMax > 0 && (
        <div className="card flex-1">
          <FcmTable fcMax={fcMax} />
        </div>
      )}
    </div>
  );
}
