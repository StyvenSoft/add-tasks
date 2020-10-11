import React, { Fragment, useState, useRef } from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  }

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  }

  const toggleDoneTask = (id: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[id].done = !newTasks[id].done;
    setTasks(newTasks);
  }

  const removeTask = (id: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(id, 1);
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
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-primary btn-block mt-2">Save</button>
              </form>
            </div>
            {
              tasks.map((task: ITask, id: number) => (
                <div className="card card-body bg-secondary mb-2" key={id}>
                  <h3 style={{
                    textDecoration: task.done ? 'line-through' : '',
                    color: task.done ? 'black' : ''
                  }}>{task.name}</h3>
                  <div>
                    <button className={task.done ? 'btn btn-warning' : 'btn btn-success'}
                      onClick={() => toggleDoneTask(id)}>
                      {task.done ? '❌' : '✅'}
                    </button>
                    <button className="btn btn-danger ml-2"
                      onClick={() => removeTask(id)}>
                      ⌫
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
