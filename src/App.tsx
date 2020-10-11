import React, { Fragment, useState } from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  }

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  }

  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <h1>Add new tasks</h1>
          <div className="card bg-dark col-md-6">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={e => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                />
                <button className="btn btn-primary btn-block mt-2">Save</button>
              </form>
            </div>
            {
              tasks.map((task: ITask, id: number) => (
                <div className="card card-body bg-secondary mb-2" key={id}>
                  <h3 style={{
                    textDecoration: task.done ? 'line-through' : ''
                  }}>{task.name}</h3>
                  <div>
                    <button className="btn btn-success">
                      {task.done ? '❌' : '✅'}
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
