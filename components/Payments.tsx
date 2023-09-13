"use client";

import React from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

type Props = {};

const Payments = (props: Props) => {
  const [amount, setAmount] = React.useState<number>(0);

  return (
    <>
      <div className="container p-4 flex flex-col gap-4">
        <input
          type="number"
          placeholder="Amount"
          className="outline-none bg-white border-2 rounded-md px-4 py-2 text-xl border-blue-400 "
          value={amount}
          onChange={(e: any) => {
            setAmount(e.target.value);
          }}
        />
        <PaymentForm
          applicationId="sandbox-sq0idb-zIoT5P0ENI30YPO3GJxK3A"
          cardTokenizeResponseReceived={async (token: any) => {
            const response = await fetch("/api/payment", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                sourceId: token.token,
                paymentAmount: amount,
              }),
            });
          }}
          locationId="LF5JVGMR7C8AE"
        >
          <CreditCard />
        </PaymentForm>
      </div>
    </>
  );
};

export default Payments;
