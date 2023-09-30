import { create } from 'zustand';

interface IFilter {
    selectedFields: string[],
    city: string,
}

interface IFilterStore extends IFilter {
    setSelectedFields: (selectedFields: string[]) => void,
    addSelectedField: (selectedField: string) => void,
    removeSelectedField: (selectedField: string) => void,
    updateFilter: (filter: Partial<IFilter>) => void,
}

export const useFilterStore = create<IFilterStore>((set) => ({
    selectedFields: [],
    setSelectedFields: (selectedFields: string[]) => set({ selectedFields }),
    addSelectedField: (selectedField: string) => set((state) => ({ selectedFields: [...state.selectedFields, selectedField] })),
    removeSelectedField: (selectedField: string) => set((state) => ({ selectedFields: state.selectedFields.filter((field) => field !== selectedField) })),
    city: '',
    updateFilter: (filter: Partial<IFilter>) => set(filter),
}))