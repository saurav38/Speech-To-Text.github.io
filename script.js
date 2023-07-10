const speakBtn = document.getElementById('speak-btn');
const messageEl = document.getElementById('message');
let recognizedText = '';

speakBtn.onclick = (e) => {
  speakBtn.classList.toggle('active');
  if (speakBtn.classList.contains('active')) {
    recognizedText = ''; // Reset recognized text when microphone is activated
    speak();
    playAudio('mixkit-confirmation-tone-2867.wav'); // Play audio when clicking the mic
  } else {
    stopAudio();
    playAudio('mixkit-correct-answer-tone-2870.wav');
    printRecognizedText();
  }
}

function speak() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = function(e) {
      recognizedText = Array.from(e.results)
        .map(result => result[0].transcript)
        .join(' ');
    }

    recognition.onend = function() {
      printRecognizedText();
    }

    recognition.start();
  }
}

function printRecognizedText() {
  if (recognizedText.trim() !== '') {
    console.log(recognizedText);
    // You can do further processing with the recognized text here
  }
}

function playAudio(audioFile) {
  const audio = new Audio(audioFile);
  audio.play();
}

function stopAudio() {
  const audioElements = document.getElementsByTagName('audio');
  for (let i = 0; i < audioElements.length; i++) {
    audioElements[i].pause();
    audioElements[i].currentTime = 0;
  }
}
