let imageGradientSection = document.getElementById("gradient-container");
let getColorBtn = document.getElementById("get-color-btn");
let gradientNames = document.getElementById("gradient-names");
let gradientNamesHTML = [];
let gradientHTML = [];

function renderColor() {
  let html = "";

  gradientHTML.forEach((color) => {
    html += color;
  });

  imageGradientSection.innerHTML = html;
}

// in the past jwang:
// i was trying to fix the placeholder color stuff but it isn't showing up right

// Render placeholder colors
fetch("https://www.thecolorapi.com/scheme?hex=F55A5A&format=JSON&mode=triad", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    data.colors.forEach((color) => {
      let rgb = color.rgb.value;

      gradientHTML.push(
        `<div class="gradient-element" style="background-color: ${rgb}"></div>`
      );

      gradientNames.innerHTML += `
          <p>${color.hex.value}</p>
        `;
    });

    renderColor();
  });

// Button f, for rendering new colors
getColorBtn.addEventListener("click", (event) => {
  let selectedColor = document.getElementById("root-color").value.slice(1);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&format=JSON&mode=triad`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      gradientHTML = [];
      gradientNamesHTML = [];

      data.colors.forEach((color) => {
        let rgb = color.rgb.value;

        gradientHTML.push(
          `<div class="gradient-element" style="background-color: ${rgb}"></div>`
        );

        gradientNames.innerHTML.push(`<p>${color.hex.value}</p>`);
      });
    });

  renderColor();
});
