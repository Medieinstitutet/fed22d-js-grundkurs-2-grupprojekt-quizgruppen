import './style/style.scss';

// All kod härifrån och ner är bara ett exempel för att komma igång

// I denna utils-fil har vi lagrat funktioner som ofta används, t.ex. en "blanda array"-funktion
import { shuffle } from './utils';

// I denna fil har vi lagrat vår "data", i detta exempel en ofullständig kortlek
import exampleCardDeck from './exampleArray';

// Blanda kortleken
const myShuffledCardDeck = shuffle(exampleCardDeck);

/**
 * Vänder upp/ner på det klickade kortet genom att toggla en CSS-klass.
 * @param this - Det HTML-element som har klickats på
 * @return {void}
 */
function flipCard(this: HTMLElement): void {
  if (this !== undefined) {
    this.classList.toggle('visible');
  }
}

// Printa kortleken
let cardString = '';
myShuffledCardDeck.forEach((card) => {
  cardString += `
    <button class="card">
      <span class="front">♠</span>
      <span class="back">${card}</span>
    </button>`;
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = cardString;

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', flipCard);
});
