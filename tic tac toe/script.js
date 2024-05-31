let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattren Array

let winningPattern=[
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Player "x" play first
let xTurn = true;
let count = 0;

// Disable all  buttons
const disableButton = () =>{
    btnRef.forEach((element) => (element.disabled = true));
    // enable popup
    popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButton = () => {
    btnRef.forEach ((element) => {
        element.innerText = "" ;
        element.disabled = false;
    });
    // disable popup
    popupRef.classList.add("hide"); 
};

// This Function is executed when a player wins

const winFunction = (letter) => {
  disableButton();
  if (letter =="X"){
    msgRef.innerHTML = "&#x1F389; <br> 'X' wins";

  }
  else{
    msgRef.innerHTML = "&#x1F389; <br> 'O' wins";

  }
};

// Function for draw
const drawFunction = () => {
    disableButton();
    msgRef.innerHTML = "&#x1F60E <br> It's a Draw";
}


// New Game
newgameBtn.addEventListener("click",() => {
    count = 0
    enableButton();
});
restartBtn.addEventListener("click", () => {
    count = 0
    enableButton();
});



// win Logic
const winChecker = () =>{
    // Loop through all win pattrens
    for(let i of winningPattern){
        let[element1, element2, element3 ] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        // check if element are filled
        // if 3 empty element are same and would give win as would
        if(element1 != "" && (element2 != "") & (element3 != "")){
            if(element1 == element2 && element2 == element3){
                // if all 3 buttons have same value then pass the value to winFunction
                winFunction(element1);

            }
        }


    }
}



// Display x/o on click

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
      if (xTurn) {
        xTurn = false;
        // display x
        element.innerText = "X";
        element.disabled = true;   
        } else {
            xTurn = true;
        // display y 
            element.innerText = "O";
            element.disabled = true;
        }
        //increment count on each click
        count +=1;
        if(count === 9){
            drawFunction();
            
        }
        // check for win on every click
        winChecker();
    });
});      
// Enable Buttons and disable popup on page load
window.onload = enableButton;  
