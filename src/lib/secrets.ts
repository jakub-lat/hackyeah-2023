import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";


const keysRef = doc(db, "keys", "oYSDpRcpmcjDNeE9ccHF");

export const getOpenAIKey = async () => {
    const docSnap = await getDoc(keysRef);
    return docSnap.data()["value"];
} 
