const Male = "male";
const Female = "female";

function getFullname(firstName, sirName, useFormalName = false, gender = Male) {
  firstName = firstName.replace(/\s/g, "");
  sirName = sirName.replace(/\s/g, "");
  if (firstName === "" || sirName === "") {
    //throw new console.error("First name and sir name should not be empty");
    console.warn("First name and sir name should not be empty");
    return;
  }
  if (useFormalName) {
    if (gender === Male) {
      return `Lord ${firstName} ${sirName}`;
    } else if (gender === Female) {
      return `Lady ${firstName} ${sirName}`;
    }
  }
  return `${firstName} ${sirName}`;
}

const fullname1 = getFullname("Reenu", "Abraham");
console.log(fullname1);
const fullname2 = getFullname("Benjamin", "Hughes", true);
console.log(fullname2);
const fullname3 = getFullname("Sofia", "John", true, Female);
console.log(fullname3);
const fullname4 = getFullname("Catrine", "", true, Female);
if (fullname4 != undefined) {
  console.log(fullname4);
}

//Ex 2
const weekDay = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function getEventWeekday(noOfdaysFromToday) {
  const day = new Date();
  day.setDate(day.getDate() + noOfdaysFromToday);
  return weekDay[day.getDay()];
}

console.log(`Event day is ${getEventWeekday(40)}`);
