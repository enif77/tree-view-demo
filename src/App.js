//import logo from './logo.svg';
import './App.css';

import { employees, tasks } from './data.js';

import TreeView from './Components/TreeView';

function App() {
  return (
    <TreeView data={dataSourceOptions} />
  );
}


const dataSourceOptions = {
  store: tasks.map((task) => {

    // Link child tast to their parents.
    tasks.forEach((parent) => {
      if (task.Task_Parent_ID === parent.Task_ID) {
        task.Task_Parent = parent;
      }

    });

    // Link tasks to employees.
    employees.forEach((employee) => {
      if (task.Task_Assigned_Employee_ID === employee.ID) {
        task.Task_Assigned_Employee = employee;
      }
    });

    return task;
  }),
};


export default App;
