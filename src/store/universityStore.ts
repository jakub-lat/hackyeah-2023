import { create } from 'zustand';

interface IUniStore {
    focused?: IUniversity;
    setFocused: (v: IUniversity) => void;
}

export interface IUniversity {
    name: string,
    latitude: number,
    longitude: number,
    icon?: string,
    description?: string,
    fieldsOfStudy?: string[],
    rating?: number,
    comments?: []
}

export const useUniStore = create<IUniStore>((set) => ({
    focused: null,
    setFocused: (v) => set(() => ({ focused: v })),
}))