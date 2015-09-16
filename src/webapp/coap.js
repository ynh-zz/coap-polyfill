window.coap_proxy = 'http://localhost:8080';

function CoAPRequest(type) {
    this.method = 'GET';
    this.uri = null;
    this.async = true;
    this.onreadystatechange = function () {

    };
    this.readyState = 0;
    this.payload = '';
    this.onload = function () {

    };
    this.onerror = function () {

    };

}

CoAPRequest.prototype.open = function (method, uri, async) {
    this.method = method;
    this.uri = uri;
    this.async = async;
};

CoAPRequest.prototype.setRequestHeader = function () {

};

CoAPRequest.prototype.abort = function () {

};
CoAPRequest.prototype.getAllResponseHeaders = function () {

};

CoAPRequest.prototype.send = function (payload) {
    this.payload = payload;
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', window.coap_proxy + '/request', this.async);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var jsondata = JSON.stringify({
        'method': this.method,
        'url': this.uri,
        'payload': this.payload
    });
    xhr.onreadystatechange = function () {
        self.readyState = xhr.readyState;
        self.onreadystatechange();
    };
    function processResponse() {
        var o = JSON.parse(xhr.responseText);
        if ('error' in o){
            self.error = o.error;
        }else {
            self.error = null;
            self.status = 200;
            self.code = o.code;
            self.responseText = o.payload;
        }
    }

    xhr.onload = function () {
        processResponse();
        if(self.error) {
            self.onerror();
        } else {
            self.onload();
        }
    };
    xhr.onerror = function () {
        self.onerror();
    };
    xhr.send(jsondata);
    if (!this.async) {
        processResponse();
    }

};

function setup_jquery_coap_support(){
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (options.url.indexOf('coap://') === 0) {
            options.xhr = function () {
                return new CoAPRequest();
            };
        }
    });
}
if (window.jQuery) {
    setup_jquery_coap_support()
}