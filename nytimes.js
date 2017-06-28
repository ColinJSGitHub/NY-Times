

// Authorization key variable for accessing the New York Times Search API
var authKey = "385743f16a164750a0bb1d02f6c57ba0";


$(document).ready(function(){

	// When we click the Search button on the form, the function below runs.
	// Note: you must have e to represent the 'event' so we can preventDefault() down below. 
	$('#search').on('click', function(e){



		// Grabs the values of input fields when the form is submitted.
		var qID = $('#searchTerm').val();
		var records = $('#numberOfRecordsToRetrieve').val(); 
		var bDate = $('#startYear').val();
		var eDate = $('#endYear').val();

		// The base URL for the New York Times search API.
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

		// By using the base URL and using the param method in jQuery, we create the API query properites and insert the 
		// values from the input fields above. 
		url += '?' + $.param({
  		'api-key': authKey,
  		'q': qID,
  		'page': records,
  		'begin_date': bDate,
  		'end_date': eDate


		});

		// This prevents the default submission method in the form: 
		// Effectively prevents page from reloading so we dont lose the data
		e.preventDefault();

		// AJAX call to the New York Times API 
		$.ajax({
  			url: url,
  			method: 'GET'
		}).done(function(response) {

			// Console logs the response from the API so we can navigate the object tree.
  			console.log(response);

  			// Due to the extreme length of the object tree, we create a variable for easy reuse. 
  			var results = response.response.docs;

  			// We then loop through the array and create places for it in the html document.
  			for(var i = 0; i<results.length; i++){

          var count = 0;
          var newSpan = $('<span>').addClass('numForList');
  				var newDiv = $('<div>').addClass('resultsDiv');
  				var titleP = $('<p>');
  				var abstractP = $('<p>').addClass('fontForSub');
          var newOl = $('<ol>');
          var newLi = $('<li>');
  				var webURL = results[i].web_url; 
  				var titleA = $('<a>').attr('href', webURL);
  				var articleTitle = results[i].headline.main;
  				var articleAbstract = results[i].abstract;
          var pubDate = results[i].pub_date;
          

  				// Some of the abstracts are null in the responses;
  				// We want to place something in the html,
  				// So if the abstract is null we use the snippet instead.
  				if (articleAbstract === null){

  					var articleAbstract = results[i].snippet;
  				}

  				// Now that everything is in place, we append these properties to the HTML to create a display for each article.
  				$('#topArticles').append(newDiv);

  				titleA.append(titleP);
  				newDiv.append(titleA).append(abstractP);

  				titleP.append(articleTitle);
  				abstractP.append(articleAbstract);

          newDiv.append("Publication date: " + pubDate).addClass('fontForSub');

  			}


  		// In the event of an error, throws an error. 
		}).fail(function(err) {
  			throw err;
		});

	})
})
