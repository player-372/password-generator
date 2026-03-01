function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max + 1); // +1 for including max
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

let chosenSymbols = [];

let generateButton = document.querySelector("#generate-button");
let copyButton = document.querySelector("#copy-button");
let output = document.querySelector("#output");

let lowercaseCheckbox = document.querySelector("#lowercase-checkbox");
let uppercaseCheckbox = document.querySelector("#uppercase-checkbox");
let numbersCheckbox = document.querySelector("#numbers-checkbox");
let specialCheckbox = document.querySelector("#special-checkbox");
let lengthRange = document.querySelector("#length-range");

let lengthIndicator = document.querySelector("#length-indicator");
let strengthIndicator = document.querySelector("#strength-indicator");

let notification = document.querySelector("#notification");

let changeThemeButton = document.querySelector("#change-theme-button");


function getRandomLowercase() {
  let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  let randomId = getRandomInt(0, 24);
  return lowercaseLetters[randomId];
}

function getRandomUppercase() {
  let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomId = getRandomInt(0, 24);
  return uppercaseLetters[randomId];
}

function getRandomNumber() {
  return getRandomInt(0, 9);
}

function getRandomSpecial() {
  let specailSymbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let randomId = getRandomInt(0, 7);
  return specailSymbols[randomId];
}


function chooseSymbol() {
  chosenSymbols = [];

  if (lowercaseCheckbox.checked == true) {
    chosenSymbols.push("lowercase");
  }


  if (uppercaseCheckbox.checked == true) {
    chosenSymbols.push("uppercase");
  }


  if (numbersCheckbox.checked == true) {
    chosenSymbols.push("numbers");
  }


  if (specialCheckbox.checked == true) {
    chosenSymbols.push("special");
  }


  let symbolId = getRandomInt(0, chosenSymbols.length - 1);


  if (chosenSymbols[symbolId] == "lowercase") {
    return getRandomLowercase();
  }


  if (chosenSymbols[symbolId] == "uppercase") {
    return getRandomUppercase();
  }


  if (chosenSymbols[symbolId] == "numbers") {
    return getRandomNumber();
  }


  if (chosenSymbols[symbolId] == "special") {
    return getRandomSpecial();
  }

  if (chosenSymbols[symbolId] == undefined) {
    return "";
  }

}


function checkStrength() {
  let strength = (Number(lengthRange.value)) + (chosenSymbols.length - 1);

  if (strength < 12) {
    strengthIndicator.style.backgroundColor = "#FF6969";
    strengthIndicator.textContent = "Слабый";
    strengthIndicator.style.boxShadow = "none"
  }

  if (strength >= 12) {
    strengthIndicator.style.backgroundColor = "#FFB469";
    strengthIndicator.textContent = "Средний";
    strengthIndicator.style.boxShadow = "none"
  }

  if (strength >= 16) {
    strengthIndicator.style.backgroundColor = "#69FF69";
    strengthIndicator.textContent = "Сильный";
    strengthIndicator.style.boxShadow = "none"
  }
  
  if (strength >= 24) {
    strengthIndicator.style.backgroundColor = "#69FF69";
    strengthIndicator.textContent = "Очень Сильный";
    strengthIndicator.style.boxShadow = "0px 0px 15px 5px rgba(105, 255, 105, 0.8)"
  }
}


function generatePassword() {
  let count = 0;
  let password = "";

  while (count < lengthRange.value) {
    password = password + chooseSymbol();
    count++;
  }


  if (password != "") {
    output.value = password;
    checkStrength();
  }

  if (password == "") {
    output.value = "Выберите хотя бы один пункт!";
  }
}


function copyPassword() {
  navigator.clipboard.writeText(output.value);

  notification.style.top = "0px";

  setTimeout(function () {
    notification.style.top = "-50px";
  }, 2000);
}





generatePassword();

lengthRange.addEventListener("input", function () {
  lengthIndicator.textContent = lengthRange.value;
});


lengthRange.addEventListener("input", generatePassword);

lowercaseCheckbox.addEventListener("input", generatePassword);

uppercaseCheckbox.addEventListener("input", generatePassword);

numbersCheckbox.addEventListener("input", generatePassword);

specialCheckbox.addEventListener("input", generatePassword);


generateButton.addEventListener("click", generatePassword);

copyButton.addEventListener("click", copyPassword);


let isDark = !window.matchMedia('(prefers-color-scheme: dark)').matches;

function changeTheme() {
  isDark = !isDark;

  if (isDark) {
    changeThemeButton.style.backgroundColor = "#fff";
    changeThemeButton.textContent = "🔆";
    document.body.style.backgroundColor = "#242424";
    document.querySelector(".box").style.boxShadow = "5px 5px 15px rgba(255, 255, 255, 0.5)";
  }
  else {
    changeThemeButton.style.backgroundColor = "#242424";
    changeThemeButton.textContent = "🌙";
    document.body.style.backgroundColor = "#fff";
    document.querySelector(".box").style.boxShadow = "5px 5px 10px #696969";
  }
}


changeThemeButton.addEventListener('click', changeTheme);

changeTheme();
