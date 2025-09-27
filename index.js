let imageGradientSection = document.getElementById("gradient-container");
let getColorBtn = document.getElementById("get-color-btn");
let gradientNames = document.getElementById("gradient-names");
let gradientNamesHTML = [];
let gradientHTML = [];

// Render color f(x)
//dogshit code, shud refractor
function renderColor() {
  let colorHTML = "";
  let rgbHTML = "";

  gradientHTML.forEach((color) => {
    colorHTML += color;
  });

  gradientNamesHTML.forEach((hexValue) => {
    rgbHTML += hexValue;
  });

  gradientNames.innerHTML = rgbHTML;
  imageGradientSection.innerHTML = colorHTML;
}

//Initial placeholder render
fetch(
  "https://www.thecolorapi.com/scheme?hex=F55A5A&format=JSON&mode=monochrome",
  {
    method: "GET",
  }
)
  .then((response) => response.json())
  .then((data) => {
    data.colors.forEach((color) => {
      let rgb = color.rgb.value;

      gradientHTML.push(
        `<div class="gradient-element" style="background-color: ${rgb}"></div>`
      );

      gradientNamesHTML.push(`<p>${color.hex.value}</p>`);
    });

    renderColor();
  });

// Get Color Scheme BTN
getColorBtn.addEventListener("click", (event) => {
  let selectedColor = document.getElementById("root-color").value.slice(1);
  let selectedScheme = document
    .getElementById("scheme-dropdown")
    .value.toLowerCase();

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor}&format=JSON&mode=${selectedScheme}`,
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

        gradientNamesHTML.push(`<p>${color.hex.value}</p>`);
      });
    });

  renderColor();
});
