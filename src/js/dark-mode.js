export function initializeDarkModeToggle() {
  const BUTTON_DARK_MODE = document.querySelector('.dark-mode');
  const sun = document.querySelector('.sun');
  const moon = document.querySelector('.moon');
  const bodyStyle = document.body;
  const filmBoxes = document.querySelectorAll('.film-box');
  const mainSection = document.querySelector('.main-section');

  // set dark mode
  let setDarkMode = function () {
    sun.style.visibility = 'hidden';
    moon.style.visibility = 'visible';
    BUTTON_DARK_MODE.classList.remove('active');
    bodyStyle.style.backgroundColor = '#121212';
    mainSection.style.backgroundColor = '#121212';
    filmBoxes.forEach(box => {
      box.style.backgroundColor = '#F7F7F7';
    });
    localStorage.setItem('darkMode', 'on');
  };

  // set light mode
  let setLightMode = function () {
    moon.style.visibility = 'hidden';
    sun.style.visibility = 'visible';
    BUTTON_DARK_MODE.classList.add('active');
    bodyStyle.style.backgroundColor = '#F7F7F7';
    mainSection.style.backgroundColor = '#7e1616';
    filmBoxes.forEach(box => {       
      box.style.backgroundColor = '#ec7532';
    });
    localStorage.setItem('darkMode', 'off');
  };

  // toggle dark/light mode
  let toggleDarkMode = function () {
    if (BUTTON_DARK_MODE.classList.contains('active')) {
      setDarkMode()       ;
    } else {
      setLightMode();
    }
  };

  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'on') {
    setDarkMode();
  } else {
    setLightMode();
  }

  BUTTON_DARK_MODE.addEventListener('click', toggleDarkMode);
}

initializeDarkModeToggle();
