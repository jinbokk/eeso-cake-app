import {
  PayPalScriptProvider,
  PayPalButtons,
  // usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AeD5S412na1slGAd1JG9mYPStTUONDAJq_7rTadDKcLfdJ0FBoWg0kUIqmfauXpqnRUZXsOAxTHXXQcb",
  // currency: "KRW",
  // intent: "capture",
  // "data-client-token": "abc123xyz==",
};

export default function Paypal() {
  // const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        {/* {isPending ? <div className="spinner" /> : null} */}
        <PayPalButtons
          style={{
            layout: "horizontal",
            color: "blue",
            label: "pay",
            height: 50,
          }}
        />
      </PayPalScriptProvider>
    </>
  );
}
