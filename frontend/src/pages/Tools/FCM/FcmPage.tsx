import { useState } from "react";
import AgeForm from "./AgeForm";
import FcmForm from "./FcmForm";
import FcmTable from "./FcmTable";

export default function FcmPage() {
	const [fcMax, setFcMax] = useState<number>(0);
	const [fcRepo, setFcRepo] = useState<number>(0);
	const [showAgeForm, setShowAgeForm] = useState<boolean>(false);

	const toggleAgeForm = () => {
		setShowAgeForm(!showAgeForm);
	};

	return (
		<div className="container mx-auto flex flex-col items-center">
			<button type="button" className="btn btn-neutral" onClick={toggleAgeForm}>
				{showAgeForm ? "Je connais ma FCM" : "Je ne connais pas ma FCM"}
			</button>

			{showAgeForm ? (
				<div className="card flex-1">
					{/*Permet de fournir la FC max si user ne la connait*/}
					<AgeForm setFcMax={setFcMax} />
				</div>
			) : (
				<div className="card flex-1">
					<FcmForm setFcMax={setFcMax} setFcRepo={setFcRepo} />
				</div>
			)}

			{fcMax > 0 && (
				<div className="card flex-1">
					<FcmTable fcMax={fcMax} fcRepo={fcRepo} />
				</div>
			)}
		</div>
	);
}
