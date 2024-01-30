import React, { useState } from "react";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  // uploading 중인 상태, 초기는 로딩중이 아니므로 false
  const [isUploading, setIsUploading] = useState(false);
  // 성공했는지의 여부 상태, 초기에는 아무것도 없는 상태 undefined
  const [success, setSuccess] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // 제품의 사진을 Cloudinary에 업로드 하고 URL을 획득
    uploadImage(file)
      .then((url) => {
        // FireBase에 새로운 제품을 추가함
        addNewProduct(product, url).then(() => {
          setSuccess("성공적으로 제품이 추가 되었습니다.");
          // 성공했다는 메세지를 계속 띄워주면 안되므로 일정 시간 후에 없애줌
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        });
      })
      .finally(() => {
        setIsUploading(false);
      });
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  return (
    <section>
      <p className="text-2xl font-semibold text-center py-5">
        새로운 제품 등록
      </p>
      {success && <p className="text-center my-4 font-semibold">✅{success}</p>}
      <hr />
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="local file"
          className="w-72 h-96 mx-auto"
        />
      )}
      <form
        className="flex flex-col items-evenly w-1/2 py-4 mx-auto"
        onSubmit={handleSubmit}
      >
        {/* accept 뒤에 적힌 것은 image 타입이어야 하고 확장자는 상관 없다는 의미 */}
        <input
          type="file"
          placeholder="이미지"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
          className="outline-none border border-gray-300 p-2 mb-2 rounded-xl mx-30"
        />
        <input
          type="text"
          placeholder="제품명"
          name="title"
          value={product.title ?? ""}
          onChange={handleChange}
          required
          className="outline-none border border-gray-300 p-2 mb-2 rounded-xl mx-30"
        />
        <input
          type="number"
          placeholder="가격"
          name="price"
          value={product.price ?? ""}
          onChange={handleChange}
          required
          className="outline-none border border-gray-300 p-2 mb-2 rounded-xl mx-30"
        />
        <input
          type="text"
          placeholder="카테고리 (남성 or 여성 입력)"
          name="category"
          value={product.category ?? ""}
          onChange={handleChange}
          required
          className="outline-none border border-gray-300 p-2 mb-2 rounded-xl mx-30"
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          onChange={handleChange}
          required
          className="outline-none border border-gray-300 p-2 mb-2 rounded-xl mx-30"
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들 (콤마(,)로 구분)"
          onChange={handleChange}
          required
          className="outline-none border border-gray-300 p-2 mb-2 rounded-xl mx-30"
        />
        <button
          className="outline-none bg-orange-500 hover:bg-orange-600 text-white py-2 mb-2 text-xl rounded-xl"
          disabled={isUploading}
        >
          {isUploading ? "업로드중..." : "제품 등록하기"}
        </button>
      </form>
    </section>
  );
}
