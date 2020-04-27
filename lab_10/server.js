// These are our required libraries to make the server work.

import express from "express";
import fetch from "node-fetch";

// const sqlite3 = require('sqlite3').verbose(); // We're including a server-side version of SQLite, the in-memory SQL server.
// const open = require(sqlite).open; // We're including a server-side version of SQLite, the in-memory SQL server.

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import writeUser from "./libraries/writeuser";

const dbSettings = {
  filename: "./tmp/database.db",
  driver: sqlite3.Database,
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

function processDataForFrontEnd(req, res) {
  const baseURL = ""; // Enter the URL for the data you would like to retrieve here

  // Your Fetch API call starts here
  // Note that at no point do you "return" anything from this function -
  // it instead handles returning data to your front end at line 34.
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      res.send({ data: data }); // here's where we return data to the front end
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/error");
    });
}

// Syntax change - we don't want to repeat ourselves,
// or we'll end up with spelling errors in our endpoints.
//
app
  .route("/api")
  .get((req, res) => {
    console.log("Get Request");
    res.send("Get Request");
  })
  .post((req, res) => {
    const req_name = req.body.name;
    const req_zipcode = req.body.zipcode;
    const req_interest = req.body.interests;
    console.log("\n");
    console.log("req_name",req_name);
    console.log("\n");
    console.log("req_zipcode",req_zipcode);
    console.log("\n");
    console.log("req_interest",req_interest);
    console.log("\n");
    // processDataForFrontEnd(req, res)
    (async () => {
      const db = await open(dbSettings);
      //https://www.w3schools.com/php/php_mysql_create_table.asp
      //auto increment is implicit THANK YOU : https://www.sqlitetutorial.net/sqlite-autoincrement/
      const create_command = `CREATE TABLE IF NOT EXISTS SUBMISSIONS (
        name TEXT NOT NULL,
        zipcode TEXT NOT NULL,
        interest TEXT NOT NULL) `;
      console.log(create_command);
      const result = await db.all(create_command);
      console.log("Create Database:", result);

      const insert_command = `INSERT INTO SUBMISSIONS (name, zipcode, interest)
      VALUES('${req_name}', '${req_zipcode}', '${req_interest}') `;
      console.log(insert_command);
      const result2 = await db.all(insert_command);
      console.log("Insert Submission:", result2);

      const select_command = "SELECT * FROM SUBMISSIONS";
      console.log(select_command);

      const result3 = await db.all(select_command);
      //const result = await db.all("SELECT * FROM user");

      console.log("Current Database:", result3);

      res.json(result3);
    })();

    console.log("POST POST POST");
    console.log("/api post request", req.body);
    if (!req.body.name) {
      console.log(req.body);
      res
        .status("418")
        .send("something went wrong, additionally i am a teapot");
    } else {
      writeUser(req.body.name, dbSettings)
        .then((result) => {

          console.log(result);
          res.send("your request was successful"); // simple mode
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  .put((req, res) => {
    console("PUT PUT PUT");

    console.log("PUT REQUEST!");
    res
      .status("418")
      .send("something went wrong, additionally i am a teapot 2");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
