import { create } from 'zustand';
import { auth, firestore } from '@/lib/firebase';
import { doc, setDoc, getDoc } from "@firebase/firestore";

interface IFilter {
    selectedFields: string[],
    selectedCities: string[],
    tags: ITagValue[],
    points?: number,
}

interface IFilterStore extends IFilter {
    setCities: (cities: string[]) => void,
    selectedCities: string[],
    setSelectedFields: (selectedFields: string[]) => void,
    addSelectedField: (selectedField: string) => void,
    removeSelectedField: (selectedField: string) => void,
    updateFilter: (filter: Partial<IFilter>) => void,
    saveSelectedFields: () => void,
    getSelectedFields: () => void,
    addTag: (tag: ITagValue) => void,
    removeTag: (name: string) => void,
    setPoints: (points: number) => void,
}

export interface ITagType {
    name: string;
    type: 'bool' | 'score';
}

export interface ITagValue {
    name: string;
    value: boolean | number;
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
                    if (data.fields) {
                        set({ selectedFields: data.fields })
                    }
                    else {
                        set({ selectedFields: [] })
                    }
                }
                else {
                    set({ selectedFields: [] })
                }
            }
            )
        }
    },
    city: '',
    updateFilter: (filter: Partial<IFilter>) => set(filter),
    selectedCities: [],
    setCities: (cities: string[]) => set({ selectedCities: cities }),
    tags: [],
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (name: string) => set((state) => ({ tags: state.tags.filter((t) => t.name !== name) })),
    points: null,
    setPoints: (points) => set({ points }),
}));