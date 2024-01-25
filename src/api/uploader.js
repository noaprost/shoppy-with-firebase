// cloudinary에 이미지를 업로드 하면 url을 받아올 수 있음
export async function uploadImage(file) {
  // 선택된 file을 받아서 업로드 해주고
  // 그 file의 url을 받아서 return 하도록 해줌
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
