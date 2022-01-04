//NAV SCRIPT
const button = document.querySelector('.menu-toggler')
const navmenu = document.querySelector('.navbar-menu');


button.addEventListener('click', () => {
  navmenu.classList.toggle('active');
  button.classList.toggle('active');
})

//GAME

const gameStats = {
  games: 0,
  wins: 0,
  losses: 0,
  draws: 0
}

const gameControl = {
  player: null,
  computer: null
}

//funkcja wybierająca dany IMG

function handImg(){
  gameControl.player = this.dataset.option
  console.log(gameControl.player)
  hands.forEach(hand => hand.style.boxShadow = '');
  this.style.boxShadow = '0 0 0 4px red';
}

//funkcja komputer wybierający
function computerChoice(){
  return hands[Math.floor(Math.random()*3)].dataset.option
}

//funkcja sprawdzająca wynik 

function checkResult(player, computer){
  if (player === computer){
    return 'draw';
  }
  else if ((player === 'papier' && computer === 'kamień') || (player === 'kamień' && computer === 'nożyce') || (player === "nożyce" && computer === "papier")){
    return 'win';
  }
  else{
    return 'loss';
  }
}

//funkcja publikacji wyniku
function publishResult(player, computer, result){
  document.querySelector('[data-summary="you"]').textContent = player;
  document.querySelector('[data-summary="computer"]').textContent = computer;
  document.querySelector('p.numbers span').textContent = ++gameStats.games;

  if (result === "win") {
    document.querySelector('p.wins span').textContent = ++gameStats.wins;
    document.querySelector('[data-summary="winner"]').textContent = "Ty wygrałeś!!!!"
    document.querySelector('[data-summary="winner"]').style.color = "green";
   } else if (result === "loss") {
    document.querySelector('p.losses span').textContent = ++gameStats.losses;
    document.querySelector('[data-summary="winner"]').textContent = "Komputer wygrał :("
    document.querySelector('[data-summary="winner"]').style.color = "red";
   } else {
    document.querySelector('p.draws span').textContent = ++gameStats.draws;
    document.querySelector('[data-summary="winner"]').textContent = "Remis :\\"
    document.querySelector('[data-summary="winner"]').style.color = "gray";
   }
 }

//funkcja główna - sterująca 
function startGame(){
  if(!gameControl.player){
    return alert('Wybierz jedną z dłoni!')
  }

  gameControl.computer = computerChoice();

  const gameResult = checkResult(gameControl.player, gameControl.computer);

  publishResult(gameControl.player, gameControl.computer, gameResult);

}

const hands = document.querySelectorAll('.game-select img');

hands.forEach(hand => hand.addEventListener('click', handImg));

document.querySelector('.start').addEventListener('click', startGame); //START gry
