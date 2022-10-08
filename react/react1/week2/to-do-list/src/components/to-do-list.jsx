import ListHeader from "./to-do-header";
import "./css/task-item.css";
import { useState } from "react";

const myList = [
  {
    id: 1,
    task: "Get out of bed",
    deadLine: "Wed Sep 13 2017",
    isCompleted: false,
  },
  {
    id: 2,
    task: "Brush teeth",
    deadLine: "Thu Sep 14 2017",
    isCompleted: true,
  },
  {
    id: 3,
    task: "Eat breakfast",
    deadLine: "Fri Sep 15 2017",
    isCompleted: false,
  },
];
function ToDoList() {
  const [tasks, setTasks] = useState(myList);

  function AddTaskClickHandler() {
    console.log("Add task clicked");
    let maxId = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id > maxId) maxId = tasks[i].id;
    }
    setTasks((prevTaskList) => [
      ...prevTaskList,
      {
        id: maxId + 1,
        task: "My Random Task",
        deadLine: "Fri Sep 15 2017",
      },
    ]);
  }

  function DeleteTask(taskId) {
    console.log("dlete " + taskId);
    setTasks(tasks.filter((item) => item.id !== taskId));
  }
  function checkBoxStateChange(taskId) {
    const taskArray = [...tasks];
    const currentTaskIndex = taskArray.indexOf(
      taskArray.find((x) => x.id === taskId)
    );
    if (currentTaskIndex !== -1) {
      taskArray[currentTaskIndex].isCompleted =
        !taskArray[currentTaskIndex].isCompleted;
    }
    console.log(taskArray);
    setTasks(taskArray);
  }

  const taskList =
    tasks.length === 0 ? (
      <p>No Items</p>
    ) : (
      <ul className="task-list-ul">
        {tasks.map((taskItem) => (
          <li key={taskItem.id}>
            <TaskItem taskItem={taskItem} />
            <input
              type={"checkbox"}
              onChange={() => checkBoxStateChange(taskItem.id)}
              checked={taskItem.isCompleted}
            ></input>
            <button onClick={() => DeleteTask(taskItem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );

  return (
    <>
      <div className="task-box ">
        <ListHeader />
        <button onClick={AddTaskClickHandler} className="addButton">
          Add Task
        </button>
        {taskList}
      </div>
    </>
  );
}

function TaskItem({ taskItem }) {
  const taskNameTag = taskItem.isCompleted ? (
    <s>
      <TaskName task={taskItem.task}></TaskName>{" "}
    </s>
  ) : (
    <TaskName task={taskItem.task}></TaskName>
  );
  return (
    <>
      {taskNameTag}
      <DeadLine deadLineDate={taskItem.deadLine}></DeadLine>
    </>
  );
}

function TaskName({ task }) {
  return <p className="task">{task}</p>;
}

function DeadLine({ deadLineDate }) {
  return <p className="deadline">{deadLineDate}</p>;
}

export default ToDoList;
