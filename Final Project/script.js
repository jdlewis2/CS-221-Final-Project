// Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const wantedImage = document.getElementById("wanted-image");

// Available Words
let options = {
    fruits: ["Apple", "Blueberry", "Mandarin", "Pineapple", "Pomegranate", "Watermelon", "Cherry",],
    animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra","Elephant", "Dog","Lion","Bear","Alligator","Horse"],
    countries: ["India", "Hungary", "Kyrgyzstan", "Switzerland", "Zimbabwe", "Dominica","Brazil", "Russia", "Africa","Canada"],
    Restaurants: ["Mcdonalds","Starbucks","AppleBees","Wendys","BurgerKing", "Subway","Sonic","FiveGuys","Chipotle","Zaxbys","Dennys","WaffleHouse","Ihop"],

};

// Count variables
let winCount = 0;
let count = 0;
let chosenWord = "";

// Initializer
const initializer = () => {
    winCount = 0;
    count = 0;
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    wantedImage.classList.add("hide");
    canvas.classList.remove("hide");

    // Create alphabet buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        dashes[index].innerText = char;
                        winCount += 1;

                        if (winCount == charArray.length) {
                            resultText.innerHTML = `
                                <h2 class='win-msg'>YEEHAW! You caught the outlaw!</h2>
                                <p>The word was <span>${chosenWord}</span></p>`;
                            blocker();
                        }
                    }
                });
            } else {
                count += 1;
                drawMan(count);
                if (count === 6) {
                    canvas.classList.add("hide");
                    wantedImage.classList.remove("hide");
                    resultText.innerHTML = `
                        <h2 class='lose-msg'>WANTED: Dead or Alive...</h2>
                        <p>The word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            button.disabled = true;
        });
        letterContainer.append(button);
    }

    displayOptions();
    canvasCreator().initialDrawing();
};

// Display option buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Choose Your Posse:</h3>`;
    let buttonCon = document.createElement("div");

    for (let value in options) {
        buttonCon.innerHTML += `
            <button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }

    optionsContainer.appendChild(buttonCon);
};

// Disable all buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    letterButtons.forEach((button) => {
        button.disabled = true;
    });

    newGameContainer.classList.remove("hide");
};

// Generate random word from selected option
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)].toUpperCase();

    let displayItem = chosenWord.replace(/./g, `<span class="dashes">_</span>`);
    userInputSection.innerHTML = displayItem;
};

// Canvas drawing logic
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();

        // Cowboy hat
        drawLine(60, 20, 80, 20); // brim
        drawLine(65, 10, 75, 10); // top
        drawLine(65, 10, 65, 20); // left
        drawLine(75, 10, 75, 20); // right
        drawLine(10, 20, 80, 20);
    };

    const body = () => drawLine(70, 40, 70, 80);
    const leftArm = () => drawLine(70, 50, 50, 70);
    const rightArm = () => drawLine(70, 50, 90, 70);
    const leftLeg = () => drawLine(70, 80, 50, 110);
    const rightLeg = () => drawLine(70, 80, 90, 110);

    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawLine(10, 130, 130, 130); // base
        drawLine(10, 10, 10, 131);   // pole
        drawLine(10, 10, 70, 10);    // top beam
        drawLine(70, 10, 70, 20);    // rope drop
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Draw stickman step-by-step
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();

    switch (count) {
        case 1: head(); break;
        case 2: body(); break;
        case 3: leftArm(); break;
        case 4: rightArm(); break;
        case 5: leftLeg(); break;
        case 6: rightLeg(); break;
        default: break;
    }
};

// New Game Button
newGameButton.addEventListener("click", initializer);

// Start game on load
window.onload = initializer;