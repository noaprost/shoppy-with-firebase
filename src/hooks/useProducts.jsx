// product을 읽어오고 업데이트 하는 쿼리를 사용하는 모든 것들을 여기서 담당
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { addNewProduct, getProducts } from "../api/firebase";

export default function useProducts() {
  // useQueryClient : 현재 만들어져있는 queryClient를 가져와주는 함수
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSucess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["product"],
      }),
  });

  return { productsQuery, addProduct };
}
