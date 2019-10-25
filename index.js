const hamburger = document.querySelector('.hamburger')
const ul = document.querySelector('.aside-ul')
hamburger.addEventListener('click', () => {
    ul.classList.toggle('open');
})