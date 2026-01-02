import { Platform } from "react-native";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  QuerySnapshot,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore";
import firebaseConfig from "./firebase.config";

// Determine which config to use
const config =
  Platform.OS === "web" ? firebaseConfig.web : firebaseConfig.native;

// Initialize Firebase
const app: FirebaseApp = initializeApp(config);
const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);

// Auth functions
export const signIn = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = (): Promise<void> => {
  return firebaseSignOut(auth);
};

export const onAuthChanged = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions
export const getCollectionRef = <T = DocumentData>(
  collectionName: string
): CollectionReference<T> => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const getDocumentRef = <T = DocumentData>(
  collectionName: string,
  documentId: string
): DocumentReference<T> => {
  return doc(firestore, collectionName, documentId) as DocumentReference<T>;
};

export const getDocument = async <T = DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> => {
  const docRef = getDocumentRef<T>(collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const setDocument = <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: T
): Promise<void> => {
  const docRef = getDocumentRef<T>(collectionName, documentId);
  return setDoc(docRef, data);
};

export const updateDocument = <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = getDocumentRef<T>(collectionName, documentId);
  return updateDoc(docRef, data);
};

export const deleteDocument = (
  collectionName: string,
  documentId: string
): Promise<void> => {
  const docRef = getDocumentRef(collectionName, documentId);
  return deleteDoc(docRef);
};

export { app, auth, firestore };
