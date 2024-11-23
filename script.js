document.addEventListener("DOMContentLoaded", function() {
  const words = [
    "apple", "bread", "candy", "delay", "eagle", "flame", "grape", 
    "heart", "ideal", "joker", "knife", "lemon", "mouse", "noble", 
    "party", "robot", "snake", "trust", "windy", "youth", "pizza"
  ];
  
  const originalWord = words[Math.floor(Math.random() * words.length)];
  const scrambledWord = originalWord.split('').sort(() => 0.5 - Math.random()).join('');
  
  document.getElementById('scrambledWord').textContent = scrambledWord;

  document.getElementById('submitPassword').addEventListener('click', function() {
    const enteredGuess = document.getElementById('passwordInput').value;

    if (enteredGuess.toLowerCase() === originalWord) {
      document.getElementById('passwordContainer').style.display = 'none';
      document.getElementById('mainContent').style.display = 'block';
    } else {
      document.getElementById('passwordHint').textContent = 'Incorrect answer, try again!';
    }
  });

  // Event listener to toggle theme
  document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
  });

  // Encrypt and validate message functions
  document.querySelector('button[onclick="encryptMessage()"]').addEventListener('click', function() {
    if (validateForm()) encryptMessage();
  });

  document.querySelector('button[onclick="decryptMessage()"]').addEventListener('click', function() {
    if (validateForm()) decryptMessage();
  });

  function encryptMessage() {
    const message = document.getElementById('inputMessage').value;
    const key = parseInt(document.getElementById('encryptionKey').value);
    let encryptedMessage = "";

    for (let char of message) {
      encryptedMessage += String.fromCharCode(char.charCodeAt(0) + key); 
    }
    document.getElementById('outputMessage').textContent = encryptedMessage;
  }

  function decryptMessage() {
    const message = document.getElementById('inputMessage').value;
    const key = parseInt(document.getElementById('encryptionKey').value);
    let decryptedMessage = "";

    for (let char of message) {
      decryptedMessage += String.fromCharCode(char.charCodeAt(0) - key); 
    }
    document.getElementById('outputMessage').textContent = decryptedMessage;
  }

  function validateForm() {
    const message = document.getElementById('inputMessage').value;
    const key = document.getElementById('encryptionKey').value;

    if (message === '' || key === '') {
      alert('Please enter both a message and an encryption key.');
      return false;
    }

    const errorMessage = document.getElementById('form-error');
    if (isNaN(key) || key < 1) {
      if (!errorMessage) {
        const error = document.createElement('p');
        error.id = 'form-error';
        error.textContent = 'Error: The encryption key must be a positive number.';
        error.style.color = 'red';
        document.getElementById('container').appendChild(error);
      }
      return false;
    } else if (errorMessage) {
      errorMessage.remove();
    }

    return true;
  }
});
