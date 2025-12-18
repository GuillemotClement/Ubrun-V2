import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { fcmTools } from "../../../utils/fcmTools";
import FcMaxTheorique from "./FcMaxTheorique";

type FcmTableProps = {
	fcMax: number | string;
	fcRepo: number;
};

type FcDataProps = {
	purcent: number;
	fc: number;
};

const columnHelper = createColumnHelper<FcDataProps>();

const columns = [
	columnHelper.accessor("purcent", {
		header: () => <span>Pourcentage</span>,
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("fc", {
		header: () => <span>Fréquence cardique</span>,
		cell: (info) => info.getValue(),
	}),
];

export default function FcmTable({ fcMax, fcRepo }: FcmTableProps) {
	const numericFc = Number(fcMax);
	const [zone, setZone] = useState<string>("1");
	console.log(fcRepo);
	const data = useMemo(() => {
		const numericZone = Number(zone);

		if (fcRepo > 0) {
			return fcmTools.generateFcReserveValuePerZone(
				numericZone,
				numericFc,
				fcRepo,
			);
		} else {
			return fcmTools.generateFcValuePerZone(numericZone, numericFc);
		}
	}, [numericFc, zone, fcRepo]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="p-2 flex flex-col">
			<div className="">
				<FcMaxTheorique fcMax={fcMax} />

				<div className="my-5 w-full">
					<select
						className="select w-full shadow"
						value={zone}
						onChange={(e) => setZone(e.target.value)}
					>
						<option value={1}>Zone 1 - Récupération</option>
						<option value={2}>Zone 2 - Endurance</option>
						<option value={3}>Zone 3 - Résistance douce</option>
						<option value={4}>Zone 4 - Résistance dure</option>
						<option value={5}>Zone 5 - Puissance</option>
					</select>
				</div>
			</div>

			<table className="table w-100 mx-auto">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="text-center">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="text-center">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
