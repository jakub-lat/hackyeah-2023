import { create } from 'zustand';
import {auth, firestore} from "@/lib/firebase.ts";
import {doc, getDoc, setDoc} from "@firebase/firestore";

interface IUniStore {
    focused?: IUniversity;
    setFocused: (v: IUniversity) => void;
    favorites: string[];
    setFavorites: (v: string[]) => void;
    saveFavorites: () => Promise<void>;
    getFavorites: () => Promise<void>;
}

export interface IUniversity {
    name: string,
    latitude: number,
    longitude: number,
    city: string,
    geoHash: string,
    major?: string,
    icon?: string,
    description?: string,
    fieldsOfStudy?: string[],
    rating?: number,
    comments?: []
}

export const useUniStore = create<IUniStore>((set) => ({
    focused: null,
    setFocused: (v) => set(() => ({ focused: v })),
    favorites: [],
    setFavorites: (v) => set(() => ({ favorites: v })),
    saveFavorites: async () => {
        if (auth.currentUser?.uid) {
            const favorites = useUniStore.getState().favorites;
            await setDoc(doc(firestore, 'users', auth.currentUser.uid), { favorites }, { merge: true })
        }
    },
    getFavorites: async () => {
        if (auth.currentUser?.uid) {
            getDoc(doc(firestore, 'users', auth.currentUser.uid)).then((doc) => {
                    if (doc.exists()) {
                        const data = doc.data()
                        if (data.favorites) {
                            set({ favorites: data.favorites })
                        }
                        else {
                            set({ favorites: [] })
                        }
                    }
                    else {
                        set({ favorites: [] })
                    }
                }
            )
        }
    },
}))