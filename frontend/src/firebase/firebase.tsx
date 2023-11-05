import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where, doc, getDoc, setDoc } from "firebase/firestore";
import { FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT!);
// console.log(firebaseConfig)


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore through Firebase
const db = getFirestore(app);

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
  twitter: new TwitterAuthProvider(),
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = res.user;

    const userData = {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
    };

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        userData
      ),
    });

    // const response = await fetch('/api');
    // // const data = await response.json();
    // // console.log(data);
    console.log(await response.text());

    // const response = await fetch('/api', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })

    // console.log(await response.text());

    // fetch('/api', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })
    //   // .then(response => response.json())
    //   .then(response => console.log(response))
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));

    // // writing to postgresql
    // const existingUser = await prisma.user.findUnique({
    //   where: { user_id: user.uid },
    // });

    // // If user doesn't exist, create one
    // if (!existingUser) {
    //   await prisma.user.create({
    //     data: {
    //       user_id: user.uid,
    //       name: user.displayName,
    //       authProvider: 'google',
    //       email: user.email || "null",
    //     },
    //   });
    // }


    // writing to firestore
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        // use userData dcitionary
        user_id: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  }
  catch (err) {
    if (err instanceof Error) {
      alert("An error occurred while signing in with Google: " + err.message);
    }
  }
};

const saveResponses = async (userId: string, responses: any) => {
  const responsesRef = doc(db, "responses", userId);
  await setDoc(responsesRef, { userId, responses });
};

const fetchRole = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().role;
  } else {
    console.log("No such document!");
  }
};

const fetchUser = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

const updateUser = async (userId: string, data: any) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, data, { merge: true });
};

const logout = () => signOut(auth);


export { auth, db, app, signInWithGoogle, logout, fetchRole, fetchUser, updateUser, saveResponses };

