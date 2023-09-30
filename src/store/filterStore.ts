import { create } from 'zustand';

interface IFilter {
    count: number;
    increment: () => void;
}

export const useFilterStore = create<IFilter>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}))