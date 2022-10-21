import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BorderBox from "./border-box";
import "./css/to-do-list.css";

function ToDoList() {
  const [toDoTaskTxtBox, setToDoTask] = useState("");
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [dateErrorMsg, setDateErrorMsg] = useState("");
  const [taskNameErrorMsg, setTaskNameErrorMsg] = useState("");
  const [toDoList, setToDoList] = useState([]);

  function inputTextChangeHandler(e) {
    setToDoTask(e.target.value.trim());
  }

  function dateChangeHandler(date) {
    const currentDate = new Date();
    if (date <= currentDate) {
      console.log("past date");
      setDateErrorMsg("Pls enter a future date");
    } else {
      setDeadlineDate(date);
      console.log(date);
      setDateErrorMsg("");
    }
  }

  function AddClickHandler() {
    if (toDoTaskTxtBox === "") {
      setTaskNameErrorMsg("Pls enter task name");
    } else {
      setTaskNameErrorMsg("");
      let maxId = 0;
      for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].id > maxId) maxId = toDoList[i].id;
      }
      setToDoList((prevTaskList) => [
        ...prevTaskList,
        {
          id: maxId + 1,
          task: toDoTaskTxtBox,
          deadLine: deadlineDate,
          isCompleted: false,
          isEditModeOn: false,
        },
      ]);
    }
  }

  function DeleteTask(taskId) {
    console.log("dlete " + taskId);
    setToDoList(toDoList.filter((item) => item.id !== taskId));
  }
  function checkBoxStateChange(taskId) {
    const taskArray = [...toDoList];
    const currentTaskIndex = taskArray.indexOf(
      taskArray.find((x) => x.id === taskId)
    );
    if (currentTaskIndex !== -1) {
      taskArray[currentTaskIndex].isCompleted =
        !taskArray[currentTaskIndex].isCompleted;
    }
    console.log(taskArray);
    setToDoList(taskArray);
  }

  function editHandler(taskId) {
    const taskArray = [...toDoList];
    const currentTaskIndex = taskArray.indexOf(
      taskArray.find((x) => x.id === taskId)
    );
    if (currentTaskIndex !== -1) {
      taskArray[currentTaskIndex].isEditModeOn =
        !taskArray[currentTaskIndex].isEditModeOn;
    }
    setToDoList(taskArray);
  }

  function handleTaskNameChange(taskName, taskId) {
    console.log("handleTaskNameChange-", taskName, taskId);
    const taskArray = [...toDoList];
    const currentTaskIndex = taskArray.indexOf(
      taskArray.find((x) => x.id === taskId)
    );
    if (currentTaskIndex !== -1) {
      taskArray[currentTaskIndex].task = taskName;
    }
    setToDoList(taskArray);
  }

  return (
    <>
      <div className="container">
        <label>To Do Description</label>
        <input type="text" onChange={inputTextChangeHandler}></input>
        <label>DeadLine</label>
        <DatePicker selected={deadlineDate} onChange={dateChangeHandler} />
        <label className="errorMsg">{taskNameErrorMsg}</label>
        <span className="errorMsg">{dateErrorMsg}</span>
        <button onClick={AddClickHandler}>Add todo</button>
        <label>{toDoList.length} Items</label>
      </div>

      <ul className="task-list-ul">
        {toDoList.map((taskItem) => (
          <li key={taskItem.id}>
            <BorderBox>
              <TaskToDo
                todoItem={taskItem}
                handleTaskNameChange={(taskName, id) =>
                  handleTaskNameChange(taskName, id)
                }
              />
              <input
                type={"checkbox"}
                onChange={() => checkBoxStateChange(taskItem.id)}
                checked={taskItem.isCompleted}
              ></input>
              <button onClick={() => DeleteTask(taskItem.id)}>Delete</button>
              <button onClick={() => editHandler(taskItem.id)}>
                {taskItem.isEditModeOn ? "Update" : "Edit"}
              </button>
            </BorderBox>
          </li>
        ))}
      </ul>
    </>
  );
}

function TaskToDo(props) {
  // console.log("To do Item-", props.todoItem);
  const [toDoTaskNameTxtBox, updateToDoTaskNameTxtBox] = useState(
    props.todoItem.task
  );
  const taskNameTag = props.todoItem.isCompleted ? (
    <s>
      <label>{props.todoItem.task}</label>{" "}
    </s>
  ) : props.todoItem.isEditModeOn ? (
    <input
      type={"text"}
      value={toDoTaskNameTxtBox}
      onChange={(e) => updateToDoTaskNameTxtBox(e.target.value)}
      onBlur={() =>
        props.handleTaskNameChange(toDoTaskNameTxtBox, props.todoItem.id)
      }
    ></input>
  ) : (
    <label>{props.todoItem.task}</label>
  );

  return (
    <>
      <>{taskNameTag}</>
      <label>{FormatDate(props.todoItem.deadLine)}</label>
    </>
  );
}
function FormatDate(date) {
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${da}-${mo}-${ye}`;
}
export default ToDoList;

/*
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





 useEffect(() => {
     const interval = setInterval(() => {
       setTimeElapsed((timeElapsed) => timeElapsed + 1);
     }, 1000);
     return () => clearInterval(interval);
   }, []);
*/
