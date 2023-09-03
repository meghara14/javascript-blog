'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');


  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list';

function authorLink(data) {
  return `<a href="#author-${data.id}">${data.title}</a>`;
}

function generateTitleLinks(customSelector = '') {

  console.log('customSelector;');

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;


  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function tagArticleLink(data) {
  return `<a href="#tag-${data.id}">${data.title}</a>`;
}

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }

  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function tagCloudLink(data) {
  const tagHTML = data.tags.map(tagData => {
    return `<li><a class="${tagData.className}" href="#tag-${tagData.tag}">${tagData.tag}</a></li>`;
  });

  return tagHTML.join(' ');
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const titleTag = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */

      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = tagArticleLink(linkHTMLData);
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if (!allTags.hasOwnProperty(tag)) {

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    titleTag.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log(tagsParams);

  const allTagsData = { tags: [] };

  /*[NEW] START LOOP: for each tag in allTags: */

  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to allTagsHTML */


    // const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams) +'" href="#tag-' + tag + '">' + tag + '</a></li>';

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    /*[NEW] END LOOP: for each tag in allTags */
  }
  /*[NEW] add HTML for allTagsHTML to tagList: */

  tagList.innerHTML = tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let activeTagLink of activeTagLinks) {

    /* remove class active */

    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('href');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {

    /* add class active */

    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags*="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {

  /* [NEW] create a new variable allAuthors with an empty object */

  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find authors wrapper */

    const titleAuthor = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* gets author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* generate HTML of the link */

    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = authorLink(linkHTMLData);
    console.log(linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */

    if (!allAuthors.hasOwnProperty(articleAuthor)) {

      /* [NEW] add author to allAuthors object */

      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* END LOOP: for each author */

    titleAuthor.innerHTML = html;
  }

  const authorList = document.querySelector(optAuthorsListSelector);

  let allAuthorsHTML = '';
  for (let author in allAuthors) {

    const authorLinkHTML = '<li><a  href="#author-' + author + '">' + author + '</a></li>';
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;

}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');

  /* find all author links with class active */

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */

    activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active author link */

  }

  /* find all author links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each found author link */

  for (let authorLink of authorLinks) {

    /* add class active */
    authorLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author*="' + author + '"]');

}

function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* Start LOOP */

  for (let authorLink of authorLinks) {

    authorLink.addEventListener('click', authorClickHandler);

    /* End LOOP */
  }
}
addClickListenersToAuthors();
