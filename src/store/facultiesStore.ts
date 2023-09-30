import {firestore} from "../lib/firebase";
import { collection, getDocs, query } from 'firebase/firestore';

export interface IFaculty {
    id: string,
    type: string,
}

const getFaculties = async (): Promise<string[]> => {
  const q = query(collection(firestore, 'faculties'));
  const querySnapshot = await getDocs(q);
  const data: IFaculty[] = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as IFaculty));
  // for each object in data return its id and name
  const uniqueData = new Set(data.map(({ type }: any) => (type)));
  return Array.from(uniqueData);
};

export default getFaculties;
