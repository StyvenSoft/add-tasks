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
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  onChange={e => setNewTask(e.target.value)} 
                  value={newTask} 
                  className="form-control"
                />
                <button className="btn btn-primary btn-block mt-2">Save</button>
                {
                  tasks.map((task: ITask, id: number) => {
                    return <h1 key={id}>{task.name}</h1>
                  })
                }
              </form>
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
