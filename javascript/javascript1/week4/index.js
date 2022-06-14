const myConversation = {};
const regexpressions = [];
regexpressions.push({
  expression: new RegExp("What is my name?", "i"),
  type: "userAsksName",
});

regexpressions.push({
  expression: new RegExp("my name is ", "i"),
  type: "userSaysName",
});

regexpressions.push({
  expression: new RegExp("Add [a-z,0-9,\\s]* to my todo", "i"),
  type: "addToDoList",
});

regexpressions.push({
  expression: new RegExp("What is on my todo?", "i"),
  type: "listToDo",
});

regexpressions.push({
  expression: new RegExp("Remove [a-z,0-9,\\s]* from my todo", "i"),
  type: "removeFromToDoList",
});

regexpressions.push({
  expression: new RegExp("What day is it today?", "i"),
  type: "today",
});

function getReply(command) {
  if (arguments.length < 1 || command === "") {
    return "Sorry I didn't hear you";
  }
  let response = "";
  for (let regex of regexpressions) {
    if (regex.expression.test(command)) {
      switch (regex.type) {
        case "userSaysName": {
          const userName = getName(command.toLowerCase());
          if (myConversation.userName === undefined) {
            saveName(userName);
            response = `nice to meet you ${myConversation.userName}`;
          } else {
            if (myConversation.userName === userName) {
              response = `I know your name, ${myConversation.userName}`;
            } else {
              response = `I thought your name was ${myConversation.userName}. Ok now I see your name is ${userName}. I will remember that.`;
              saveName(userName);
            }
          }
          break;
        }

        case "userAsksName": {
          if (myConversation.userName === undefined) {
            response = "You never told me your name.";
          } else {
            response = `Your name is ${myConversation.userName}`;
          }
          break;
        }

        case "addToDoList": {
          const taskToAdd = getTask(command.toLowerCase());
          if (taskToAdd !== "" && taskToAdd !== " ") {
            addTask(taskToAdd);
            response = `${taskToAdd} added to To Do  list`;
          } else {
            response = `no task found in your command`;
          }
          break;
        }

        case "listToDo": {
          console.log("list detected");
          if (myConversation.toDoList === undefined) {
            response = "Your haven't added anything to the list yet";
          } else {
            if (myConversation.toDoList.length === 0) {
              response = `Your to do is empty`;
            } else {
              response = `Your to do list is ${myConversation.toDoList}`;
            }
          }
          break;
        }

        case "removeFromToDoList": {
          const taskToRemove = getTask(command.toLowerCase(), "remove");
          if (taskToRemove !== "" && taskToRemove !== " ") {
            response = removeFromToDoList(taskToRemove);
          } else {
            response = `no task found in your command`;
          }
          break;
        }
        case "today": {
          response = getFormattedDate();
          break;
        }
        default:
          break;
      }
    }
  }

  return response;
}
function saveName(name) {
  name = name.trim();
  if (arguments.length >= 1 && name !== "") {
    myConversation.userName = name;
  }
}
function getName(command) {
  const words = command.split(" ");
  const name = words[words.indexOf("name") + 2];
  return name;
}
/* function getWordAfter(command, word, nthword) {
  const words = command.split(" ");
  const wordAfter = words[words.indexOf(word) + nthword];
  return wordAfter;
} */

function getTask(command, wordBeforeTask = "add") {
  const words = command.split(" ");
  let i = words.indexOf(wordBeforeTask) + 1;
  let task = "";
  while (i < words.length - 3) {
    task += words[i] + " ";
    ++i;
  }
  task.trim();
  return task;
}

function addTask(taskToAdd) {
  if (myConversation.toDoList === undefined) {
    myConversation.toDoList = [taskToAdd];
  } else {
    myConversation.toDoList.push(taskToAdd);
  }
}

function removeFromToDoList(taskToReomve) {
  if (myConversation.toDoList === undefined)
    return "Your to do list is empty. So cannot remove.";

  if (myConversation.toDoList.includes(taskToReomve)) {
    myConversation.toDoList = myConversation.toDoList.splice(
      myConversation.toDoList.indexOf(taskToReomve),
      1
    );
    return `${taskToReomve} removed from your to do`;
  } else {
    return `${taskToReomve} not found in your list`;
  }
}

function getFormattedDate() {
  let today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `Today is ${today.getDate()} of ${
    months[today.getMonth()]
  } ${today.getFullYear()}`;
}
console.log(getReply("What is my name?"));

console.log(getReply("Hello My name is Benjamin. I am from Denmark"));
console.log(getReply("My name is Hughes."));

console.log(getReply("What is my name?"));
console.log(getReply("What is on my todo?"));
console.log(getReply("Remove abcd from my todo"));

console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add  to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("Remove abcd from my todo"));
console.log(getReply("What day is it today?"));
