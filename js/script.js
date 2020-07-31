'use strict';

let optArticleSelector = '.post';
let optTitleSelector = '.post-title';
let optTitleListSelector = '.titles';
let optArticleTagsSelector = '.post-tags .list';
const articles = document.querySelectorAll(optArticleSelector);
let html;

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  const activeArticles = document.querySelectorAll('.post');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    clickedElement.classList.add('active');
  }

  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
}

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  let articleId;
  let articleTitle;
  html = '';

  titleList.innerHTML = '';
  titleList.insertAdjacentHTML('afterbegin', optTitleListSelector);

  for(let article of articles) {
    articleId = article.getAttribute('id');
    articleTitle = article.querySelector(optTitleSelector).innerHTML;
    optTitleListSelector = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += optTitleListSelector;
  }

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags() {

  for(let article of articles) {
    html = '';
    const titleList = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {
      titleList.innerHTML = '';
      titleList.insertAdjacentHTML('afterbegin', optArticleTagsSelector);
      optArticleTagsSelector = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html += optArticleTagsSelector;
    }

    titleList.innerHTML = html;
  }
}

generateTags();

