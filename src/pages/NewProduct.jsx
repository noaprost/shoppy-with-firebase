import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import Input from "../components/ui/Input";

export default function NewProduct() {
  // const cld = new Cloudinary({ cloud: { cloudName: "dt1a3ykkk" } });
  // cld.uploader.upload(
  //   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  //   { public_id: "olympic_flag" },
  //   function (error, result) {
  //     console.log(result);
  //   }
  // );
  return (
    <div>
      <p className="text-2xl font-semibold text-center py-5">
        새로운 제품 등록
      </p>
      <hr />
      <form className="flex flex-col items-evenly px-24 py-3">
        <p className="py-4 mb-2">이미지 등록</p>
        <Input type="text" placeholder="제품명" />
        <Input type="number" placeholder="가격" />
        <Input type="text" placeholder="카테고리 (남성 or 여성 입력)" />
        <Input type="text" placeholder="제품 설명" />
        <Input type="text" placeholder="옵션들 (콤마(,)로 구분)" />
        <button className="outline-none bg-orange-500 hover:bg-orange-600 text-white py-4 mb-2 text-xl rounded-xl">
          제품 등록하기
        </button>
      </form>
    </div>
  );
}
