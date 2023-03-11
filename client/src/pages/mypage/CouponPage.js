import React, { useLayoutEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { AiOutlineSmile } from "react-icons/ai";
import { motion } from "framer-motion";

const CouponPage = () => {
  const [title, setTitle] = useOutletContext();

  useLayoutEffect(() => {
    setTitle("쿠폰 / 마일리지");
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <motion.div
        initial={{ opacity: 0, y: "20px" }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0 }}
      >
        <div
          style={{
            color: "gray",
            fontSize: "1.5rem",
            textAlign: "center",
            lineHeight: "2.5rem",
          }}
        >
          <div>해당 기능은 준비 중입니다.</div>
          <div>
            조금만 기다려 주세요 <AiOutlineSmile size={25} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CouponPage;
