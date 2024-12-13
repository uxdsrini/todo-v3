import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "AIzaSyBUaJQYSIf7yc5jPIoWMYswfRLBO0C_eVA",
      authDomain: "todo-68a9f.firebaseapp.com",
      projectId: "todo-68a9f",
      storageBucket: "todo-68a9f.firebasestorage.app",
      messagingSenderId: "742647686605",
      appId: "1:742647686605:web:f3ea4194ff2fb55782d084"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    export { auth, db };
