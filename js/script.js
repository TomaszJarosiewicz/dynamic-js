'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.post');
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    console.log(event);

    /* remove class 'active' from all article links  */

    /* [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    /* [DONE] remove class 'active' from all articles */

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
        clickedElement.classList.add('active');
    }

    /* get 'href' attribute from the clicked link */

    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* find the correct article using the selector (value of 'href' attribute) */

    console.log(articleSelector, targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links) {
    link.addEventListener('click', titleClickHandler)
}