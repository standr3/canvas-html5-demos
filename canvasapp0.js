
window.addEventListener("load", eventWindowLoaded, false);

class Debugger {
  static log(message) {
    try {
      console.log(message);
    } catch (e) {
      // nothing
    }
  }
}

function eventWindowLoaded() {
  canvasApp();
}

function canvasSupport() {
  return !!document.createElement("canvas").getContext;
}

function canvasApp() {
  if (!canvasSupport) {
    return;
  } else {
    
    Debugger.log("merge");

    const theCanvas = document.getElementById("canvasOne");
    const context = theCanvas.getContext("2d");

    Debugger.log("Drawing Canvas");

    function drawScreen() {
      // clear
      console.log(context);
      context.fillStyle = "#ffffaa";
      context.fillRect(0, 0, 500, 300);

      context.fillStyle = "#03f210";
      context.font = "20px Sans-Serif";
      context.textBaseline = "top";
      context.fillText("Hello world", 195, 80);

      let globeImage = new Image();
      globeImage.onload = function () {
        context.drawImage(globeImage, 160, 130);
      };
      globeImage.src = "globe.gif";

      context.strokeStyle = "#000000";
      context.strokeRect(5, 5, 490, 290);
    }

    drawScreen();
  }
}
