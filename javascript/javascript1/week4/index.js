const myConversation = {};
const regexpressions = [];
regexpressions.push({
  expression: new RegExp("my name is", "i"),
  type: "userSaysName",
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
          if (myConversation.userName === undefined) {
            const userName = getName(command);
            saveName(userName);
            response = `nice to meet you ${myConversation.userName}`;
            break;
          }
        }
      }
    }
  }

  return response;
}
function getName(command) {
  const words = command.split(" ");
  const name = words[words.indexOf("name") + 2];
  return name;
}
function saveName(name) {
  name = name.trim();
  if (arguments.length >= 1 && name !== "") {
    myConversation.userName = name;
  }
}
console.log(getReply("Hello My name is Benjamin. I am from Denmark"));
