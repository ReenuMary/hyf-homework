import ListHeader from "./to-do-header";
import "./task-item.css";

const myList = [
  { id: 1, task: "Get out of bed", deadLine: "Wed Sep 13 2017" },
  { id: 2, task: "Brush teeth", deadLine: "Thu Sep 14 2017" },
  { id: 3, task: "Eat breakfast", deadLine: "Fri Sep 15 2017" },
];
function ToDoList() {
  return (
    <div className="task-box ">
      <ListHeader />
      <TaskList />
    </div>
  );
}

function TaskList() {
  return (
    <>
      <ul className="task-list-ul">
        {myList.map((taskItem) => (
          <TaskItem taskItem={taskItem} key={taskItem.id} />
        ))}
      </ul>
    </>
  );
}

function TaskItem({ taskItem }) {
  return (
    <>
      <li>
        <TaskName task={taskItem.task}></TaskName>
        <DeadLine deadLineDate={taskItem.deadLine}></DeadLine>
      </li>
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
