import { create } from 'zustand';

interface IFieldStore {
    focused?: string;
    setFocused: (v: string) => void;
}

export const useFieldsStore = create<IFieldStore>((set) => ({
    focused: null,
    setFocused: (v: string) => set(() => ({ focused: v })),
}))