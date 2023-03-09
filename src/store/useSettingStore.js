import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import produce from "immer";

let settingsStore = (set) => ({
  dark: false,
  offline: false,
  toggleDark: () =>
    set((state) => ({
      dark: !state.dark,
    })),
  detectOffline: () => set((state) => ({ offline: !state.offline })),
});

// const useStore = create((set) => ({
//   lush: { forest: { contains: { a: "bear" } } },
//   set: (fn) => set(produce(fn)),
// }));

// const set = useStore((state) => state.set);
// set((state) => {
//   state.lush.forest.contains = null;
// });

settingsStore = devtools(settingsStore);
settingsStore = persist(settingsStore, {
  name: "user_settings",
  storage: createJSONStorage(() => sessionStorage),
});

export const useSettingsStore = create(settingsStore);
