'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  templateTagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  templateAuthorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
};

const optsSize = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};

let html;

function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const activeLinks = document.querySelectorAll(select.listOf.titles + ' a.active');
  const activeArticles = document.querySelectorAll(select.all.articles);

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
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  const titleList = document.querySelector(opts.titleListSelector);
  let articleId;
  let articleTitle;
  html = '';

  for(let article of articles) {
    articleId = article.getAttribute('id');
    titleList.innerHTML = '';
    titleList.insertAdjacentHTML('afterbegin', opts.titleListSelector);
    articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html += linkHTML;
  }

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll(select.listOf.titles + ' a');

for(let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 99999
  };
  for(let tag in tags){
    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optsSize.tagSizes.count - 1) + 1 );

  return optsSize.tagSizes.classPrefix + classNumber;
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(opts.articleSelector);
  for(let article of articles) {
    html = '';
    const titleList = article.querySelector(select.article.tags);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {
      titleList.innerHTML = '';
      titleList.insertAdjacentHTML('afterbegin', select.article.tags);
      // const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const linkHTMLData = {id: '#tag-' + tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      if(!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      html += linkHTML;
    }

    titleList.innerHTML = html;
  }

  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  // let allTagsHTML = '';
  // for(let tag in allTags) {
  //   const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '">' + tag + '</a> ' + '('+ allTags[tag] +') </li>';
  //   allTagsHTML += tagLinkHTML;
  // }

  // tagList.innerHTML = allTagsHTML;

  const allTagsData = {tags: []};
  for(let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.templateTagCloudLink(allTagsData);

}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagsLinks = document.querySelectorAll('a.active' + select.all.linksTo.tags);
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
  const allLinksToTags = document.querySelectorAll(select.all.linksTo.tags);

  for(let allLinkToTag of allLinksToTags) {
    allLinkToTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  let allTags = {};
  const articles = document.querySelectorAll(opts.articleSelector);

  for(const article of articles){
    const nameAuthor = article.querySelector(select.article.author);
    const titleListAuthor = document.querySelector(select.listOf.authors);
    const authorTags = article.getAttribute('data-author');
    html = '';

    nameAuthor.innerHTML = '';
    nameAuthor.insertAdjacentHTML('afterbegin', select.article.tags);
    // const linkHTML = '<a href="#author-' + authorTags + '">' + authorTags + '</a>';

    const linkHTMLData = {id:'#author-' + authorTags, author: authorTags};
    const linkHTML = templates.authorLink(linkHTMLData);

    html += linkHTML;
    nameAuthor.innerHTML = html;

    const articleTagsArray = authorTags.split(' ');
    for(let tag of articleTagsArray) {
      titleListAuthor.innerHTML = '';
      html = '';
      titleListAuthor.insertAdjacentHTML('afterbegin', select.listOf.authors);
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      if(!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      html += linkHTML;
    }

    titleListAuthor.innerHTML = html;
  }

  const tagList = document.querySelector('.authors');
  // let allTagsHTML = '';
  // for(let tag in allTags) {
  //   const tagLinkHTML = '<li>' + tag + ' ' + '('+ allTags[tag] +') </li>';
  //   allTagsHTML += tagLinkHTML;
  // }

  // tagList.innerHTML = allTagsHTML;
  const allTagsData = {tags: []};
  for(let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
    });
  }
  tagList.innerHTML = templates.templateAuthorCloudLink(allTagsData);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorsLinks = document.querySelectorAll('a.active' + select.all.linksTo.author);
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
  const links = document.querySelectorAll(select.all.linksTo.author);

  for(const link of links) {
    link.addEventListener('click', authorClickHandler);

  }
}

addClickListenersToAuthors();
