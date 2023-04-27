const inputs = document.querySelectorAll("input");
const ui = document.querySelector("#INTERFACE");
const title = document.querySelector("#title");
const copyBoxShadowBtn = document.querySelector("#box-shadow");
const copyButtons = document.querySelectorAll(".group");

const finder = document.querySelector("#finder");
let finderState = { state: "unactive" };

const values = {
  // Default values
  boxShadow: {
    horizontal: 0,
    vertical: 0,
    blur: 24,
    spread: 0,
    color: `#00000000`,
    inset: ``,
  },
  gradient: {
    type: "linear",
    angle: 90,
    color1: ``,
    color1Position: 0,
    color2: ``,
    color2Position: 100,
  },
};
//# --------------------------------- Logic --------------------------------- */
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const id = input.id;
    const legend = document.querySelector(`legend[id="${id}"]`);
    legend.innerHTML = `${legend.getAttribute("id")} <b class="orange">${
      input.value
    }</b>`;
    switch (id) {
      // Box-shadow
      case "horizontal":
        values.boxShadow.horizontal = input.value;
        break;
      case "vertical":
        values.boxShadow.vertical = input.value;
        break;
      case "blur":
        values.boxShadow.blur = input.value;
        break;
      case "spread":
        values.boxShadow.spread = input.value;
        break;
      case "color":
        values.boxShadow.color = input.value;
        break;
      case "inset":
        if (values.boxShadow.inset == "inset") {
          values.boxShadow.inset = "";
          legend.innerHTML = `${legend.getAttribute("id")}`;
        } else {
          values.boxShadow.inset = "inset";
        }
        break;
      // End of box-shadow
      // Gradient
      case "radial":
        if (values.gradient.type == "radial") {
          values.gradient.type = "linear";
          legend.innerHTML = `${legend.getAttribute("id")}`;
        } else {
          values.gradient.type = "radial";
        }
        break;
      case "angle":
        values.gradient.angle = input.value;
        break;
      case "color1":
        values.gradient.color1 = input.value;
        break;
      case "color1Position":
        values.gradient.color1Position = input.value;
        legend.innerHTML = `<b class="orange">${input.value}</b>`;
        break;
      case "color2":
        values.gradient.color2 = input.value;
        break;
      case "color2Position":
        values.gradient.color2Position = input.value;
        legend.innerHTML = `<b class="orange">${input.value}</b>`;
        break;
    }
    setShadow();
    setGradient();
  });
});

//# Box shadow
function setShadow() {
  document.documentElement.style.setProperty(
    "--DTBoxShadow",
    `${values.boxShadow.horizontal}px ${values.boxShadow.vertical}px ${values.boxShadow.blur}px ${values.boxShadow.spread}px ${values.boxShadow.color} ${values.boxShadow.inset}`
  );
}
//# Gradient
function setGradient() {
  if (values.gradient.type == "radial") {
    document.documentElement.style.setProperty(
      "--DTGradient",
      `radial-gradient(circle, ${values.gradient.color1} ${values.gradient.color1Position}%, ${values.gradient.color2} ${values.gradient.color2Position}%)`
    );
  } else {
    document.documentElement.style.setProperty(
      "--DTGradient",
      `linear-gradient(${values.gradient.angle}deg, ${values.gradient.color1} ${values.gradient.color1Position}%, ${values.gradient.color2} ${values.gradient.color2Position}%)`
    );
  }
}
//? Copy buttons
copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let code = ``;
    if (btn.textContent == "Box-shadow") {
      code = `box-shadow: ${values.boxShadow.horizontal}px ${values.boxShadow.vertical}px ${values.boxShadow.blur}px ${values.boxShadow.spread}px ${values.boxShadow.color} ${values.boxShadow.inset};`;
    } else if (btn.textContent == "Gradient") {
      if (values.gradient.type == "radial") {
        code = `background-image: radial-gradient(circle, ${values.gradient.color1} ${values.gradient.color1Position}%, ${values.gradient.color2} ${values.gradient.color2Position}%)`;
      } else {
        code = `background-image: linear-gradient(${values.gradient.angle}deg, ${values.gradient.color1} ${values.gradient.color1Position}%, ${values.gradient.color2} ${values.gradient.color2Position}%)`;
      }
    }
    navigator.clipboard.writeText(code); // Clipboard
  });
});

//? Drag and drop
title.addEventListener("drag", (e) => {
  e.preventDefault();
  const dimensions = ui.getBoundingClientRect();
  if (e.pageX == 0) {
    return;
  }
  ui.style = `left: ${e.pageX - dimensions.width / 2}px; top:${e.pageY - 36}px`;
  ui.style.opacity = "0.2";
});
title.addEventListener("dragend", () => {
  ui.style.opacity = "1";
});

//# Experimental finder functionality
finder.addEventListener("click", () => {
  finderState.state = "active";

  if (finderState.state == "active") {
    document.addEventListener("mouseover", finderSearch);

    document.addEventListener("mouseout", (e) => {
      e.target.classList.remove("finding");
    });
  }
});
function finderSearch(e) {
  e.target.classList.add("finding");
  document.addEventListener("click", finderClicked);
}
function finderClicked(e) {
  finderState.state = "unactive";
  const targetClicked = e.target;
  targetClicked.style = `box-shadow: var(--DTBoxShadow); background-image: var(--DTGradient);`; //# Add Styles
  document.removeEventListener("mouseover", finderSearch);
  document.removeEventListener("click", finderClicked);
}
