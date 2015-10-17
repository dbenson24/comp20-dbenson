Identify what aspects of the work have been correctly implemented and what have not.
Identify anyone with whom you have collaborated or discussed the assignment.
Say approximately how many hours you have spent completing the assignment.
Be written in either text format (README.txt) or in Markdown (README.md). No other formats will be accepted.
# Lab 6 - Messages
## Derek Benson

All requested aspects were implemented.

I collaborated with no one on this assignment.

I spent approximately 45 minutes completing this assignment.

### Is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) or from your local machine (from file:///) from using XMLHttpRequest? Why or why not? 

Yes it is possible, the CORS web standard provides a protocol that allows resources
to define acceptable sources of requests by setting the Access-Control-Allow-Origin
and Access-Control-Allow-Methods headers of the HTTP response. Therefore, as long
as the server is setup to allow transmitting the data you are attempting to access
(this means that the server sets Access-Control-Allow-Origin to a value that
either includes your domain or is the wildcard '*') you will be able to retrieve
the requested data with an XMLHttpRequest.

In this lab, http://messagehub.herokuapp.com/messages.json did not respond to a GET
request because the server does not set the Access-Control-Allow-Origin header.