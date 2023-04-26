const inputs = document.querySelectorAll("input");
const ui = document.querySelector("#INTERFACE");
const title = document.querySelector("#title");
const copyBoxShadowBtn = document.querySelector("#box-shadow");

const values = {
  // Default values
  boxShadow: {
    horizontal: 0,
    vertical: 0,
    blur: 24,
    spread: 0,
    color: `#00000050`,
    inset: ``,
  },
};
/* --------------------------------- Logic --------------------------------- */

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
    }
    setShadow();
  });
});

//# Box shadow
function setShadow() {
  document.documentElement.style.setProperty(
    "--DTBoxShadow",
    `${values.boxShadow.horizontal}px ${values.boxShadow.vertical}px ${values.boxShadow.blur}px ${values.boxShadow.spread}px ${values.boxShadow.color} ${values.boxShadow.inset}`
  );
}
//? Copy button
copyBoxShadowBtn.addEventListener("click", () => {
  const code = `box-shadow: ${values.boxShadow.horizontal}px ${values.boxShadow.vertical}px ${values.boxShadow.blur}px ${values.boxShadow.spread}px ${values.boxShadow.color} ${values.boxShadow.inset};`;
  navigator.clipboard.writeText(code); // Clipboard
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
