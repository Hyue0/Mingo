const size = 5;
const options = [
  "Drink 8 Cups of Water", "Exercise", "Try Something New", "Bake a New Recipe", "Read a Book", "Get 8 Hours of Sleep", "Clean Your Room", "Daily Affirmations", "Try New Foods", "Talk to Family", "Meditate", "Talk to Friends", "Go on a Walk", "Go Shopping", "Listen to Music", "Arts and Crafts", "Draw", "Eat 3 Meals", "Watch a Movie", "Play Games", "Yoga", "Start a New Project", "Stretch", "Visit a New Place", "Watch TV", "Do Skincare", "Go to a Spa", "Take a Walk by the Beach", "Plan a Trip with Friends"
];

const newBoardButton = document.querySelector('.new-board');
const overlay = document.querySelector('.overlay');
const winScreen = document.querySelector('.win-screen');
const winScreenButton = document.querySelector('.win-screen-btn');
const winScreenHead = document.querySelector('.win-screen-head');

let task;
const tasks = (function creatTaskList(){
  let tasks=[];
  while(tasks.length<26){
    task = options[Math.floor(Math.random() * 30)]
    if(tasks.indexOf(task) === -1){
      tasks.push(task);
    }
  }
  return tasks;
})();

const cards = (function createCards() {
  let cards = [];
  const grid = document.getElementById('cards')
  for (let y = 0; y < size; y++) {
    const column = document.createElement('div');
    column.classList.add("column");
    let columnCards = [];
    cards.push(columnCards);
    grid.appendChild(column);
    for (let x = 0; x < size; x++) {
      const boardItems = document.createElement('div');
      boardItems.classList.add('card');
      boardItems.onclick = select(x,y);
      column.appendChild(boardItems);
      columnCards.push({element: boardItems});
    }
  }
  return cards;
})();

newBoardButton.addEventListener('click', init);
winScreenButton.addEventListener('click', init);

function select(x,y) {
  return function() {
    const card = cards[y][x];
    if (!card.selected) {
      card.element.classList.add('selected');
      card.selected = true;
      checkOver();
    }else if(card.selected) {
      card.element.classList.remove('selected');
      card.selected = false;
    }
  };

}

function line(x, y, dx, dy) {
  let r = true;
  while (r && x >= 0 && x < size && y >=0 && y < size) {
    r = r && cards[y][x].selected
    x += dx, y += dy;
  }
  return r;
}

function checkOver() {
  let hasLine = line(0, 0, 1, 1) || line(size - 1, 0, -1, 1);
  for (i = 0; i < size; i++){
    hasLine = hasLine || line(i, 0, 0, 1) || line(0, i, 1, 0);
  }
  if (hasLine) {
    overlay.classList.add('active');
    winScreen.classList.add('active');
    winScreenButton.classList.add('active');
    winScreenHead.classList.add('active');
  }
}

function init() {
  const a = Array.from(tasks);
  a.sort((a,b) => 0.5 - Math.random());
  for (var i = 0; i < a.length; i++) {
    var x = i % size, y = Math.floor(i / size);
    var card = cards[y][x];
    card.element.innerText = a[i];
    card.element.classList.remove('selected');
    overlay.classList.remove('active');
    winScreen.classList.remove('active');
    winScreenButton.classList.remove('active');
    winScreenHead.classList.remove('active');
    card.selected = false;
  }
}

init();