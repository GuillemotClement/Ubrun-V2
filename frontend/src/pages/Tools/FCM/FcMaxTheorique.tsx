import { HeartPulse } from "lucide-react";

type FcMaxTheoriqueProps = {
	fcMax: number | string;
};

export default function FcMaxTheorique({ fcMax }: FcMaxTheoriqueProps) {
	return (
		<div className="flex justify-center gap-x-15 items-center border border-gray-300 rounded-xl py-5 shadow">
			<div className="flex items-center">
				<HeartPulse size={80} />
			</div>
			<div className="">
				<span>FCMax Théorique</span>
				<div className="">
					<span className="text-3xl font-bold me-2">{fcMax}</span>
					<span className="text-xl">BPM</span>
				</div>
			</div>
		</div>
	);
}
