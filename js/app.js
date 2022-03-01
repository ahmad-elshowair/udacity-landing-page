/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/* ===============================  START GLOBAL VARIABLES =============================== */
// get all sections
const sections = document.querySelectorAll('section');

// get all sections
const navBarList = document.getElementById('navbar__list');

// get scroll top btn
const goTopBtn = document.querySelector('footer .go__to__top');

// get the nav bar 
const navbarElement = document.querySelector('.page__header');

/* ===============================  END GLOBAL VARIABLES =============================== */

/* ===============================  START FUNCTIONS =============================== */

// function to creat the nav links for each section
const creatNewNavLink = () => {
    // set navbar list empty then cannot copy all nav links each time calling the function 
    navBarList.innerHTML = '';
    sections.forEach(section => {
        let newLiElement = document.createElement('li');
        if (section.dataset.nav === 'Section 1') { // add active class to the first nav link
            newLiElement.innerHTML = `<a href='#${section.id}' class='menu__link active' data-section='#${section.id}' data-nav='${section.dataset.nav}'>${section.dataset.nav}</a>`;
        } else {
            newLiElement.innerHTML = `<a href='#${section.id}' class='menu__link' data-section='#${section.id}' data-nav='${section.dataset.nav}'>${section.dataset.nav}</a>`;
        }
        // append the new nav link to nav list 
        navBarList.appendChild(newLiElement);
    });
};

// function to hide and show the scroll to top but 
const visibilityScrollTopBtn = () => {
    // hide scroll to top
    // if (document.documentElement.scrollTop <= 600) goTopBtn.style.display = 'none';
    // when scrolling the document hide and show the btn go to top
    document.addEventListener('scroll', () => {
        if (document.body.scrollTop <= 600) {
            goTopBtn.style.opacity = '0';
        } else {
            goTopBtn.style.opacity = '1';
        }
    });
};

// when the page isn't scrolling hide the navbar after 5sec
const hideShowNavbar = () => {
    window.addEventListener('scroll', () => {
        let timeSetting;
        navbarElement.classList.add('show__navbar');
        clearTimeout(timeSetting);
        timeSetting = setTimeout(() => {
            navbarElement.classList.remove('show__navbar');
            navbarElement.classList.add('hide__navbar');
        }, 5000);
    });
};

// function to scroll to specific section 
const scrollToSection = (links) => {
    // create a loop to loop over all links 
    links.forEach(element => {
        // add a click event to each link
        element.addEventListener('click', (event) => {
            event.preventDefault(); // prevent the default 
            // scroll to specific section
            document.querySelector(event.target.dataset.section).scrollIntoView({
                behavior: 'smooth' // make it smooth when it scroll to
            });
        });
    });
};
/* ===============================  END FUNCTIONS =============================== */

// add the nav links to the navbar based on number of the sections
for (let index = 0; index < sections.length; index++) creatNewNavLink();

/**
 * 
 * declare a global variable here coz it won't be working if it's been declared at the beginning of script
 * and that due to creating function that creates those navbar links first
 * get all navbar links
 */
let navbarLinks = document.querySelectorAll('ul .menu__link');
// call scrollTosSection on the navbar links 
scrollToSection(navbarLinks);

// call visibility for the btn go to top
visibilityScrollTopBtn();

// click on go to top btn
goTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0; // for safari
    document.documentElement.scrollTop = 0; // for chrome and others 
});


/* 
   add event of scroll on window 
   to add and remover active class 
   from both sections and nav links
 */
window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
        const sectionHeight = section.clientHeight;
        if ((section.getBoundingClientRect().top + sectionHeight / 3) < window.innerHeight) {
            sections.forEach(e => e.classList.remove('active'));
            section.classList.add('active');

            // assign the current section with its id 
            currentSection = section.dataset.nav;
            // loop on nav links 
            navbarLinks.forEach(link => {
                // remove active class from all nav links
                link.classList.remove('active');
                // check if the current section equal to data section in nav link
                if (currentSection === link.dataset.nav) {
                    // add active class to the nav link
                    link.classList.add('active');
                }
            });
        }
    });
});

// call function hide and show navbar 
hideShowNavbar();



