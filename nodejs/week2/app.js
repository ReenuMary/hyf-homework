const { json } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.get("/search", (req, res) => {
  const q = req.query.q;
  const readJson = require("./readJsonFile");
  const jsonData = readJson("./documents.json");
  if (jsonData.length === 0) {
    res.status(404).send("No documents found");
  } else {
    if (q === undefined) {
      {
        res.send(jsonData);
      }
    } else {
      const filteredData = [];
      jsonData.forEach((element) => {
        Object.keys(element).forEach((elementKey) => {
          if (new String(element[elementKey]).includes(q))
            filteredData.push(element);
        });
      });
      res.send(filteredData);
    }
  }
});

app.get("/documents/:id", (req, res) => {
  const id = req.params.id;
  const readJson = require("./readJsonFile");
  const jsonData = readJson("./documents.json");
  if (jsonData.length === 0) {
    res.status(404).send("No documents found");
  } else {
    const result = jsonData.filter((x) => x.id === parseInt(id));
    if (result.length === 0) {
      res.status(404).send(`No document with id ${id} found`);
    } else {
      res.json(result);
    }
  }
});

app.post("/search", (req, res) => {
  const fields = req.body.fields;
  const q = req.query.q;
  const readJson = require("./readJsonFile");
  const jsonData = readJson("./documents.json");
  if (jsonData.length === 0) {
    res.status(404).send("No documents found");
  }

  if (fields !== undefined && q !== undefined) {
    res
      .status(400)
      .send("Provide either query parameters or fields parameters");
  }
  if (fields !== undefined) {
    let result = [];
    Object.keys(fields).forEach((key) => {
      result = result.concat(jsonData.filter((x) => x[key] === fields[key]));
      //remove duplicates
      result = Array.from(new Set(result));
    });
    res.send(result);
  } else if (q !== undefined) {
    const filteredData = [];
    jsonData.forEach((element) => {
      Object.keys(element).forEach((elementKey) => {
        if (new String(element[elementKey]).includes(q))
          filteredData.push(element);
      });
    });
    res.send(filteredData);
  } else {
    res
      .status(400)
      .send("Provide either query parameters or fields for filtering");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
