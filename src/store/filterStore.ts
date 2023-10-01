import { create } from 'zustand';
import { auth, firestore } from '@/lib/firebase';
import { doc, setDoc, getDoc } from "@firebase/firestore";

interface IFilter {
    selectedFields: string[],
    city: string,
}

interface IFilterStore extends IFilter {
    setSelectedFields: (selectedFields: string[]) => void,
    addSelectedField: (selectedField: string) => void,
    removeSelectedField: (selectedField: string) => void,
    updateFilter: (filter: Partial<IFilter>) => void,
    saveSelectedFields: () => void,
    getSelectedFields: () => void,
}

export const useFilterStore = create<IFilterStore>((set) => ({
    selectedFields: [],
    setSelectedFields: (selectedFields: string[]) => set({ selectedFields }),
    addSelectedField: (selectedField: string) => set((state) => ({ selectedFields: [...state.selectedFields, selectedField] })),
    removeSelectedField: (selectedField: string) => set((state) => ({ selectedFields: state.selectedFields.filter((field) => field !== selectedField) })),
    saveSelectedFields: () => {
        if (auth.currentUser?.uid) {
            const fields = useFilterStore.getState().selectedFields
            setDoc(doc(firestore, 'users', auth.currentUser.uid), { fields }, { merge: true })
        }
    },
    getSelectedFields: () => {
        if (auth.currentUser?.uid) {
            getDoc(doc(firestore, 'users', auth.currentUser.uid)).then((doc) => {
                if (doc.exists()) {
                    const data = doc.data()
                    if (data) {
                        set({ selectedFields: data.fields })
                    }
                }
            }
            )
        }
    },
    city: '',
    updateFilter: (filter: Partial<IFilter>) => set(filter),
}))