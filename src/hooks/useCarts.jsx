// carts을 읽어오고 업데이트 하는 쿼리를 사용하는 모든 것들을 여기서 담당
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";

export default function useCarts() {
  const queryClient = useQueryClient();
  const { uid } = useAuthContext();

  // enabled 옵션을 통해 uid가 존재하는 경우에만 사용하도록 해줌
  const cartsQuery = useQuery({
    queryKey: ["carts", uid ? uid : ""],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  // 아래 두가지 모두 해당하는 uid의 캐시만 invalidate 시켜줌

  const updateCart = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSucess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["carts", uid],
      }),
  });

  const deleteCart = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSucess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["carts", uid],
      }),
  });

  return { cartsQuery, updateCart, deleteCart };
}
