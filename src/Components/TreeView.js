import './TreeView.css';

import TreeViewItem from './TreeViewItem';

function TreeView(props) {
  const tasks = props.data.store;

  return (
    <table className="TreeView">
      <thead>
        <tr>
          <th>Task_ID</th>
          <th>Task_Level</th>
          <th>Task_Subject</th>
          <th>Task_Parent_ID</th>
          <th>Task_Parent</th>
          <th>Task_Children</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => <TreeViewItem key={task.Task_ID} entity={task} />)}
      </tbody>
    </table>
  );
}

export default TreeView;