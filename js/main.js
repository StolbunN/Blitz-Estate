// Создание карточек

let countCards = 1;

function createCard(cardData) {
  document.querySelector(".apartments__cards").insertAdjacentHTML(
    "beforeend",
    `
<div class="col-md-6 d-flex">
            <div class="apartments__card card" data-card-price="${
              cardData[countCards - 1].dataPrice
            }">
              <img
                src="${cardData[countCards - 1].cardImg}"
                class="apartments__card-img card-img-top"
                alt="апартаменты"
              />
              <div class="apartments__card-content card-body">
                <h5
                  class="apartments__card-title title-3 card-title d-inline-block"
                >
                  ${cardData[countCards - 1].cardTitle}
                </h5>
                <p class="apartments__card-lot">Лот № ${
                  cardData[countCards - 1].cardLot
                }</p>
                <div class="apartments__card-info card-info">
                  <p class="card-info__price">${
                    cardData[countCards - 1].price
                  } ₽</p>
                  <p class="card-info__square">Площадь ${
                    cardData[countCards - 1].square
                  } м<sup>2</sup></p>
                  <p class="card-info__price-meter">${
                    cardData[countCards - 1].priceMeter
                  } ₽ за м<sup>2</sup></p>
                  <p class="card-info__floor">Этаж ${
                    cardData[countCards - 1].floor
                  }</p>
                </div>
              </div>
              <a href="#" class="apartments__card-btn btn"
                >Назначить просмотр</a
              >
            </div>
          </div>
`
  );
}

// Вызов карточек

function callCards() {
  fetch("../data/cardsData.json")
    .then((res) => res.json())
    .then((cardData) => {
      for (
        ;
        countCards % 10 != 0 && countCards < cardData.length;
        countCards++
      ) {
        createCard(cardData);
      }
      createCard(cardData);
      countCards++;
      // Скрытие кнопки "показать ещё"
      // if (countCards >= cardData.length) {
      //   document
      //     .querySelector(".apartments__button")
      //     .classList.add("card__hidden");
      // }
    });
}

callCards();

// Фильтрация апартаментов по стоимости
const aprtBtns = document.querySelectorAll(".apartments__btn");
const aprtBtnsPrices = document.querySelector(".apartments__btns-prices");
const aprtCard = document.getElementsByClassName("apartments__card");

aprtBtnsPrices.addEventListener("click", function (e) {
  e.preventDefault();

  const clicked = e.target;

  aprtBtns.forEach((btn) => btn.classList.remove("apartments__btn-active"));
  clicked.classList.add("apartments__btn-active");

  if (clicked.dataset.btnPrice === "all") {
    Array.from(aprtCard).forEach((card) =>
      card.parentElement.classList.remove("card__hidden")
    );
  } else {
    Array.from(aprtCard).forEach((card) => {
      card.parentElement.classList.remove("card__hidden");
      if (clicked.dataset.btnPrice !== card.dataset.cardPrice) {
        card.parentElement.classList.add("card__hidden");
      }
    });
  }
});

// Кнопка "Показать ещё" в секции апартаментов

document.querySelector(".apartments__button").addEventListener("click", (e) => {
  e.preventDefault();
  callCards();
});

// Слайдер
$(document).ready(function () {
  $(".slider-big").slick({
    arrows: false,
    fade: true,
    asNavFor: ".slider-small",
  });

  $(".slider-small").slick({
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnFocus: true,
    pauseOnHover: true,
    asNavFor: ".slider-big",
  });
});

// вопросы
const questions = document.querySelector(".quiz__question");
const questionContent = document.querySelectorAll(".question");
const counterBtn = document.querySelector(".counter__btn");
const count = document.querySelector(".count");
const finalSlide = document.querySelector(".question.question-final");

let currentQuestion = 0;

// отображение слайдов
function goToQuestion(currQuestion) {
  questionContent.forEach((question, i) => {
    question.style.transform = `translateX(${(i - currQuestion) * 100}%)`;
  });
}

goToQuestion(0);

// Выбор одного варианта ответа
let answers;
let containsAnswer;

function selectAnswer(currQuestion) {
  answers = document.querySelectorAll(
    `.question-${currQuestion + 1} .question__card`
  );

  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      e.preventDefault();

      containsAnswer = Array.from(answers).some((a) =>
        a.classList.contains("answer")
      );

      if (containsAnswer) {
        answers.forEach((a) => a.classList.remove("answer"));
      }

      const clicked = e.target.closest(".question__card");

      clicked.classList.add("answer");
    });
  });
}

selectAnswer(currentQuestion);

counterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  containsAnswer = Array.from(answers).some((a) =>
    a.classList.contains("answer")
  );

  if (!containsAnswer) return;

  currentQuestion++;

  goToQuestion(currentQuestion);
  selectAnswer(currentQuestion);

  count.textContent = currentQuestion;

  if (currentQuestion === 5) {
    finalSlide.style.transform = `translate(-50%)`;
    finalSlide.style.textAlign = "center";
    counterBtn.style.display = "none";
  }
});
