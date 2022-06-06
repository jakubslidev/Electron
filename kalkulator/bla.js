(function () {
  "use strict";

  var el = function (element) {
    if (element.charAt(0) === "#") {
      //Jeżeli cokolwiek kliknięte
      return document.querySelector(element); //... zwraca pojedyńczy element
    }
    return document.querySelectorAll(element); //... zwraca kilka elementow
  };

  var currentScreen = el("#current-score"),
    equals = el("#equals"),
    numbers = el(".number"),
    operations = el(".operation"),
    currentNum = "",
    prevNum = "",
    resultNum,
    operator;

  // Wybranie cyfry
  var getNumber = function () {
    if (resultNum) {
      currentNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      currentNum += this.getAttribute("data-num");
    }
    currentScreen.innerHTML = currentNum;
  };

  var moveNum = function () {
    prevNum = currentNum;
    currentNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "");
  };

  var displayNum = function () {
    prevNum = parseInt(prevNum);
    currentNum = parseInt(currentNum);

    //Operacje

    switch (operator) {
      case "plus":
        resultNum = prevNum + currentNum;
        break;

      case "minus":
        resultNum = prevNum - currentNum;
        break;

      case "multiplication":
        resultNum = prevNum * currentNum;
        break;

      case "division":
        resultNum = prevNum / currentNum;
        break;

      //Rowna sie bez operatora
      default:
        resultNum = currentNum;
    }

    currentScreen.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    prevNum = 0;
    currentNum = resultNum;
  };

  var sqrRoot = function () {
    currentNum = Math.sqrt(currentNum);
    currentScreen.innerHTML = currentNum;
    // if (currentNum % 1 === 0) {
    //   currentScreen.innerHTML = currentNum;
    // } else {
    //   currentScreen.innerHTML = "rational number";
    // }
    //sprawdzenie czy jest to liczba wymierna czy calkowita
  };

  var delNum = function () {
    let a = currentNum;
    a = a.substring(0, a.length - 1);
    Number(a);
    if (a) {
      currentNum = a;
      currentScreen.innerHTML = currentNum;
    } else {
      prevNum = "";
      currentNum = "";
      currentScreen.innerHTML = "0";
    }
  };

  var clearScreen = function () {
    prevNum = "";
    currentNum = "";
    currentScreen.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = getNumber;
  }

  for (let i = 0; i < operations.length; i++) {
    operations[i].onclick = moveNum;
  }

  el("#sqrRoot").onclick = sqrRoot;

  el("#del").onclick = delNum;

  equals.onclick = displayNum;

  el("#clear").onclick = clearScreen;
})();
