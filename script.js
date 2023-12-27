const speakButton = document.getElementById('speak-btn');
const textToSpeak = document.getElementById('text-to-speak');
const voicesSelect = document.getElementById('voices');

// Function to initialize speech synthesis
function speakText() {
  const speech = new SpeechSynthesisUtterance();
  speech.text = textToSpeak.value;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  // Get the selected voice from the dropdown
  const selectedVoice = voicesSelect.selectedOptions[0].getAttribute('data-name');
  const voices = window.speechSynthesis.getVoices();
  for (const voice of voices) {
    if (voice.name === selectedVoice) {
      speech.voice = voice;
    }
  }

  window.speechSynthesis.speak(speech);
}

// Populate voices in the dropdown
function populateVoices() {
  const availableVoices = window.speechSynthesis.getVoices();
  voicesSelect.innerHTML = '';
  availableVoices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute('data-name', voice.name);
    voicesSelect.appendChild(option);
  });
}

// Event listener for the speak button
speakButton.addEventListener('click', () => {
  if (textToSpeak.value !== '') {
    speakText();
  } else {
    alert('Please enter text to speak.');
  }
});

// Fetch voices when the voices are changed or loaded
window.speechSynthesis.onvoiceschanged = populateVoices;

function openSocialLink(link) {
  window.open(link, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
  const socialIcons = document.querySelectorAll('.social-icons .icon');

  socialIcons.forEach(icon => {
    icon.addEventListener('click', function (event) {
      event.preventDefault();
      const link = this.getAttribute('href');
      openSocialLink(link);
    });
  });
});
