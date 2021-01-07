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
/**
 * Define Global Variables
 * 
 */
// global varibal for navigation 
const navBar = document.querySelector('#navbar__list');

// global varibale for all section
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * 
 * Start Helper Functions
 * 
 */
// cheack if the element in the viewpoet or not
function isInViewport(e) {
  const rect = e.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */
// Aos collapsible effects for sections

// main function to call all function
const init = () => {
  bulidNavItem(); //create and bulid navigation.
  scrollToLink(); // scroll to target section.
  AOS.init(); // Aos collapsible effects for sections
}

// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// function to create and bulid navigation.
const bulidNavItem = () => {

  // set firstLink as true before entring the loop to apply it to the first link. 
  let firstLink = true;
  var fragment = document.createDocumentFragment();

  //looping throug all sections.
  sections.forEach(section => {

    // get section attribute id & data-nav and assign each to it's own variable 
    const sectionId = section.id;
    const dataNav = section.dataset.nav;

    // create li and anchor tag
    const listItem = document.createElement('li');
    const linkItem = document.createElement('a');

    // get text for the anchor from data-nav attribute from each section
    linkItem.textContent = `${dataNav}`;

    // set href attribute for the anchor
    linkItem.setAttribute('href', `#${sectionId}`);

    // set class attribute for the anchor menu__link + cheack if firstLink is true add link__active otherwise empty.
    linkItem.setAttribute('class', `menu__link ${firstLink ? "link__active": ""}`);

    // add linkItem Node to listItem Node.
    listItem.append(linkItem);

    // add listItem Node to fregment.
    fragment.append(listItem);

    // after first ittration set firstLink value to flase.
    firstLink = false;
  });
  // append all elements to the navigation.
  navBar.append(fragment);
}

// Scroll to section on link click;
scrollToLink = () => {

  // event listener to know if the user click on a particular element in the navBar items.
  navBar.addEventListener('click', (e) => {

    // Don't navigate!
    e.preventDefault();

    // get target link
    const link = e.target;

    // get the target section   
    const sectionID = link.getAttribute('href');
    const section = document.querySelector(`${sectionID}`);

    // get menu link that have active class
    const activelink = document.getElementsByClassName('link__active');

    // remove old active link class
    activelink[0].classList.remove('link__active');
    // add new active link class
    link.classList.add('link__active');

    // scroll to the target section 
    section.scrollIntoView({
      behavior: "smooth"
    });
  });
}

const toggleActive = () => {
  // event listen when user scroll throgh the page
  document.addEventListener('scroll', () => {
    // get all sections
    for (let section of sections) {
      // returen boolean value from isInViewport
      const onScreen = isInViewport(section);
      // if the section is in the view port add active class to current section
      if (onScreen) {
        section.classList.add('your-active-class');
        // link.classList.add('active');
      } else {
        section.classList.remove('your-active-class');
        // link.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', toggleActive);

init();
