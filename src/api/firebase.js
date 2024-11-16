import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { v4 as v4uuid } from "uuid";

// * 기본 설정 *
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

// * Auth *

// 팝업을 띄워 로그인 하게 해주는 함수
export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch(console.error);
}

// 로그아웃 시켜주는 함수
export async function logout() {
  return signOut(auth).then(() => null);
}

// user의 상태 변화를 감시하는 함수
// callback은 상태가 변경될 때마다 호출해줄 콜백 함수를 의미
export function onUserStateChange(callback) {
  // 비동기니까 async 붙여주고 adminUser가 user를 반환해 줄때까지 기다려야되니까 await을 붙여줌
  onAuthStateChanged(auth, async (user) => {
    // 1. 사용자가 있는 경우 (로그인한 경우)
    if (user) {
      console.log('User is logged in:', user);
      // 데이터베이스 작업 수행
    } else {
      console.log('User is not logged in');
      // 로그인 후 데이터베이스 작업 수행
    }
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// admin user인지 아닌지 판단
async function adminUser(user) {
  // 2. 사용자가 admin 권한을 가지고 있는지 확인
  // 3. {...user, isAdmin : true/false} -> 기존 user에 isAdmin 속성을 추가
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

// * Product *
// 새로운 제품을 데이터베이스에 추가하는 함수
export async function addNewProduct(product, image) {
  // 제품별 고유한 id를 부여
  const id = v4uuid();
  // firebase에 데이터를 쓸때는 set을 사용
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(","),
  });
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      // Object.values를 사용하면 key value중 value들만 가져올 수 있음
      return Object.values(snapshot.val());
    }
    return [];
  });
}

// * 장바구니 *

// 장바구니에 있는 상품을 가지고 오는 함수 (carts안에는 user id 별로 카트가 따로 분리되어서 저장되어 있음)
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

// 장바구니에 상품을 추가하거나 업데이트 해주는 함수 (제품의 id 아래에 정보 추가)
// product에는 id, price, 장바구니에 추가하는 수량이 몇개인지가 담겨있음
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

// 장바구니에서 상품을 삭제하는 함수
export async function removeFromCart(userId, productId) {
  // database에서 정보를 삭제할 때는 remove를 사용
  return remove(ref(database, `carts/${userId}/${productId}`));
}
