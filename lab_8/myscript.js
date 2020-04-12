function generateDataPoints(cm) {
  console.log("Generate Data Points Was Called!!!!");
  temp = [
    { y: 3, label: "Sweden" },
    { y: 7, label: "Taiwan" },
    { y: 5, label: "Russia" },
    { y: 9, label: "Spain" },
    { y: 7, label: "Brazil" },
    { y: 7, label: "India" },
    { y: 9, label: "Italy" },
    { y: 8, label: "Australia" },
    { y: 11, label: "Canada" },
    { y: 15, label: "South Korea" },
    { y: 12, label: "Netherlands" },
    { y: 15, label: "Switzerland" },
    { y: 25, label: "Britain" },
    { y: 28, label: "Germany" },
    { y: 29, label: "France" },
    { y: 52, label: "Japan" },
    { y: 103, label: "China" },
    { y: 134, label: "US" },
  ];

  dataPoints = [];

  total = 0;
  for (key of cm.keys()) {
    console.log(
      `Category ${key} with ${cm.get(key).size} entries added to the data`
    );

    s = cm.get(key).size;
    if (s < 10) {
      total = total + s;
    } else {
      o = new Object();
      o.y = s;
      o.label = key;
      dataPoints.push(o);
    }
  }
  o = new Object();
  o.y = total;
  o.label = "Other";
  dataPoints.push(o);

  //return temp;
  return dataPoints;
}
