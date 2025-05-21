const buttons = document.querySelectorAll("section button");
const display = document.getElementById("display");

// Audio files
const beepSound = new Audio("./Assets/calculator-button.mp3");
const resultSound = new Audio("./Assets/result.mp3");

let currentInput = "";

// Calculator logic
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.getAttribute("data-value");

    // Play appropriate sound
    if (value === "=") {
      resultSound.currentTime = 0;
      resultSound.play();
    } else {
      beepSound.currentTime = 0;
      beepSound.play();
    }

    if (value === "Cut") {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput === "" ? "0" : currentInput;
    } else if (value === "C") {
      currentInput = "";
      display.innerText = "0";
    } else if (value === "=") {
      try {
        const expression = currentInput.replace(/X/g, "*");
        const result = eval(expression);
        currentInput = result.toString();
        display.innerText = currentInput;
      } catch {
        display.innerText = "Error";
        currentInput = "";
      }
    } else {
      currentInput += value;
      display.innerText = currentInput;
    }
  });
});

// Ripple effect
let ignoreMouse = false;

buttons.forEach((button) => {
  function createRipple(e) {
    if (e.type === "mousedown" && ignoreMouse) return;
    if (e.type === "touchstart") ignoreMouse = true;
    setTimeout(() => (ignoreMouse = false), 500);

    const ripple = document.createElement("div");
    ripple.classList.add("ripple");

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    let x, y;
    if (e.touches) {
      const touch = e.touches[0];
      x = touch.clientX - rect.left - size / 2;
      y = touch.clientY - rect.top - size / 2;
    } else {
      x = e.clientX - rect.left - size / 2;
      y = e.clientY - rect.top - size / 2;
    }

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }

  button.addEventListener("mousedown", createRipple);
  button.addEventListener("touchstart", createRipple);
});
