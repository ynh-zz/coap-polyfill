function CoapRequest(type) {
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

CoapRequest.prototype.open = function (method, uri, async) {
    this.method = method;
    this.uri = uri;
    this.async = async;
};

CoapRequest.prototype.setRequestHeader = function () {

};

CoapRequest.prototype.abort = function () {

};

CoapRequest.prototype.send = function (payload) {
    this.payload = payload;
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/request', this.async);
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
        self.status = o.code;
        self.code = o.code;
        self.responseText = o.payload;
    }

    xhr.onload = function () {
        processResponse();
        self.onload();
    };
    xhr.onerror = function () {
        self.onerror();
    };
    xhr.send(jsondata);
    if (!this.async) {
        processResponse();
    }

};

