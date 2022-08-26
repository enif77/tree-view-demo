import './App.css';
import TreeView from './Components/TreeView';


function App(props) {

  console.log('begin App()')
  
  const orderedTasksList = props.data;

  const data = {
    store: orderedTasksList
  };

  console.log('end App()')

  return (
    <TreeView data={data} />
  );
}


// const dataSourceOptions = {
//   store:  tasks.map((task) => {

//     // Link a child task to its parent and a parent to its child.
//     tasks.forEach((parent) => {
//       if (task.Task_Parent_ID === parent.Task_ID) {

//         // Child to parent.
//         task.Task_Parent = parent;

//         // Parent to child.
//         if (!parent.Task_Children) {
//           parent.Task_Children = [];
//         }
//         parent.Task_Children.push(task);
//       }
//     });

//     // Link tasks to employees.
//     employees.forEach((employee) => {
//       if (task.Task_Assigned_Employee_ID === employee.ID) {
//         task.Task_Assigned_Employee = employee;
//       }
//     });

//     return task;
//   }),
// };

export default App;
