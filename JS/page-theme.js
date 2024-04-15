const page = document.querySelector('html');
const themeSwitcher = document.querySelector('#themeSwitcher');
let pageClass = 0;

if (localStorage.getItem('theme') == 'dark-theme') {
    page.classList.add('dark-theme');
    page.classList.remove('white-theme');
} 
else if(localStorage.getItem('theme') == 'white-theme') {
    page.classList.remove('dark-theme');
    page.classList.add('white-theme');
}

themeSwitcher.addEventListener('click', function() {
    page.classList.toggle('dark-theme');
    page.classList.toggle('white-theme');  

    if(page.classList[0] == "dark-theme") pageClass = "dark-theme";
    if(page.classList[0] == "white-theme") pageClass = "white-theme";
    
    localStorage.setItem('theme', pageClass);
});



