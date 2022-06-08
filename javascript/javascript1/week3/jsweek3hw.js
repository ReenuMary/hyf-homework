const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

// Write some code here
function removeNameFromArray(name) {
  if (arguments.length < 1 || typeof name != "string") {
    console.log("Please provide the name to remove as a string");
    return;
  }
  //the check is not necessary but just additional info for the user if required
  if (names.indexOf(name) === -1) {
    console.log(`${name} is not present in the array`);
    return;
  }
  names.splice(names.indexOf(name), 1);
}
removeNameFromArray();
removeNameFromArray("5");
removeNameFromArray(nameToRemove);
// Code done

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']

//Ex 2
const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function getTravelTime(travelInformation) {
  if (
    arguments.length < 1 ||
    !travelInformation.hasOwnProperty("destinationDistance") ||
    !travelInformation.hasOwnProperty("speed")
  ) {
    return "Invalid travel information";
  }
  if (
    isNaN(travelInformation.destinationDistance) ||
    isNaN(travelInformation.speed)
  ) {
    return "Distance and speed must be numerical values";
  }
  if (typeof travelInformation.destinationDistance !== "number") {
    travelInformation.destinationDistance = parseFloat(
      travelInformation.destinationDistance
    );
    if (isNaN(travelInformation.destinationDistance)) {
      return "Distance and speed must be numerical values";
    }
  }
  if (typeof travelInformation.speed !== "number") {
    travelInformation.speed = parseFloat(travelInformation.speed);
    if (isNaN(travelInformation.speed)) {
      return "Distance and speed must be numerical values";
    }
  }
  const time = travelInformation.destinationDistance / travelInformation.speed;
  const hours = Math.floor(time);
  const minutes = Math.floor((time % 1) * 60);
  return `${hours} hours and ${minutes} minutes`;
}
console.log(getTravelTime());
console.log(getTravelTime(2));
console.log(getTravelTime({ destinationDistance: NaN, speed: "25" }));
console.log(getTravelTime({ destinationDistance: true, speed: "25" }));
console.log(getTravelTime({ destinationDistance: "100", speed: "25" }));

const travelTime = getTravelTime(travelInformation);
console.log(travelTime); // 8 hours and 38 minutes

//Ex3
const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
];

function logOutSeriesText() {
  // write code here

  let totaltimeOnAllSeries = 0;
  for (siries of seriesDurations) {
    const totalSeriesTimeInMinutes =
      siries.days * 24 * 60 + siries.hours * 60 + siries.minutes;
    totaltimeOnAllSeries += totalSeriesTimeInMinutes;
    const percentageLife = calculateLifeTimePercentage(
      totalSeriesTimeInMinutes
    );

    console.log(`${siries.title} took ${percentageLife.toFixed(3)} of my life`);
  }
  console.log(
    `In total that is ${Math.fround(
      calculateLifeTimePercentage(totaltimeOnAllSeries)
    )} of my life }`
  );
}

function calculateLifeTimePercentage(activityTime) {
  const avgLifeInYears = 80;
  const lifeTimeInMinutes = avgLifeInYears * 365 * 24 * 60;
  return (activityTime / lifeTimeInMinutes) * 100;
}

logOutSeriesText();

//Ex4
const notes = [
  {
    id: 1,
    content: "my notes",
  },
  {
    id: 2,
    content: "your  notes",
  },
];

//assuming notes is using positive integers as id , not handling float id or -ve number
function saveNote(content, id = 0) {
  if (arguments.length < 1) {
    console.log("No content provided to save");
    return;
  }
  if (typeof id !== "number") {
    console.log("Notes is using numerical id. Invalid id provided");
    return;
  }
  // if no id provided create id
  if (id === 0) {
    id = createId();
  }
  //check if the provided id is repeating
  else {
    if (isExistingId(id)) {
      const createdId = createId();
      console.log(
        `${id} is already in use. So saving the note with a new Id as ${createId()}`
      );
      id = createdId;
    }
    notes.push({ id, content });
  }
}

function createId() {
  if (notes.length === 0) {
    return 1;
  }
  return Math.max(...notes.map((x) => x.id)) + 1;
}

function isExistingId(id) {
  return notes.find((x) => x.id === id) === undefined ? false : true;
}
function getNote(id) {
  if (arguments.length < 1 || typeof id !== "number") {
    console.log("Please provide a numerical id to retrieve a note");
    return;
  }
  if (!isExistingId(id)) {
    console.log("Invalid id");
    return;
  }
  return notes.find((x) => x.id === id);
}
saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
//console.log(notes);
const firstNote = getNote(3);
console.log("note with id 3 is ", firstNote);

function logOutNotesFormatted() {
  for (note of notes) {
    console.log(
      `The note with id:${note.id}, has the following note text:${note.content}`
    );
  }
}

logOutNotesFormatted();
//Extra Search feature to notes
//return all notes that contain the given string
function searchInNotes(word) {
  return notes.filter((note) => note.content.includes(word));
}

console.log("Notes that contain the word 'notes' ", searchInNotes("notes"));
