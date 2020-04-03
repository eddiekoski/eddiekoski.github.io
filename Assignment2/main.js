const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Looping through images */

let text = "";
let credits = [
  "Photo 1 by Klara Kulikova on Unsplash",
  "Photo 2 by Tandem X Visuals on Unsplash",
  "Photo 3 by Lucas Ludwig on Unsplash",
  "Photo 4 by Viktor Nikolaienko on Unsplash",
  "Photo 5 by Meritt Thomas on Unsplash"
];
console.log(credits);
console.log(credits.length);

for (i = 1; i <= 5; i++) {
  text = "images/pic" + i + ".jpg";
  console.log(text);
  const newImage = document.createElement("img");
  newImage.setAttribute("src", text);
  newImage.setAttribute("text", credits[i - 1]);
  thumbBar.appendChild(newImage);

  //https://developer.mozilla.org/en-US/docs/Web/API/Event/target
  //Some useful tips
  newImage.addEventListener("click", function(e) {
    displayedImage.setAttribute("src", e.target.src);
  });
}

// const newImage = document.createElement('img');
// newImage.setAttribute('src', xxx);
// thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
btn.onclick = function() {
  const btnClass = btn.getAttribute("class");
  if (btnClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
};
