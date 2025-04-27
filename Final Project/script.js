// Intro screen references
const introScreen = document.getElementById("intro-screen");
const howToPlayScreen = document.getElementById("how-to-play-screen");
const gameContent = document.getElementById("game-content");
const startGameButton = document.getElementById("start-game-button");
const howToPlayButton = document.getElementById("how-to-play-button");
const closeInstructionsButton = document.getElementById("close-instructions");
const returnToMenuButton = document.getElementById("return-to-menu-button");

// Add event listeners for intro buttons
startGameButton.addEventListener("click", () => {
    introScreen.classList.add("hide");
    gameContent.classList.remove("hide");
    initializer();
});

howToPlayButton.addEventListener("click", () => {
    introScreen.classList.add("hide");
    howToPlayScreen.classList.remove("hide");
});

closeInstructionsButton.addEventListener("click", () => {
    howToPlayScreen.classList.add("hide");
    introScreen.classList.remove("hide");
});

returnToMenuButton.addEventListener("click", () => {
    newGameContainer.classList.add("hide");
    gameContent.classList.add("hide");
    introScreen.classList.remove("hide");
});

window.onload = () => {
    // Show intro screen by default
    introScreen.classList.remove("hide");
    gameContent.classList.add("hide");
    
};

// Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const wantedImage = document.getElementById("wanted-image");


// Image paths
const winImage = "TIpHat.png"; // Path to win image
const loseImage = "wanted.png"; // Path to lose image

// Available Words
let options = {
    fruits: ["Apple", "Blueberry", "Mandarin", "Pineapple", "Pomegranate", "Watermelon", "Cherry","Strawberry","Grape"],
    animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra","Elephant", "Dog","Lion","Bear","Alligator","Horse"],
    countries: ["India", "Hungary", "Kyrgyzstan", "Switzerland", "Zimbabwe", "Dominica","Brazil", "Russia", "Africa","Canada"],
    Restaurants: ["Mcdonalds","Starbucks","AppleBees","Wendys","BurgerKing", "Subway","Sonic","FiveGuys","Chipotle","Zaxbys","Dennys","WaffleHouse","Ihop"]
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
    
    // Reset result text content
    resultText.innerHTML = "";
    resultText.appendChild(wantedImage);  // Re-append the image to result text

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
                            canvas.classList.add("hide");
                            
                            // Set win image
                            wantedImage.src = winImage; 
                            wantedImage.style.display = "block";
                            wantedImage.classList.remove("hide");
                            
                            // Create result message elements
                            const winMsg = document.createElement("h2");
                            winMsg.className = "win-msg";
                            winMsg.innerText = "YEEHAW! You caught the outlaw!";
                            
                            const wordMsg = document.createElement("p");
                            wordMsg.innerHTML = `The word was <span>${chosenWord}</span>`;
                            
                            // Clear result text (except the image) and add new elements
                            while (resultText.childNodes.length > 1) {
                                resultText.removeChild(resultText.lastChild);
                            }
                            resultText.appendChild(winMsg);
                            resultText.appendChild(wordMsg);
                            
                            blocker();
                        }
                    }
                });
            } else {
                count += 1;
                drawMan(count);
                if (count === 6) {
                    canvas.classList.add("hide");
                    
                    // Set lose image
                    wantedImage.src = loseImage;
                    wantedImage.style.display = "block";
                    wantedImage.classList.remove("hide");
                    
                    // Create result message elements
                    const loseMsg = document.createElement("h2");
                    loseMsg.className = "lose-msg";
                    loseMsg.innerText = "Aw Man! You let em get away! ";
                    
                    const wordMsg = document.createElement("p");
                    wordMsg.innerHTML = `The word was <span>${chosenWord}</span>`;
                    
                    // Clear result text (except the image) and add new elements
                    while (resultText.childNodes.length > 1) {
                        resultText.removeChild(resultText.lastChild);
                    }
                    resultText.appendChild(loseMsg);
                    resultText.appendChild(wordMsg);
                    
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
    context.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY, color = "#000") => {
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    // Draw filled circle
    const drawCircle = (x, y, radius, stroke = "#000", fill = null) => {
        context.beginPath();
        context.strokeStyle = stroke;
        context.arc(x, y, radius, 0, Math.PI * 2, true);
        context.stroke();
        if (fill) {
            context.fillStyle = fill;
            context.fill();
        }
    };

    // Draw filled shape
    const drawShape = (points, stroke = "#000", fill = null) => {
        context.beginPath();
        context.strokeStyle = stroke;
        context.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
        context.closePath();
        if (fill) {
            context.fillStyle = fill;
            context.fill();
        }
        context.stroke();
    };

    const head = () => {
        // Head
        drawCircle(70, 30, 10, "#000", "#F5D0A9"); // Flesh tone
        
        // Cowboy hat
        context.beginPath();
        // Hat brim
        context.strokeStyle = "#000";
        context.fillStyle = "#8B4513"; // Brown hat
        context.ellipse(70, 20, 18, 5, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        
        // Hat top
        context.beginPath();
        context.strokeStyle = "#000";
        context.fillStyle = "#8B4513"; // Brown hat
        context.ellipse(70, 15, 10, 5, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        
        // Face features
        drawCircle(66, 28, 1, "#000", "#000"); // Left eye
        drawCircle(74, 28, 1, "#000", "#000"); // Right eye
        
        // Straight mouth (neutral expression)
        drawLine(67, 34, 73, 34);
    };

    const body = () => {
        drawLine(70, 40, 70, 80); // Body
        
        // Bandana
        drawShape([
            [60, 42],
            [80, 42],
            [82, 46],
            [58, 46]
        ], "#000", "#FF0000"); // Red bandana
    };

    const leftArm = () => {
        drawLine(70, 55, 50, 70); // Left arm
        
        // Hand
        drawCircle(50, 70, 3, "#000", "#F5D0A9"); // Flesh tone
        
        // Gun (when the left arm is drawn)
        drawShape([
            [50, 65],
            [40, 65],
            [40, 69],
            [50, 69]
        ], "#000", "#333333"); // Dark gray gun
    };

    const rightArm = () => {
        drawLine(70, 55, 90, 70); // Right arm
        // Hand
        drawCircle(90, 70, 3, "#000", "#F5D0A9"); // Flesh tone
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110); // Left leg
        
        // Boot
        drawShape([
            [50, 110],
            [45, 110],
            [45, 115],
            [55, 115],
            [55, 110]
        ], "#000", "#8B4513"); // Brown boot
        
        // Spur
        drawLine(45, 113, 42, 113, "#FFD700"); // Gold spur
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110); // Right leg
        
        // Boot
        drawShape([
            [90, 110],
            [85, 110],
            [85, 115],
            [95, 115],
            [95, 110]
        ], "#000", "#8B4513"); // Brown boot
        
        // Spur
        drawLine(95, 113, 98, 113, "#FFD700"); // Gold spur
        
        // Belt (final detail)
        drawShape([
            [65, 80],
            [75, 80],
            [75, 83],
            [65, 83]
        ], "#000", "#8B4513"); // Brown belt
        
        // Belt buckle
        drawShape([
            [68, 80],
            [72, 80],
            [72, 83],
            [68, 83]
        ], "#000", "#FFD700"); // Gold buckle
    };

    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        // Sky background
        context.fillStyle = "#87CEEB";
        context.fillRect(0, 0, canvas.width, 130);
        
        // Draw desert ground
        context.fillStyle = "#D2B48C"; // Sandy color
        context.fillRect(0, 130, canvas.width, canvas.height - 130);
        context.strokeStyle = "#A0522D"; // Darker sand edge
        context.beginPath();
        context.moveTo(0, 130);
        context.lineTo(canvas.width, 130);
        context.stroke();
        
        // Draw cactus
        drawShape([
            [120, 130],
            [120, 100],
            [115, 100],
            [115, 115],
            [110, 115],
            [110, 130]
        ], "#000", "#2E8B57"); // Green cactus
        
        // Gallows - wooden look
        drawLine(10, 130, 40, 130, "#8B4513"); // base
        drawLine(10, 10, 10, 130, "#8B4513");  // pole
        drawLine(10, 10, 70, 10, "#8B4513");   // top beam
        drawLine(70, 10, 70, 20, "#A52A2A");   // rope
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