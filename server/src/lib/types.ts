export type ProductAssignment = {
  id: number;
  reservation_uuid: string;
  name: string;
};

export type ProductCharge = {
  special_product_assignment_id: number;
  active: boolean;
  amount: number;
};

type ExtendedProductCharge = ProductCharge & { name: string };
export type ReservationProduct = {
  reservation_uuid: string;
  charges: ExtendedProductCharge[];
  numberActiveCharges: number;
  activeSum: number;
};
