/* Tasks helper functions. */

export function linkTasks(tasks, employees)
{
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

  return tasks;
}


export function buildOrderedTasksTree(tasks)
{
  let orderedTasksTree = [];

  const rooTaskList = [];
  tasks.forEach((task) => {
    if (!task.Task_Parent)
    {
      task.Task_Level = 0;

      rooTaskList.push(task);
    }
  });

  rooTaskList.sort(compareTasks);

  rooTaskList.forEach((task) => {
    orderedTasksTree.push(task);
    
    buildOrderedChildrenTree(task.Task_Children, orderedTasksTree);
  });

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

  childrenList.sort(compareTasks);

  childrenList.forEach((task) => {
    tasksList.push(task);
    
    buildOrderedChildrenTree(task.Task_Children, tasksList);
  });
}


function compareTasks(taskA, taskB) {
  return taskA.Task_Subject.localeCompare(taskB.Task_Subject)
}
