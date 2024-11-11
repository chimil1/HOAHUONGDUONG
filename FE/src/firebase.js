import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAY5W_Kzp6ibKEsH6GmnG2g9MjmOd-wi0Q",
  authDomain: "molten-shield-426203-s1.firebaseapp.com",
  projectId: "molten-shield-426203-s1",
  storageBucket: "molten-shield-426203-s1.firebasestorage.app",
  messagingSenderId: "748364389535",
  appId: "1:748364389535:web:0bcd37cdcf10eca286d6aa"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default app;