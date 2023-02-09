import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsCheck2Circle, BsCartCheck } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

const PaymentNav = ({ status }) => {
  return (
    <>
      <BsCartCheck className={status === "cart" ? "m-2 text-danger" : "m-2"} />
      <span className={status === "cart" ? "fw-bold text-danger" : null}>
        Cart
      </span>
      <AiOutlineRight
        className={status === "cart" ? "m-2 text-danger" : "m-2"}
      />

      <MdPayment className={status === "payment" ? "m-2 text-danger" : "m-2"} />
      <span className={status === "payment" ? "fw-bold text-danger" : null}>
        Payment
      </span>
      <AiOutlineRight
        className={status === "payment" ? "m-2 text-danger" : "m-2"}
      />

      <BsCheck2Circle
        className={status === "complete" ? "m-2 text-danger" : "m-2"}
      />
      <span className={status === "complete" ? "fw-bold text-danger" : null}>
        Order Complete
      </span>
    </>
  );
};

export default PaymentNav;
