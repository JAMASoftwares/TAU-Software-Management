

const getButton = document.getElementById('nextBtn');
const multiInput = document.querySelector('multi-input'); 
const values = document.querySelector('#values');

getButton.onclick = () => {
  if (multiInput.getValues().length > 0) {
    values.textContent = `Got ${ multiInput.getValues().join(' and ')}!`;
  } else {
    values.textContent = 'Got none  :`^(.'; 
  }
};

document.querySelector('input').focus();
