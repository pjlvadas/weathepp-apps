Weathepp_js is the JavaScript incarnation of my weather app, which integrates mutliple web-based APIs with basic HTML/CSS.

The GoogleMaps API is used to generate a static road map based on the location entered by a user. The map is centered on the geo-coordinates of the user-input locaion, then used as the background for a pre-existing div.

The OpenWeather API returns the location name, temperature, and cloud conditions for the location entered by a user in the input bar. These details are appended to a prexisting div.

The Flickr API returns two images based on the response from the OpenWeather API. 
- One image is generated based on the location name; it returns a random image from a search of Flickr's Getty Images collection using the location name as a tag. 
- Another image is generated based on the weather conditions description; it returns a single random image from a search within a specific Flickr Group using the 'main' weather response as a tag.