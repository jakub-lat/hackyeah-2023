import { create } from 'zustand';
import { auth, firestore } from '@/lib/firebase';
import { doc, setDoc } from "@firebase/firestore";

interface IFilter {
    selectedFields: string[],
    selectedCities: string[],
    tags: ITagValue[],
}

interface IFilterStore extends IFilter {
    setCities: (cities: string[]) => void,
    selectedCities: string[],
    setSelectedFields: (selectedFields: string[]) => void,
    addSelectedField: (selectedField: string) => void,
    removeSelectedField: (selectedField: string) => void,
    updateFilter: (filter: Partial<IFilter>) => void,
    saveSelectedFields: () => void,
    addTag: (tag: ITagValue) => void,
    removeTag: (name: string) => void,
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
    updateFilter: (filter: Partial<IFilter>) => set(filter),
    selectedCities: [],
    setCities: (cities: string[]) => set({ selectedCities: cities }),
    tags: [],
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (name: string) => set((state) => ({ tags: state.tags.filter((t) => t.name !== name) })),
}));