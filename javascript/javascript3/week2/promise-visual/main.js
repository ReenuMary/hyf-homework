function translateOneByOne() {
  const redBox = document.querySelector("ul.marks li:nth-child(1)");
  const blueBox = document.querySelector("ul.marks li:nth-child(2)");
  const greenBox = document.querySelector("ul.marks li:nth-child(3)");

  moveElement(redBox, {
    x: 20,
    y: 300,
  })
    .then(() =>
      moveElement(blueBox, {
        x: 400,
        y: 300,
      })
    )
    .then(() =>
      moveElement(greenBox, {
        x: 400,
        y: 20,
      })
    )
    .then(() => console.log("elements moved one by one"));
}

async function translateAllAtOnce() {
  const redBox = document.querySelector("ul.marks li:nth-child(1)");
  const blueBox = document.querySelector("ul.marks li:nth-child(2)");
  const greenBox = document.querySelector("ul.marks li:nth-child(3)");

  const redBoxPromise = moveElement(redBox, {
    x: 20,
    y: 300,
  });

  const blueBoxPromise = moveElement(blueBox, {
    x: 400,
    y: 300,
  });

  const greenBoxPromise = moveElement(greenBox, {
    x: 400,
    y: 20,
  });

  Promise.all([redBoxPromise, blueBoxPromise, greenBoxPromise]).then(() =>
    console.log("All boxes moved at once")
  );
}

translateOneByOne();
//translateAllAtOnce();
