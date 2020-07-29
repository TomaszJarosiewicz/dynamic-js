'use strict';

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
  const titleList = document.querySelector('.list.titles');
  let optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  let article = document.querySelectorAll(optArticleSelector, optTitleSelector, optTitleListSelector);
  let articleId;
  let articleTitle;
  let linkHTML;
  let html = '';

  titleList.innerHTML = '';
  titleList.insertAdjacentHTML('afterbegin', linkHTML);

  for(let articles of article) {
    articleId = articles.getAttribute('id');
    articleTitle = articles.querySelector(optTitleSelector).innerHTML;
    linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;
  }

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  let optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';
  let article = document.querySelector(optArticleSelector, optTitleSelector, optTitleListSelector);
  const titleList = article.querySelector(optArticleTagsSelector);
  const articleTags = article.getAttribute('data-tags');
  let html = '';
  console.log(articleTags);
  /* START LOOP: for every article: */

  /* find tags wrapper */

  /* make html variable with empty string */

  /* get tags from data-tags attribute */

  /* split tags into array */

  /* START LOOP: for each tag */

  /* generate HTML of the link */

  /* add generated code to html variable */

  /* END LOOP: for each tag */

  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();
