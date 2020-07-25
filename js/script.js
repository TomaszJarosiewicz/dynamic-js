'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.post');

    /* remove class 'active' from all article links  */

    /* [IN PROGRESS] add class 'active' to the clicked link */

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

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links) {
    link.addEventListener('click', titleClickHandler)
}

// function generateTitleLinks() {
//     const article = document.querySelector('article');
//     const nameId = article.getAttribute('id');
//     const articleTag = document.querySelector('h3');
//     const list = document.querySelector('li');
//     const createElementLink = document.createElement('a');

//     createElementLink.setAttribute('href', '#' + nameId);
//     createElementLink.innerHTML = '<span>' + articleTag.innerText + '</span>';
//     list.appendChild(createElementLink);

//     console.log(list);
// }

// generateTitleLinks();
