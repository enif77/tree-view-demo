import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Get data. Should come from an API.
import { employees, tasks } from './data.js';

// Tasks tree manipulation functions.
import { linkTasks, buildOrderedTasksTree } from './TasksList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App data={buildOrderedTasksTree(linkTasks(tasks, employees))} />
  </React.StrictMode>
);
