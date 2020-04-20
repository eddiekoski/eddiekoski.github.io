// These are our required libraries to make the server work.
// We're including a server-side version of Fetch to build on your client-side work
const express = require('express');
const fetch = require('node-fetch');

// Here we instantiate the server we're going to turn on
const app = express();


// Servers are often subject to the whims of their environment.
// Here, if our server has a PORT defined in its environment, it will use that.
// Otherwise, it will default to port 3000
const port = process.env.PORT || 3000;

// Our server needs certain features - like the ability to send and read JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// And the ability to serve some files publicly, like our HTML.
app.use(express.static('public'));

function generateDataPoints(cm) {
  console.log("Generate Data Points Was Called!!!!");
  temp = [
    { y: 51.08, label: "Chrome" },
    { y: 27.34, label: "Internet Explorer" },
    { y: 10.62, label: "Firefox" },
    { y: 5.02, label: "Microsoft Edge" },
    { y: 4.07, label: "Safari" },
    { y: 1.22, label: "Opera" },
    { y: 0.44, label: "Others" },
  ];

  dataPoints = [];

  // total = 0;
  for (key of cm.keys()) {
    // console.log(
    //   `Category ${key} with ${cm.get(key).size} entries added to the data`
    // );

    s = cm.get(key).size;
    // if (s < 10) {
    //   total = total + s;
    // } else {
      o = new Object();
      o.y = s;
      o.label = key;
      dataPoints.push(o);
    // }
  }
  // o = new Object();
  // o.y = total;
  // o.label = "Other";
  // dataPoints.push(o);

  //return temp;
  return dataPoints;
}


function processDataForFrontEnd(req, res) {
  ////https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; // Enter the URL for the data you would like to retrieve here
  //const baseURL = 'https://data.princegeorgescountymd.gov/resource/weik-ttee.json'; // Enter the URL for the data you would like to retrieve here

  // Your Fetch API call starts here
  // Note that at no point do you "return" anything from this function -
  // it instead handles returning data to your front end at line 34.
    fetch(baseURL)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        const dataPointer = [];
        const categoryMap = new Map();
        
        /////////////////
        
          //console.log("Extra then statement");
          data.forEach((element) => {
            dataPointer.push(element);
          });

          data.forEach((element) => {
            category = element["category"];
            if (categoryMap.has(category)) {
              //add this element to the set for this category
              set = categoryMap.get(category);
              set.add(element);
            } else {
              //This set and therefore the category does not exist therefore I create the set and ad the element
              // Then add a new key value pair to the map
              set = new Set();
              set.add(element);
              categoryMap.set(category, set);
            }
          //console.log(`There are ${categoryMap.size} categories `);
        })

        for (key of categoryMap.keys()) {
          console.log(`Category ${key} has ${categoryMap.get(key).size} entries`);
        }
        preparedDataPoints = generateDataPoints(categoryMap);
        console.log(preparedDataPoints)
        ///////////////

        res.send({ data: preparedDataPoints }); // here's where we return data to the front end
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/error');
      });
}

// This is our first route on our server.
// To access it, we can use a "GET" request on the front end
// by typing in: localhost:3000/api or 127.0.0.1:3000/api
app.get('/api', (req, res) => {processDataForFrontEnd(req, res)});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
