const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame()

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards() {
    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = "";
    
    game.cards.forEach(card => {
        let cardElement = document.createElement("div");

        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        cardElement.addEventListener("click", flipCard);

        createCardContent(card, cardElement);

        gameBoard.appendChild(cardElement);

    });

}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if(face === FRONT) {

        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = `./images/${card.icon}.png`;

        cardElementFace.appendChild(iconElement);

    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }

    element.appendChild(cardElementFace);
}

function flipCard() {

    if (game.setCard(this.id)) {
        this.classList.add("flip");

        if(game.secoundCard) {
            if(game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = "flex";
                }
            } else {
    
                setTimeout(()=> {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secoundCardView = document.getElementById(game.secoundCard.id)
    
                    firstCardView.classList.remove("flip");
                    secoundCardView.classList.remove("flip");
                    game.unFlipCards();

                }, 1000)
    
            }
        }

        
    }

}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
}