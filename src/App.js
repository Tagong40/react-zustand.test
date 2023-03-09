import { useRef } from "react";
import "./App.css";
import { useSettingsStore } from "./store/useSettingStore";
import { useEffect } from "react";
import { useStudentStore } from "./store/useStudentStore";

function App() {
  const getStudent = useStudentStore((state) => state.students);
  const addStudent = useStudentStore((state) => state.addStudent);
  const toggleDark = useSettingsStore((state) => state.toggleDark);
  const fetchStudent = useStudentStore((state) => state.fetch);

  const dark = useSettingsStore((state) => state.dark);

  const ref = useRef();

  const add = () => {
    addStudent(ref.current.value);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  useEffect(() => {
    if (dark) {
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("dark");
    }
  }, [dark]);

  const checl = window.navigator.onLine;

  console.log(checl);

  return (
    <div className="App">
      <button onClick={toggleDark}>Dark Mode</button>
      <h5>School Manage</h5>
      <input placeholder="Add Student" type="text" ref={ref} />
      <button type="button" onClick={add}>
        Add Student
      </button>

      <ul style={{ listStyle: "none" }}>
        {getStudent.map((student, index) => (
          <li key={index} style={{ margin: "10px" }}>
            {student.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
