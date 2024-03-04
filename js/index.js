import { Column } from "./matrix-column.js";

let rotation = 0;
let lastScrollPosition = 0;
const linkWorks = document.getElementById("link-works");
const workBox = document.querySelector(".example-box__wrapper");
const myWork = document.querySelector(".my-work-example-box");
// when push the link works its make block whith works appierens
linkWorks.addEventListener("click", () => {
  if (workBox.classList.contains("my-works-put-forward")) {
    workBox.classList.remove("my-works-put-forward");
  }
});

function updateRotation(scrollPosition) {
  // Calculate the delta scroll position
  const delta = scrollPosition - lastScrollPosition;

  // Update the rotation based on the delta
  rotation += delta * 0.1; // Adjust the factor for desired rotation speed

  // Apply rotation to the gear element
  const gearElement = document.querySelector(".main__gear-svg");
  if (gearElement) {
    gearElement.style.transform = `rotate(${rotation}deg)`;
  }

  // Update last scroll position
  lastScrollPosition = scrollPosition;
}
function putForwardMyWorks(scrollPosition) {
  const workBox = document.querySelector(".example-box__wrapper");
  if (workBox) {
    workBox.classList.add("my-works-put-forward");
  }
}
function appearanceWorkTittle() {
  const myWork = document.querySelector(".my-work-example-box");
  if (myWork) {
    myWork.classList.add("work-tittlw-appearance");
  }
}

const navFirst = document.querySelector(".first-nav");
const navMenuFixed = document.querySelector(".nav-menu-fixed");

window.addEventListener("scroll",  () => {
  const scrollPosition = window.scrollY;
  const mainServices = document.querySelector(".main__services");
  if (scrollPosition > 100) {
    navFirst.style.display = "none";
    navMenuFixed.classList.remove('hidden');
  }
  else {
    if(scrollPosition === 0) {
      navFirst.style.display = "flex";
      navMenuFixed.classList.add('hidden');
    }
  } 
  window.requestAnimationFrame(() => {
    updateRotation(scrollPosition);
    appearanceWorkTittle();
    putForwardMyWorks(scrollPosition);
  });
});

// FOOTER FORM

const form = document.querySelector("form");
const url = "https://psychologybackend.pythonanywhere.com/";
const divResponse = document.querySelector(".response");
async function sendPostRequest(url, data) {
  divResponse.textContent = "Loading...";
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    divResponse.textContent = responseData["message"];
    // Установка таймера для исчезновения сообщения через пару секунд
    setTimeout(() => {
      divResponse.textContent = "";
    }, 4000);
    return responseData;
  } catch (error) {
    console.error("Произошла ошибка:", error);
    throw error;
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {};

  const inputs = event.target.querySelectorAll("input");
  const textArea = event.target.querySelector("textarea");

  inputs.forEach((element) => {
    formData[element.id] = element.value;
  });
  if (textArea.value) {
    formData["text"] = textArea.value;
    // Вызов функции для выполнения POST-запроса
    sendPostRequest(url, formData)
      .then((data) => {
        console.log("Успешный ответ:", data);
        // Здесь вы можете обрабатывать успешный ответ
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        // Здесь вы можете обрабатывать ошибки запроса
      });
  } else {
    formData["text"] = "";
    // Вызов функции для выполнения POST-запроса
    sendPostRequest(url, formData)
      .then((data) => {
        console.log("Успешный ответ:", data);
        // Здесь вы можете обрабатывать успешный ответ
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        // Здесь вы можете обрабатывать ошибки запроса
      });
  }
});

// LOGO LOGIC
const text = "Vlad Mozdzer";

const element = document.querySelector(".logo__text");
let i = 0;

const interval = setInterval(() => {
  element.textContent += text[i];
  i++;
  if (i > text.length) {
    i = 0; // Сброс индекса после завершения текста
    element.textContent = "";
  }
}, 200); // 50 мс между буквами

// MATRIX-BG
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FONT_SIZE = 16;
const columns = [];
const colimnsCount = canvas.width / FONT_SIZE;
for (let i = 0; i < colimnsCount; i++) {
  columns.push(new Column(i * FONT_SIZE, FONT_SIZE, canvas.height, context));
}

context.font = `bold ${FONT_SIZE}px monospace`;

const column = new Column(100, FONT_SIZE, canvas.height, context);

function animate() {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "green";
  columns.forEach((colum) => colum.drawSymbol());

  setTimeout(() => requestAnimationFrame(animate), 50);
}
animate();

//HEADER LOAD DOT
const header = document.querySelector("header");
const dot = document.createElement("div");
const menu = document.querySelector(".home__menu-logo-box");

dot.style.position = "absolute";
dot.style.top = "80px";
dot.style.left = "80px";
dot.style.width = "10px";
dot.style.height = "10px";
dot.style.borderRadius = "50%";
dot.style.backgroundColor = "green";

const keyframes = document.createTextNode(`
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`);

document.head.appendChild(keyframes);

dot.style.animation = "blink 1s infinite";

// WHEN HEADER ANIMATION IS END
const main = document.querySelector("main");
header.addEventListener("animationend", () => {
  header.appendChild(dot);

  setTimeout(() => {
    dot.style.opacity = 0; // Сделать точку невидимой
  }, 500); // Задержка 500 мс (время первого мигания)

  setTimeout(() => {
    dot.style.opacity = 1; // Сделать точку видимой
  }, 1000); // Задержка 1000 мс (время паузы между миганиями)

  setTimeout(() => {
    dot.style.opacity = 0; // Сделать точку невидимой
  }, 1500); // Задержка 1500 мс (время второго мигания)

  // SHOW HEADER MENU
  setTimeout(() => {
    dot.remove();
    menu.style.display = "flex";
    menu.style.justifyContent = "space-between";
  }, 2000); // Задержка 2000 мс (время до отображения меню)
  header.style.position = "relative";
  main.style.display = "flex";
  main.style.flexDirection = "column";
});

// SERVICES BTN
const serviseBtns = document.querySelectorAll(".btn-box__btn");

serviseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) {
      return; // Exit early if button is disabled
    }

    btn.classList.add("disabled");

    const cardBox = btn.closest(".services__servis-box");
    const cardText = cardBox.querySelector(".servis-box__text");
    const img = btn.querySelector(".btn__img");
    const line = img.querySelectorAll(".line");

    if (
      !img.classList.contains("r-right") &&
      !img.classList.contains("r-left")
    ) {
      img.classList.add("r-right");
      changeOnWhiteCross(line, btn);
      wordDisappearance(cardText);
      setTimeout(() => {
        btn.classList.remove("disabled");
        console.log(`.remove("disabled")`);
      }, 400); // Adjust timeout as needed
      return;
    }

    if (img.classList.contains("r-right")) {
      img.classList.remove("r-right");
      img.classList.add("r-left");
      changeOnBlackCross(line, btn);
      setTimeout(() => {
        wordAppear(cardText);
        btn.classList.remove("disabled");
        console.log(`.remove("disabled")`);
      }, 1600); // Adjust timeout as needed
      return;
    }

    if (img.classList.contains("r-left")) {
      img.classList.remove("r-left");
      img.classList.add("r-right");
      changeOnWhiteCross(line, btn);
      wordDisappearance(cardText);
      setTimeout(() => {
        btn.classList.remove("disabled");
        console.log(`.remove("disabled")`);
      }, 500); // Adjust timeout as needed
      return;
    }
  });
});

function changeOnWhiteCross(line, btn) {
  line.forEach((item) => {
    item.classList.remove("cls-1");
    item.classList.add("cls-2");
  });
  btn.style.transition = "background-color 0.5s  ease-in-out";
  btn.style.background = "black";
  const cardBox = btn.closest(".services__servis-box");
  const img = cardBox.querySelector(".servis-box__pic");
  img.classList.remove("hidden");
  const cardText = cardBox.querySelector(".servis-box__text");
  cardText.style.position = "absolute";
  cardText.style.top = "50%";
}
function changeOnBlackCross(line, btn) {
  line.forEach((item) => {
    item.classList.remove("cls-2");
    item.classList.add("cls-1");
  });
  btn.style.transition = "background-color 0.1s ease-in-out";
  btn.style.background = "transparent";
  const cardBox = btn.closest(".services__servis-box");
  const img = cardBox.querySelector(".servis-box__pic");
  // img.classList.add("hidden");

  img.classList.add("fading"); // Сначала убрать "hidden"

  setTimeout(() => {
    img.classList.add("hidden"); // Добавить "fading" для анимации
  }, 1100); // Задержка 1.1 секунда

  setTimeout(() => {
    img.classList.remove("fading"); // Убрать "fading" после анимации
  }, 2100);
}
function wordDisappearance(word) {
  if (word.classList.contains("appear-word")) {
    word.classList.remove("appear-word");
    word.classList.add("disappearing-word");
  }
  word.classList.add("disappearing-word");
}
function wordAppear(word) {
  if (word.classList.contains("disappearing-word")) {
    word.classList.remove("disappearing-word");
    word.classList.add(".appear-word");
  }
  word.classList.add(".appear-word");
}
// footer text run
const footerText = document.querySelector(".footer__run-text");
setTimeout(() => {
  footerText.classList.add("run");
}, 5000);
