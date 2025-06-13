// script.js
// Get display and history log elements
let display = document.getElementById("display");
let historyLog = document.getElementById("history-log");
// Initialize current expression and history
let currentExpression = "";
let history = [];

// Calculate function to evaluate the expression
function calculate() {
  try {
    // Replace symbols and evaluate the expression
    let result = eval(
      currentExpression
        .replace("×", "*")
        .replace("÷", "/")
        .replace("^", "**")
        .replace("%", "/100")
    );
    // Add to history and update display
    history.push(`${currentExpression} = ${result}`);
    historyLog.innerHTML = history.map((item) => `<p>${item}</p>`).join("");
    display.value = result;
    currentExpression = result.toString();
  } catch (error) {
    // Handle errors
    display.value = "Error";
    currentExpression = "";
  }
}

// Add event listeners to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    // Clear button
    if (button.id === "clear") {
      currentExpression = "";
      display.value = "";
    } 
    // Delete button (backspace)
    else if (button.id === "delete") {
      currentExpression = currentExpression.slice(0, -1);
      display.value = currentExpression;
    } 
    // Equals button
    else if (button.id === "equals") {
      calculate();
    } 
    // Number and operator buttons
    else {
      currentExpression += button.textContent;
      display.value = currentExpression;
    }
  });
});

// Add event listener for keyboard input
document.addEventListener("keydown", (e) => {
  // Enter key (calculate)
  if (e.key === "Enter") {
    calculate();
  } 
  // Backspace or Delete key
  else if (e.key === "Backspace" || e.key === "Delete") {
    currentExpression = currentExpression.slice(0, -1);
    display.value = currentExpression;
  } 
  // C key (clear)
  else if (e.key.toLowerCase() === "c") {
    currentExpression = "";
    display.value = "";
  } 
  // Number and operator keys
  else if (
    [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "/",
      ".",
      "^",
      "%",
    ].includes(e.key)
  ) {
    // Replace * and / with × and ÷
    if (e.key === "*") {
      currentExpression += "×";
    } else if (e.key === "/") {
      currentExpression += "÷";
    } else {
      currentExpression += e.key;
    }
    display.value = currentExpression;
  }
});