import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      newTask: "",
      tasks: [
        { name: "task 0", stage: 0 },
        { name: "task 1", stage: 0 },
      ],
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }

  render() {
    const { tasks, newTask } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    const pushToBacklog = () => {
      this.setState({
        tasks: [...tasks, { name: newTask, stage: 0 }],
      });
    };

    const setTask = (e) => {
      this.setState({
        newTask: e.target.value,
      });
    };

    const deleteHandler = (deleteTask) => {
      this.setState({
        tasks: tasks.filter((task) => task !== deleteTask),
      });
    };

    const moveTheTask = (direction, currInd, taskName) => {
      const res = tasks.map((task) => {
        if (task.name === taskName) {
          task.stage =
            direction === "backward" ? task.stage - 1 : task.stage + 1;
        }
        return task;
      });
      this.setState({
        tasks: [...res],
      });
    };

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            onChange={setTask}
          />
          <button
            type="submit"
            className="ml-30"
            data-testid="create-task-button"
            onClick={pushToBacklog}
          >
            Create task
          </button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                                disabled={task.stage === 0 ? true : false}
                                onClick={(e) =>
                                  moveTheTask("backward", i, task.name)
                                }
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                                disabled={
                                  task.stage === stagesTasks.length - 1
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                  moveTheTask("forward", i, task.name)
                                }
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                              <button
                                className="icon-only danger x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                                onClick={() => deleteHandler(task)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
