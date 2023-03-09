import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const baseUrl = "https://jsonplaceholder.typicode.com";

let studentStore = (set) => ({
  students: [],
  studentCount: 0,
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),

  fetch: async () => {
    const response = await fetch(`${baseUrl}/posts`);
    set({ students: await response.json() });
  },
});

studentStore = persist(studentStore, {
  name: "sd",
  // partialize: (state) => ({ studentCount: state.studentCount }),
  storage: createJSONStorage(() => sessionStorage),
  onRehydrateStorage: (state) => {
    return (state, error) => {
      if (error) {
        console.log("an error happened during hydration", error);
      } else {
        console.log("hydration finished");
      }
    };
  },
});

export const useStudentStore = create(devtools(studentStore));
