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

//"What is on my todo?"
regexpressions.push({
  expression: new RegExp("What [a-z,0-9,\\s]*  my todo?", "i"),
  type: "listTasks",
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
          const taskToAdd = getTask(command.toLowerCase(), "add", 1);
          if (myConversation.toDoList === undefined) {
            myConversation.toDoList = [taskToAdd];
          } else {
            myConversation.toDoList.push(taskToAdd);
          }
          response = `${taskToAdd} added to To Do  list`;
          break;
        }

        case "listTasks": {
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

function getTask(command) {
  const words = command.split(" ");
  let i = words.indexOf("add") + 1;
  let task = "";
  while (i < words.length - 3) {
    task += words[i] + " ";
    ++i;
  }

  task.trim();

  return task;
}

console.log(getReply("What is my name?"));

console.log(getReply("Hello My name is Benjamin. I am from Denmark"));
console.log(getReply("My name is Hughes."));

console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
