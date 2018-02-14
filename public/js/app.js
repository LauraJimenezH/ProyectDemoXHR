window.addEventListener('load', function() {
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  const btnXhr = document.getElementById('btn-xhr');
  const btnFetch = document.getElementById('btn-fetch');
  let searchedForText;

  btnXhr.addEventListener('click', function() {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  });

  function getNews() {
    const articleRequest = new XMLHttpRequest();

    articleRequest.onreadystatechange = function() {
      if (articleRequest.readyState === 4 && articleRequest.status === 200) {
        const data = JSON.parse(this.responseText);
        const response = data.response;
        articleRequest.onload = addNews(response);
      } else {
        articleRequest.onerror = handleError;
      }
    };
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=731e8751c28d400d85b0136cdf5d0d39`);
    articleRequest.send();
  }

  function handleError() {
    console.log('Se ha presentado un error');
  }


  btnFetch.addEventListener('click', function() {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=731e8751c28d400d85b0136cdf5d0d39`;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        const response = data.response;
        addNews(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  function addNews(response) {
    let docs = response.docs;
    docs.forEach(function(article) {
      if (article.document_type === 'article') {
        const newsDocs =
          `<div class="container justify-content-center marg card" >
          <div class="row card-body">
            <div class = "col-lg-3">
              <img width="100%" src="https://static01.nyt.com/${article.multimedia[0].url}">
            </div>
            <div class = "col-lg-9 col-12 ">
              <h3 class="card-title">${article.headline.main}</h3>
              <p class="card-text">${article.snippet}</p>
              <a class="btn btn-primary text-light">More</a>
            </div>
          </div>
        </div>`;

        responseContainer.innerHTML += newsDocs;
      }
    });
  }
});