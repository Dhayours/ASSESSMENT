// script.js
let display = document.getElementById("display");
let historyLog = document.getElementById("history-log");
let currentExpression = "";
let history = [];

function calculate() {
  try {
    let result = eval(
      currentExpression
        .replace("×", "*")
        .replace("÷", "/")
        .replace("^", "**")
        .replace("%", "/100")
    );
    history.push(`${currentExpression} = ${result}`);
    historyLog.innerHTML = history.map((item) => `<p>${item}</p>`).join("");
    display.value = result;
    currentExpression = result.toString();
  } catch (error) {
    display.value = "Error";
    currentExpression = "";
  }
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "clear") {
      currentExpression = "";
      display.value = "";
    } else if (button.id === "delete") {
      currentExpression = currentExpression.slice(0, -1);
      display.value = currentExpression;
    } else if (button.id === "equals") {
      calculate();
    } else {
      currentExpression += button.textContent;
      display.value = currentExpression;
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace" || e.key === "Delete") {
    currentExpression = currentExpression.slice(0, -1);
    display.value = currentExpression;
  } else if (e.key.toLowerCase() === "c") {
    currentExpression = "";
    display.value = "";
  } else if (
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
