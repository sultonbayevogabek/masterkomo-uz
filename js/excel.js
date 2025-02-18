'use strict';

let user = JSON.parse(localStorage.getItem('user'));

document.querySelector('#joinToChannel')?.addEventListener('click', () => {
  window.location.href = 'https://t.me/+d1JDpgATetViMGJi';
})

if (user && user?.name && user?.phone && user?.time) {
  const formData = new FormData();
  formData.append('Ismi', user?.name);
  formData.append('Telefon raqami', user?.phone);
  formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);
  fetch('https://script.google.com/macros/s/AKfycbwtTBIhtsSaxmKXTnPFMahevQntCzvlu-TIMehXUoegOEEu_raxbFzKJhifAKqbUxISPA/exec', {
    method: 'POST',
    body: formData
  })
    .then()
    .then(() => {
      localStorage.clear();
    })
} else {
  localStorage.clear();
}
