import { HeartPulse } from "lucide-react";

type FcMaxTheoriqueProps = {
    fcMax: number | string;
}



export default function FcMaxTheorique({ fcMax }: FcMaxTheoriqueProps) {
  return (
    <div className="flex shadow h-auto border border-gray-400 shadow rounded">
        <div className="flex items-center me-4">
          <HeartPulse  className=""/>
        </div>
        <div className=" flex flex-col flex-1 pe-2">
          <span>FCMax Théorique</span>
          <div className="">
            <span className="text-3xl font-bold">{ fcMax }</span>
            <span className="text-xl">BPM</span>
          </div>
        </div>
    </div>
  )
}