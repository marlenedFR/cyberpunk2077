// welcomeMessage.js

document.addEventListener("DOMContentLoaded", () => {
  const terminalText = [
    "Initialisation du système...",
    "Chargement des paramètres...",
    "Transfert des données...",
    "",
    `Bienvenue visiteur #${Math.floor(Math.random() * 10000)}`,
  ];

  let lineIndex = 0;
  let charIndex = 0;
  const bootTextElement = document.getElementById("boot-text");
  const typingSpeed = 50;
  const charsPerInterval = 5;

  const typeLine = () => {
    if (lineIndex < terminalText.length) {
      const currentLine = terminalText[lineIndex];
      if (charIndex < currentLine.length) {
        let textToAdd = currentLine.slice(
          charIndex,
          charIndex + charsPerInterval
        );
        bootTextElement.innerHTML += textToAdd;
        charIndex += charsPerInterval;
        setTimeout(typeLine, typingSpeed);
      } else {
        updateIndex();
        setTimeout(typeLine, 1000);
      }
    }
  };

  const updateIndex = () => {
    if (lineIndex < terminalText.length - 1) {
      bootTextElement.innerHTML += "<br>";
    } else {
      bootTextElement.innerHTML +=
        '<span class="blinking-cursor">&#9646</span>';
    }
    lineIndex++;
    charIndex = 0;
  };

  const displayContent = () => {
    document.getElementById("content").style.display = "block";
    document.getElementById("welcome-message-container").style.display = "none";
  };

  const buttonEvent = () => {
    document
      .getElementById("continue-button")
      .addEventListener("click", displayContent);
    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        displayContent();
      }
    });
  };

  const glitchEffect = () => {
    const glitchElement = document.querySelector(".btn-glitch");
    const { startGlitch, stopGlitch } = PowerGlitch.glitch(glitchElement, {
      playMode: "always",
      hideOverflow: false,
      timing: {
        duration: 2000,
      },
      glitchTimeSpan: {
        start: 0.5,
        end: 0.7,
      },
      shake: {
        velocity: 0.2,
        amplitudeX: 0.1,
        amplitudeY: 0.1,
      },
      slice: {
        count: 6,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.15,
        hueRotate: true,
      },
      pulse: false,
    });

    const startGlitchCycle = () => {
      startGlitch();
      setTimeout(() => {
        stopGlitch();
        setTimeout(startGlitchCycle, 3000);
      }, 2000);
    };

    startGlitchCycle();
  };

  window.onload = () => {
    glitchEffect();
    buttonEvent();
    typeLine();
  };
});
