import express, { Request, Response } from "express";
import cors from "cors";
import productAssignmentJSON from "./lib/product_assignment.json";
import productChargesJSON from "./lib/product_charges.json";
import { ProductAssignment, ProductCharge } from "./lib/types";
import { processReservations } from "./lib/processReservations";

const productAssignment = productAssignmentJSON as ProductAssignment[];
const productCharges = productChargesJSON as ProductCharge[];

const reservationData = processReservations(productAssignment, productCharges);

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS to accept requests from http://localhost:5173
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/api/ping", (_: Request, res: Response) => {
  res.json({ success: true });
});

app.get("/api/reservations", (_: Request, res: Response) => {
  res.json(reservationData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
