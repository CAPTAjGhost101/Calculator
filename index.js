const buttons = document.querySelectorAll("section button");
const display = document.getElementById("display");

let currentInput = "";

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    const value = this.getAttribute("data-value");

    if (value === "Cut") {
      // Remove last character
      currentInput = currentInput.slice(0, -1);

      // If empty, show 0
      if (currentInput === "") {
        display.innerText = "0";
      } else {
        display.innerText = currentInput;
      }
    } else if (value === "C") {
      // Clear everything
      currentInput = "";
      display.innerText = "0";
    } else if (value === "=") {
      try {
        const expression = currentInput.replace(/X/g, "*"); // Handle "X" as "*"
        const result = eval(expression);
        currentInput = result.toString();
        display.innerText = currentInput;
      } catch {
        display.innerText = "Error";
        currentInput = "";
      }
    } else {
      // Add value to input
      currentInput += value;
      display.innerText = currentInput;
    }
  });
}
