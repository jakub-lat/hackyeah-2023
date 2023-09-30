import { create } from 'zustand';

interface IGraphStore {
    focused?: string;
    setFocused: (v: string) => void;
}

export const useGraphStore = create<IGraphStore>((set) => ({
    focused: null,
    setFocused: (v: string) => set(() => ({ focused: v })),
}))