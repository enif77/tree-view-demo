//import logo from './logo.svg';
import './App.css';

import { employees, tasks } from './data.js';

import TreeView from './Components/TreeView';

var tasksLinked = false;

function App() {
  linkTasks(tasks);

  const data = {
    //store: tasks
    store: buildOrderedTasksTree(tasks)
  };

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


function linkTasks(tasks)
{
  if (tasksLinked) return;

  console.log('begin linkTasks()')

  tasks.forEach((task) => {

    // Link a child task to its parent and a parent to its child.
    tasks.forEach((parent) => {
      if (task.Task_Parent_ID === parent.Task_ID) {

        // Child to parent.
        task.Task_Parent = parent;

        // Parent to child.
        if (!parent.Task_Children) {
          parent.Task_Children = [];
        }
        parent.Task_Children.push(task);
      }
    });

    // Link tasks to employees.
    employees.forEach((employee) => {
      if (task.Task_Assigned_Employee_ID === employee.ID) {
        task.Task_Assigned_Employee = employee;
      }
    });

  });

  console.log('end linkTasks()')

  tasksLinked = true;
}


function buildOrderedTasksTree(tasks)
{
  console.log('begin buildOrderedTasksTree()')

  let orderedTasksTree = [];

  const rooTaskList = [];
  tasks.forEach((task) => {
    if (!task.Task_Parent)
    {
      task.Task_Level = 0;

      rooTaskList.push(task);
    }
  });

  rooTaskList.sort(function(taskA, taskB) {
    return taskA.Task_Subject.localeCompare(taskB.Task_Subject)
  });

  rooTaskList.forEach((task) => {
    orderedTasksTree.push(task);
    
    buildOrderedChildrenTree(task.Task_Children, orderedTasksTree);
  });

  console.log('end buildOrderedTasksTree()')

  return orderedTasksTree;
}


function buildOrderedChildrenTree(children, tasksList)
{
  if (!children || children.length === 0)
  {
    return;
  }

  const childrenList = []; 
  children.forEach((child) => {
    child.Task_Level = child.Task_Parent.Task_Level + 1;

    childrenList.push(child);
  });

  childrenList.sort(function(taskA, taskB) {
    return taskA.Task_Subject.localeCompare(taskB.Task_Subject)
  });

  childrenList.forEach((task) => {
    tasksList.push(task);
    
    buildOrderedChildrenTree(task.Task_Children, tasksList);
  });
}

export default App;
