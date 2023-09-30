import {firestore} from "../lib/firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';


const getFaculties = async () => {
  const q = query(collection(firestore, 'faculties'));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  // for each object in data return its id and name
  const uniqueData = new Set(data.map(({type}) => (type)));
  return Array.from(uniqueData);
};

export default getFaculties;