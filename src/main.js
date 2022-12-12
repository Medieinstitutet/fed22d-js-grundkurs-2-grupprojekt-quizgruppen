onst playerRegBtn = document.querySelector('#playerRegBtn');

playerRegBtn.addEventListener('click', savePlayerName);

function savePlayerName() {
    
    const playerName = document.querySelector('#playerName');
   
    if (playerName.value == "") {
        const addPlayer = document.querySelector('#addPlayer');
        const errorMsgNode = document.createElement("p");
        const errorMsgTextNode = document.createTextNode("Fältet är tomt. Fyll i ditt namn.");
        errorMsgNode.appendChild(errorMsgTextNode);
        addPlayer.appendChild(errorMsgNode);
    } else {
        addPlayer.classList.add('hideName');
    }
}