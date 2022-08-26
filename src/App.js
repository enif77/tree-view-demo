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
  store:  buildOrderedTasksTree(tasks.map((task) => {

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

    return task;
  })),
};

// get tasks level 0
// sort tasks by name

// for each task in L0
//   get task children
//   sort children by name
//   insert children after the parent task

function buildOrderedTasksTree(tasks)
{
  const orderedTasksTree = [];

  tasks.forEach((task) => {
    if (!task.Task_Parent)
    {
      task.Task_Level = 0;

      orderedTasksTree.push(task);

      buildOrderedChildrenTree(task.Task_Children, orderedTasksTree)
    }
  });

  return orderedTasksTree;
}


function buildOrderedChildrenTree(children, tasksList)
{
  if (!children || children.length === 0)
  {
    return;
  }

  children.forEach((child) => {
    child.Task_Level = child.Task_Parent.Task_Level + 1;

    tasksList.push(child);
    buildOrderedChildrenTree(child.Task_Children, tasksList)
  });
}


export default App;
