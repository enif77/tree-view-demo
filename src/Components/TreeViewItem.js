function TreeViewItem(props) {
  const task = props.entity;

  const parentInfo = (!task.Task_Parent)
    ? 'root'
    : task.Task_Parent.Task_Subject;

  var childrenInfo = '[';

  if (task.Task_Children)
  {
    task.Task_Children.forEach((child) => {
      childrenInfo += child.Task_ID;
      childrenInfo += ', ';
    });
  }

  childrenInfo += ']';

  return (
    <tr className="TreeViewItem">
      <td>{task.Task_ID}</td>
      <td>{task.Task_Subject}</td>
      <td>{task.Task_Parent_ID}</td>
      <td>{parentInfo}</td>
      <td>{childrenInfo}</td>
    </tr>
  );
}

export default TreeViewItem;

/*

{
    Task_ID: 1,
    Task_Assigned_Employee_ID: 1,
    Task_Subject: 'Plans 2015',
    Task_Start_Date: '2015-01-01T00:00:00',
    Task_Due_Date: '2015-04-01T00:00:00',
    Task_Status: 'Completed',
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
}

*/