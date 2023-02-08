const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const closeBtn = document.getElementById('close');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

const state = {
  activeIndex: -1,
  elements: [],
}

class CardItem {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.element = document.createElement('div');
    this.initClass();
    this.element.addEventListener(
      'click',
      () => this.toggleClass('show-answer'),
    );

    this.render();
  }

  initClass() {
    this.setClass('card');
  }

  addClass(name) {
    this.element.classList.add(name);
  }

  removeClass(name) {
    this.element.classList.remove(name);
  }

  toggleClass(name) {
    this.element.classList.toggle(name);
  }

  setClass(name){
    this.element.className = name;
  }

  render() {
    this.element.innerHTML = `
      <div class="inner-card">
        <div class="inner-card-front">
          <p>
            ${this.question}
          </p>
        </div>
        <div class="inner-card-back">
          <p>
            ${this.answer}
          </p>
        </div>
      </div>
    `;
  }

  toJSON() {
    return {
      question: this.question,
      answer: this.answer, 
    }
  }
}

function initCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  createCards(cards === null ? [] : cards);
}

function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
}

function createCards(cards) {
  state.elements = cards.map((data, index) => (
     new CardItem(data.question, data.answer)
  ));

  state.activeIndex = 0;
  render();
}

function render() {
  cardsContainer.innerHTML = '';
  state.elements.forEach(cardEl => {
    cardsContainer.appendChild(cardEl.element)
  });

  updateCurrentText();

  if (state.elements[state.activeIndex]) {
    state.elements[state.activeIndex].addClass('active')
  }
}

function updateCurrentText() {
  currentEl.innerText = state.elements.length
   ? `${state.activeIndex + 1}/${state.elements.length}`
   : '';
}

function resetElementsClasses() {
  state.elements.forEach(el => {
    el.initClass();
  });
}

function handleArrowLeft(){
  if (state.activeIndex > 0) {
    resetElementsClasses();
    state.elements[state.activeIndex].addClass('right');
    state.activeIndex--;
    state.elements[state.activeIndex].addClass('active');
    state.elements[state.activeIndex - 1]?.addClass('left');
    updateCurrentText();
  }
}

function handleArrowRight(){
  if (state.activeIndex < state.elements.length - 1) {
    resetElementsClasses();
    state.elements[state.activeIndex].addClass('left');
    state.activeIndex++;
    state.elements[state.activeIndex].addClass('active');
    state.elements[state.activeIndex + 1]?.addClass('right');
    updateCurrentText();
  }
}

function handleAddNewCard(){
  const question = questionEl.value;
  const answer = answerEl.value;

  if(question && !(state.elements.some(data => (data.question === question)))){
    if (question.trim() && answer.trim()) {
      questionEl.classList.remove('error');
      answerEl.classList.remove('error');
      addContainer.classList.remove('show');
      state.elements.push(new CardItem(question, answer));
      setCardsData(state.elements);
      resetElementsClasses();
      state.activeIndex = state.elements.length - 1;
      state.elements[state.activeIndex - 1]?.addClass('left');
      render();
      questionEl.value = '';
      answerEl.value = '';
    }
  }else{
    questionEl.classList.add('error');
    answerEl.classList.add('error');
  }
}

function handleInputChange(event) {
  const cardItems = state.elements;
 
  if (cardItems.some((data) => data.question === event.target.value)) {
    questionEl.classList.add('error');
  }
  else {
    questionEl.classList.remove('error');
  }
}

function setupListeners() {
  answerEl.addEventListener('keypress', event => {
    if (event.key === "Enter") {
      handleAddNewCard();
      event.preventDefault();
    }
  });
  questionEl.addEventListener('keypress', event => {
    if (event.key === "Enter") {
      handleAddNewCard();
      event.preventDefault();
    }
  });
  addCardBtn.addEventListener('click', handleAddNewCard);
  questionEl.addEventListener('input', handleInputChange);

  nextBtn.addEventListener('click', handleArrowRight);

  prevBtn.addEventListener('click', handleArrowLeft);

  showBtn.addEventListener('click', () => {
    addContainer.classList.add('show')
    questionEl.focus();
  });

  closeBtn.addEventListener('click', () => {
    addContainer.classList.remove('show');
    questionEl.value = '';
    answerEl.value = '';
  });
  
  clearBtn.addEventListener('click', () => {
    state.elements = [...state.elements.slice(0, state.activeIndex), ...state.elements.slice(state.activeIndex + 1)];
    
    if (state.activeIndex > state.elements.length - 1) {
      state.activeIndex = state.elements.length - 1;
    }
    resetElementsClasses();
    setCardsData(state.elements);
    render();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowLeft') {
      handleArrowLeft();
    }
    else if(event.key === 'ArrowRight'){
      handleArrowRight();
    }
  });
}

initCardsData();
setupListeners();