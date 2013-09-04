levis
=====

##To update VIP users.##

Look in the index.html. This contains a list of all VIP users displayed by the search field. There is nothing special about this. To add more users just duplicate the existing html elements for more fields. Note the data attribute `data-username` is used as the term to search for. 

##API end points##
You can find the api endpoints in bootloader.js. There are relevant fields for instagram and twitter containing both the gallery and search endpoints. These can be updated with other end points, but note that the response must be in the same format. This application only works with JSONP responses, so take care that the proper end point is used.


