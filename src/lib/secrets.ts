import { getDoc, doc  } from "firebase/firestore";
import { db } from "./firebase";


const keysRef = doc(db, "keys", "oYSDpRcpmcjDNeE9ccHF") ;
const docSnap = await getDoc(keysRef);

export const openAiKey = docSnap.data()!["value"];
