import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fcmTools } from "../../../utils/fcmTools";
import { useMemo, useState } from "react";

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
    const fcData = [];

    if (fcRepo > 0) {
      return fcmTools.generateFcReserveValuePerZone(
        numericZone,
        numericFc,
        fcRepo,
      );
    } else {
      return fcmTools.generateFcValuePerZone(numericZone, numericFc);
    }
  }, [numericFc, zone]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 flex flex-col items-center">
      <div className="badge badge-success h-8 w-150 rounded-2xl shadow my-7">
        <p className="text-xl">
          Fréquence Cardique Max théorique: <span>{fcMax}</span>
        </p>
      </div>

      <div>
        <select
          className="select"
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

      <table className="table w-100 mx-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                <td key={cell.id}>
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

// TODO: améliorer le tableau en mettant en valeur les % important
// TODO: gérer soit le cas ou fcTheorique ou FcReserve
// TODO: optimiser le code
// TODO: définir des composant pour le tableau
// 1 - Récupération - 60-65 fcMax ou 50-60% FcReserve
// 1 - Endurance - 65-70 fcMax ou 60-70% FcReserve
// 1 - resistance douce 75-85  fcMax ou 70-80% FcReserve
// 1 - resistance dure - 85-95 fcMax ou 80-90% FcReserve8
// 1 - puissance - 95-100 fcMax ou 90-100% FcReserve
