import * as images from "./images/*.jpeg";

document.addEventListener("DOMContentLoaded", () => {
  let pair = [];
  let combos = 0;
  console.log("loaded");
  const fruits = Object.entries(images)
    .map(([key, value]) => ({
      name: key,
      path: value,
    }))
    .filter((fruit) => {
      if (fruit.name == "white" || fruit.name == "default") {
        return false;
      }
      return true;
    });
  console.log(fruits);
  const container = document.querySelector(".container");

  const checkforMatch = () => {
    console.log("checkforMatch");
    let id1 = pair[0].getAttribute("data-id") % 8,
      id2 = pair[1].getAttribute("data-id") % 8;
    console.log(`id1 = ${id1}, id2 = ${id2}`);
    if (id1 === id2) {
      combos++;
      if (combos === 8) {
        combos = 0;
        pair = [];
        alert("You won");
      }
    } else {
      pair.forEach((card) => {
        setTimeout(() => {
          card.classList.toggle("element");
        }, 1000);
        card.classList.toggle("element");
        card.src = images["white"];
        card.style.pointerEvents = "auto";
      });
    }
    pair = [];
  };
  const flipCard = (e) => {
    const card = e.target;
    let id = parseInt(card.getAttribute("data-id"));
    card.src = fruits[id % 8].path;
    console.log("Image added for card " + id);
    pair.push(card);
    card.style.pointerEvents = "none";
    if (pair.length > 1)
      setTimeout(() => {
        checkforMatch();
      }, 500);
  };

  const createImg = (id, className, src) => {
    const imgElement = document.createElement("img");
    imgElement.classList.add(className);
    imgElement.setAttribute("data-id", id);
    imgElement.src = src;
    return imgElement;
  };
  const createCard = (id) => {
    const card = createImg(id, "card", images["white"]);
    card.addEventListener("click", flipCard);
    return card;
  };

  const createBoard = () => {
    const numbers = [...Array(fruits.length * 2).keys()];
    numbers.sort(() => 0.5 - Math.random());
    numbers.forEach((i) => {
      const card = createCard(i);
      container.appendChild(card);
    });
  };

  createBoard();
});
