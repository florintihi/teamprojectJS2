export function initializeDarkModeToggle() {
  const BUTTON_DARK_MODE = document.querySelector('.dark-mode');
  const sun = document.querySelector('.sun');
  const moon = document.querySelector('.moon');
  const bodyStyle = document.body;
  const filmBoxes = document.querySelectorAll('.film-box');

  // set dark mode
  let setDarkMode = function () {
    sun.style.visibility = 'hidden';
    moon.style.visibility = 'visible';
    BUTTON_DARK_MODE.classList.remove('active');
    bodyStyle.style.backgroundColor = '#545454';
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
    filmBoxes.forEach(box => {
      box.style.backgroundColor = '#545454';
    });
    localStorage.setItem('darkMode', 'off');
  };

  // toggle dark/light mode
  let toggleDarkMode = function () {
    if (BUTTON_DARK_MODE.classList.contains('active')) {
      setDarkMode();
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
