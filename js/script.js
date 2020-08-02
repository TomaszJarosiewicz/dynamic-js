'use strict';

let optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';
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

function generateTitleLinks(customSelector = '') {
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  const titleList = document.querySelector(optTitleListSelector);
  let articleId;
  let articleTitle;
  html = '';

  for(let article of articles) {
    articleId = article.getAttribute('id');
    titleList.innerHTML = '';
    titleList.insertAdjacentHTML('afterbegin', optTitleListSelector);
    articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;
  }

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles) {
    html = '';
    const titleList = article.querySelector('.post-tags .list');
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {
      titleList.innerHTML = '';
      titleList.insertAdjacentHTML('afterbegin', optArticleTagsSelector);
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html += linkHTML;
    }

    titleList.innerHTML = html;
  }
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let activeTagLink of activeTagsLinks) {
    activeTagLink.classList.remove('active');
  }

  for(let allTagLink of allTagsLinks) {
    allTagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  for(let allLinkToTag of allLinksToTags) {
    allLinkToTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {

  const articles = document.querySelectorAll(optArticleSelector);

  for(const article of articles){
    const nameAuthor = article.querySelector(optArticleAuthorSelector);
    const authorTags = article.getAttribute('data-author');
    html = '';
    nameAuthor.innerHTML = '';
    nameAuthor.insertAdjacentHTML('afterbegin', optArticleTagsSelector);
    const linkHTML = '<a href="#author-' + authorTags + '">' + authorTags + '</a>';

    html += linkHTML;
    nameAuthor.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(const activeAuthorLink of activeAuthorsLinks) {
    activeAuthorLink.classList.remove('active');
  }

  for(const authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');

  for(const link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
