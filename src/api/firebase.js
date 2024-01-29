import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { v4 as v4uuid } from "uuid";

// * 기본 설정 *
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
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
