window.addEventListener("load", () => {
  if (!canvasSupport()) return;
  canvasApp();
});

class Debugger {
  static log(message) {
    try {
      console.log(message);
    } catch (e) {}
  }
}

// const canvasSupport = () => !!document.createElement("canvas").getContext;
const canvasSupport = () => {
  const canvas = document.createElement("canvas");
  return typeof canvas.getContext === "function";
};

const canvasApp = () => {
  const message = "Guess The Letter From a (lower) to z (higher)";
  const letters = [..."abcdefghijklmnopqrstuvwxyz"];
  const today = new Date();

  let guesses = 0;
  let letterToGuess = "";
  let higherOrLower = "";
  let lettersGuessed = [];
  let gameOver = false;

  const canvas = document.getElementById("canvasOne");
  const ctx = canvas.getContext("2d");
  const exportButton = document.getElementById("createImageData");

  const initGame = () => {
    const letterIndex = Math.floor(Math.random() * letters.length);
    letterToGuess = letters[letterIndex];
    guesses = 0;
    lettersGuessed = [];
    gameOver = false;

    window.addEventListener("keyup", eventKeyPressed, true);
    if (exportButton) {
      exportButton.addEventListener("click", createImageDataPressed, false);
    }

    drawScreen();
  };

  const eventKeyPressed = (e) => {
    if (gameOver) return;

    const letterPressed = e.key?.toLowerCase();
    if (!/^[a-z]$/.test(letterPressed)) return;

    guesses++;
    lettersGuessed.push(letterPressed);

    if (letterPressed === letterToGuess) {
      gameOver = true;
    } else {
      const targetIndex = letters.indexOf(letterToGuess);
      const guessIndex = letters.indexOf(letterPressed);
      Debugger.log(guessIndex);

      if (guessIndex < 0) {
        higherOrLower = "That is not a letter";
      } else if (guessIndex > targetIndex) {
        higherOrLower = "Lower";
      } else {
        higherOrLower = "Higher";
      }
    }

    drawScreen();
  };

  const drawScreen = () => {
    ctx.fillStyle = "#ffffaa";
    ctx.fillRect(0, 0, 500, 300);

    ctx.strokeStyle = "#000";
    ctx.strokeRect(5, 5, 490, 290);

    ctx.textBaseline = "top";

    ctx.fillStyle = "#000";
    ctx.font = "10px sans-serif";
    ctx.fillText(today.toLocaleString(), 150, 10);

    ctx.fillStyle = "#FF0000";
    ctx.font = "14px sans-serif";
    ctx.fillText(message, 125, 30);

    ctx.fillStyle = "#109910";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Guesses: ${guesses}`, 215, 50);

    ctx.fillStyle = "#000";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Higher Or Lower: ${higherOrLower}`, 150, 125);

    ctx.fillStyle = "#FF0000";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Letters Guessed: ${lettersGuessed.join(", ")}`, 10, 260);

    if (gameOver) {
      ctx.fillStyle = "#FF0000";
      ctx.font = "40px sans-serif";
      ctx.fillText("You Got it!", 150, 180);
    }
  };

  const createImageDataPressed = () => {
    // ver 1 original
    // window.open(
    //   canvas.toDataURL(),
    //   'canvasImage',
    //   `left=0,top=0,width=${canvas.width},height=${canvas.height},toolbar=0,resizable=0`
    // );

    // ver 2 deprecated write
    // const dataUrl = canvas.toDataURL();
    // const win = window.open();
    // win.document.write(`<img src="${dataUrl}" />`);

    // ver 3 new tab
    // const dataUrl = canvas.toDataURL("image/png");
    // const win = window.open();

    // if (win) {
    //   win.document.body.style.margin = "0";
    //   const img = win.document.createElement("img");
    //   img.src = dataUrl;
    //   img.style.display = "block";
    //   img.style.maxWidth = "100%";
    //   img.style.height = "auto";
    //   win.document.title = "Exported Canvas";
    //   win.document.body.appendChild(img);
    // } else {
    //   alert("Popup blocked. Please allow popups for this site.");
    // }

    // ver 4 pop up
    const dataUrl = canvas.toDataURL("image/png");

    //  open pop up with no content
    const win = window.open(
      "",
      "_blank",
      `width=${canvas.width},height=${canvas.height},resizable=no,toolbar=no,menubar=no,location=no,status=no`
    );

    if (win) {
      // check for window created
      const setupImage = () => {
        // assign title and styles
        win.document.title = "Canvas Export";
        win.document.body.style.margin = "0";
        win.document.body.style.backgroundColor = "#fff";
        win.document.body.style.display = "flex";
        win.document.body.style.alignItems = "center";
        win.document.body.style.justifyContent = "center";
        win.document.body.style.height = "100vh";

        // Create img
        const img = win.document.createElement("img");
        img.src = dataUrl;
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        win.document.body.appendChild(img);
      };

      // if already loaded  window
      if (win.document.readyState === "complete") {
        setupImage();
      } else {
        // wait for load
        win.onload = setupImage;
      }
    } else {
      alert("Popup blocked. Please allow popups for this site.");
    }
  };

  initGame();
};
