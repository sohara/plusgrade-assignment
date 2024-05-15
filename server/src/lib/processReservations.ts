import { ProductAssignment, ProductCharge, ReservationProduct } from "./types";

export function processReservations(
  assignments: ProductAssignment[],
  productCharges: ProductCharge[],
): ReservationProduct[] {
  type AccumulatorType = {
    [key: string]: ProductAssignment[];
  };
  const grouped = assignments.reduce<AccumulatorType>((accum, cur) => {
    const uuid = cur.reservation_uuid;
    if (!accum[uuid]) {
      accum[uuid] = [];
    }
    accum[uuid].push(cur);
    return accum;
  }, {});

  return Object.entries(grouped)
    .map(([reservation_uuid, assignments]) => {
      const charges = assignments.flatMap((pa) =>
        productCharges
          .filter((c) => c.special_product_assignment_id === pa.id)
          .map((c) => ({
            ...c,
            name: pa.name,
          })),
      );

      const activeCharges = charges.filter((c) => c.active);
      const activeSum = activeCharges.reduce(
        (accum, cur) => accum + cur.amount,
        0,
      );

      return {
        reservation_uuid,
        charges,
        activeSum,
        numberActiveCharges: activeCharges.length,
      };
    })
    .filter((rd) => rd.charges.length > 0);
}
