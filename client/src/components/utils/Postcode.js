import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export default function Postcode({ setAddress }) {
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data) => {
    let postcode = data.zonecode;
    let address = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      address += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(address); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress({
      postcode: postcode,
      address: address,
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div type="button" className="check_btn" onClick={handleClick}>
      주소 검색
    </div>
  );
}
