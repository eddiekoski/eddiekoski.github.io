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
    console.log(
      `Category ${key} with ${cm.get(key).size} entries added to the data`
    );

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
