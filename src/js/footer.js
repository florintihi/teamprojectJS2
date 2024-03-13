const modalBackdrop = document.querySelector('.modal-backdrop');
const btnopenTeamModal = document.querySelector('.team-link');

import team from './team-info.json';

//modalul//

btnopenTeamModal.addEventListener('click', openTeamModal);

function openModal() {
  modalBackdrop.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('modal-open');
  closingModalOptions();
}

function closingModalOptions() {
  modalBackdrop.addEventListener('click', closeModalOnClickBtn);
  document.addEventListener('keydown', closingModal);
  document
    .querySelector('.modal__btn-close')
    .addEventListener('click', modalClosed);
}
function closingModal(e) {
  if (e.key === 'Escape') {
    modalClosed();
  }
}

function closeModalOnClickBtn(e) {
  if (e.target === modalBackdrop) {
    modalClosed();
  }
}
function modalClosed() {
  modalBackdrop.firstElementChild.classList.remove('team-modal');
  modalBackdrop.firstElementChild.classList.add('modal');
  modalBackdrop.classList.remove('modal-open');
  document.body.style.overflow = 'overlay';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closingModal);
  modalBackdrop.removeEventListener('keydown', closeModalOnClickBtn);
  modalBackdrop.firstElementChild.dataset.id = '';
}
const modalCloseBtn = `
<button class="modal__btn-close btn__close-modal">
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8L22 22" stroke="black" stroke-width="2"/>
<path d="M8 22L22 8" stroke="black" stroke-width="2"/>
</svg>
    </button>
`;

//team list//

const modalTeamList = document.createElement('ul');
const teamTitle = document.createElement('h1');

function openTeamModal(e) {
  e.preventDefault();
  renderTeamModal();
  openModal();
  modalBackdrop.firstElementChild.classList.add('team-modal');
  modalBackdrop.firstElementChild.classList.remove('modal');
}

function renderTeamModal() {
  modalBackdrop.firstElementChild.innerHTML = '';
  modalTeamList.innerHTML = '';
  teamTitle.innerHTML = '';
  modalBackdrop.firstElementChild.insertAdjacentElement('beforeend', teamTitle);
  teamTitle.classList.add('team-modal__title');
  teamTitle.insertAdjacentHTML('beforeend', 'GoIt Students');
  modalBackdrop.firstElementChild.insertAdjacentElement(
    'beforeend',
    modalTeamList
  );
  modalBackdrop.firstElementChild.insertAdjacentHTML(
    'beforeend',
    modalCloseBtn
  );
  modalTeamList.classList.add('team-modal__list');
  team.map(member => {
    const markup = `<li class="team-modal__item">
    <h2 class="team-modal__name">${member.name}</h2>
    <p class="team-modal__role">${member.role}</p>
    </li>`;
    modalTeamList.insertAdjacentHTML('beforeend', markup);
  });
}
