$(function() {
console.log('Loaded...');
  $('#search-input').keypress(function(e) {
  	if (e.which === 13) {
  		locationSearch();
  	}
  });
  $('#search-button').click(locationSearch);

  hideWeather();
  hidePics();
});

var weatherCall = function(search) {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather',
		data: {
			q: search,
			units: 'imperial'
		},
		dataType: 'json',
		method: 'GET'
	}).done(renderWeather)
};

var locationSearch = function() {
	weatherCall($('#search-input').val().replace(' ','-'));
	$('#search-input').val('');
};

var emptyResults = function() {
	$('#search-results').empty();
	$('#pic-results').empty();
};

var renderWeather = function(weatherResult) {
	emptyResults();
	var weatherDiv = $('<div>').addClass('weather');
	var cityName = $('<p>').text(weatherResult.name);
	var cityTemp = $('<p>').text(Math.round(weatherResult.main.temp) + '* F');
	var weatherDesc = $('<p>').text(weatherResult.weather[0].description);
	var weatherType = weatherResult.weather[0].main;
	var cityLat = weatherResult.coord.lat;
	var cityLon = weatherResult.coord.lon;

	weatherDiv.append(cityName)
			  .append(cityTemp)
			  .append(weatherDesc);

	$('#search-results').append(weatherDiv);
	getPicCity(cityName.text());
	getPicWeather(weatherType);
	getMap(cityLat, cityLon);

	$('#search-results').show();
};

var hideWeather = function() {
	$('#search-results').on('click', function() {
		$('#search-results').hide();
		$('#pic-results').hide();
	});
};

var hidePics = function() {
	$('#pic-results').on('click', function() {
		$('#search-results').hide();
		$('#pic-results').hide();
	});
};

var getMap = function(cityLat, cityLon) {
	var mapString = [
	'https://maps.googleapis.com/maps/api/staticmap?',
	'center=',
	cityLat,
	',',
	cityLon,
	'&zoom=11&size=5000x5000&maptype=roadmap&scale=2'
	].join('');

	var map = $('<img>').attr('src', mapString);

	$('.weather').css('background-image', 'url(' + mapString + ')');

};

var getPicCity = function(search) {
	$.ajax({
		url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=54d4e94f386164dc9dd315f04090b570&tags='
		     + search 
		     + '&is_getty=true&privacy_filter=1&safe_search=1&per_page=500&page=1&format=json&nojsoncallback=1',
		dataType: 'json',
		method: 'GET'
	}).done(renderPic)
};

var getPicWeather = function(search) {
	$.ajax({
		url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=54d4e94f386164dc9dd315f04090b570&tags='
		     + search 
		     + '&group_id=1463451@N25&privacy_filter=1&safe_search=1&per_page=500&page=1&format=json&nojsoncallback=1',
		dataType: 'json',
		method: 'GET'
	}).done(renderPic)
};

var renderPic = function(pic) {
	debugger;
	var random = Math.floor((Math.random() * (pic.photos.photo.length)) + 1)
	var farmId = pic.photos.photo[random].farm;
	var serverId = pic.photos.photo[random].server;
	var picId = pic.photos.photo[random].id;
	var picSecret = pic.photos.photo[random].secret;

	var picString = [
		'https://farm',
		farmId,
		'.staticflickr.com/',
		serverId,
		'/',
		picId,
		'_',
		picSecret,
		'_q.jpg'
	].join('');

	var img = $('<img>').attr('src', picString);
	$('#pic-results').append(img);

	$('#pic-results').show();
};








