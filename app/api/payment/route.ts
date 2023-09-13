import { NextRequest, NextResponse } from "next/server";
import { Client } from "square";
import { randomUUID } from "crypto";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export async function POST(req: NextRequest) {
  const data: {
    sourceId: string;
    paymentAmount: bigint;
  } = await req.json();

  const { paymentsApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN as string,
    environment: "sandbox" as any,
  });

  const { result } = await paymentsApi.createPayment({
    idempotencyKey: randomUUID(),
    sourceId: data.sourceId,
    locationId: process.env.SQUARE_LOCATION_ID as string,
    amountMoney: {
      currency: "USD",
      amount: data.paymentAmount,
    },
  });

  if (result.payment?.status !== "COMPLETED") {
    return NextResponse.json({
      message: "Payment failed",
      error: result.errors,
    });
  }

  return NextResponse.json({ message: "Payment successful", result });
}
