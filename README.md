# CoAP Polyfill
This plugin enables the creation of CoAP request using client side javascript running in the browser.
On the client side this plugin provides an CoAPRequest object with an API similar to the XMLHttpRequest.
The CoAPRequest object forwards the request definition to a proxy server running on the clients machine using HTTP.
The server performs the CoAP request on behalf of the client and return the response.

## Usage
The CoAP polyfill can be enabled by including the coap.js file hosted by the proxy server.

	<script src="http://localhost:8080/coap.js" type="application/javascript"></script>

Simple coap get request:


    var request = new CoapRequest();
    request.open('GET', 'coap://localhost:5683', true);
    request.onload = function () {
      alert(request.responseText);
    };
    request.send();

Coap requests can also be created using the jQuery API.

    $.get("coap://localhost:5683", function( data ) {
        alert(data);
    });

## Security
The current version of this pluign should only be used for development purposes. To simplify the exchange of web applications using CoAP requests, the proxy server accepts cross-origin requests. Thereby, enabling any website to create CoAP requests (if the proxy server is running on the clients machine). 

The security can be improved by implementing an origin based autorization process, where the user needs to allow the site to access a specific CoAP endpoint (device/service).

## Examples
 - actinium-ui (http://ynh.github.io/actinium-ui)

## Features
- [ ] Observer resources (using websockets)
- [ ] Access permission model
- [x] GET, POST, PUT and DELETE requsts