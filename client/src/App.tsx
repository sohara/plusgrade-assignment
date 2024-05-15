import { useEffect, useState } from "react";
import { ReservationProduct } from "../../server/src/lib/types";

function App() {
  const [reservationData, setReservationData] = useState<ReservationProduct[]>(
    [],
  );

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reservations", {
          method: "GET",
        });
        if (response.ok) {
          const json = await response.json();
          console.log({ json });
          setReservationData(json);
        }
      } catch (e) {
        console.error("Error pinging", e);
      }
    };
    fetchPing();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold pb-8">Reservation Data</h1>
      <table className="table-fixed">
        <thead>
          <th>Reservation UUID</th>
          <th>Number of Active Purchases</th>
          <th>Sum of Active Charges</th>
        </thead>
        <tbody>
          {reservationData.map((rd) => {
            return <TableRow row={rd} key={rd.reservation_uuid} />;
          })}
        </tbody>
      </table>
    </>
  );
}

function TableRow({ row }: { row: ReservationProduct }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <tr
        className="border-b border-gray-300 hover:cursor-pointer"
        key={row.reservation_uuid}
        onClick={() => {
          setShowDetail(!showDetail);
        }}
      >
        <td className="flex flex-row">
          <ChevronRigth open={showDetail} />
          {row.reservation_uuid}
        </td>
        <td>{row.numberActiveCharges}</td>
        <td>{row.activeSum.toFixed(2)}</td>
      </tr>
      {showDetail && (
        <>
          <tr>
            <th className="font-bold">Product Name</th>
            <th>Status</th>
            <th>Charge</th>
          </tr>
          {row.charges.map((charge) => {
            return (
              <tr
                className={`${charge.active ? "bg-green-500" : "bg-red-500"}`}
              >
                <td>{charge.name}</td>
                <td>{charge.active ? "active" : "cancelled"}</td>
                <td>{charge.amount.toFixed(2)}</td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
}

function ChevronRigth({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 transform transition-transform duration-300 ${
        open ? "rotate-90" : ""
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export default App;
