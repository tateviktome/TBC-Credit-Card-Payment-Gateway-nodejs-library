const requestEngine = require('./RequestEngine.js');

function parseResult(string, callBack) {
    var newString = string.trim()
    var array1 = newString.split("\n");
    var result = new Array();
    for (var key in array1) {
        var array2 = array1[key].split(":");
        result[array2[0]] = array2[1].trim();
    }
    callBack(result);
}

async function smsStartTransaction(amount, currency, clientIpAddress, description, language, callBack) {
    var postFields = {
        'command': 'v',
        'amount': amount,
        'currency': currency,
        'client_ip_addr': clientIpAddress,
        'description': description,
        'language': language,
        'msg_type': 'SMS'
    }

    var requestt = await requestEngine.request(postFields, function(err, data) {
        if (err) {
            console.log(err, null);
        } else if (data) {
            parseResult(data, function(data) {
                callBack(null, data);
                //trans_id = data["TRANSACTION_ID"];

                var form = '<html><head><title>TBCPAY</title><script type="text/javascript" language="javascript">function redirect() {document.returnform.submit();}</script></head><body onLoad="javascript:redirect()"><form name="returnform" action="https://securepay.ufc.ge/ecomm2/ClientHandler" method="POST"><input type="hidden" name="trans_id" value="' + data["TRANSACTION_ID"] + '"><noscript><center>Please click the submit button below.<br><input type="submit" name="submit" value="Submit"></center></noscript></form></body>';
                console.log('TBC Pay enter credentials page >>>>>>> ', form); 
            });
        }
    })
}

async function requestData(postFields, callBack) {
    var requestt = await requestEngine.request(postFields, function(err, data) {
        if (err) {
            console.log(err);
            callBack(err, null);
        } else if (data) {
            parseResult(data, function(data) {
                callBack(null, data);
            });
        };
    })
}

function dmsStartAuth(amount, currency, clientIpAddress, description, language, callBack) {
    var postFields = {
        'command': 'a',
        'amount': amount,
        'currency': currency,
        'client_ip_addr': clientIpAddress,
        'description': description,
        'language': language,
        'msg_type': 'DMS'
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function dmsMakeTransaction(amount, currency, clientIpAddress, description, language, callBack) {
    var postFields = {
        'command': 't',
        'amount': amount,
        'currency': currency,
        'client_ip_addr': clientIpAddress,
        'description': description,
        'language': language,
        'msg_type': 'DMS'
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function getTransResult(transId, callBack) {
    var postFields = {
        'command': 'c',
        'trans_id': transId,
        'client_ip_addr': clientIpAddress
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function reverseTrans(transId, amount, callBack) {
    var postFields = {
        'command': 'r',
        'trans_id': transId,
        'amount': amount,
        'suspected_fraud': 'yes'
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function refundTrans(transId, callBack) {
    var postFields = {
        'command': 't',
        'trans_id': transId
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function creditTrans(transId, callBack) {
    var postFields = {
        'command': 'g',
        'trans_id': transId
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function closeDay(callBack) {
    var postFields = {
        'command': 'b'
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

//regular payments with first payment
function startSMSTransRP(amount, currency, clientIpAddress, language, description, recPaymentId, expiry, callBack) {
    var postFields = {
        'command': 'z',
        'amount': amount,
        'currency': currency,
        'client_ip_addr': clientIpAddress,
        'language': language,
        'description': description,
        'msg_type': 'SMS',
        'biller_client_id': recPaymentId,
        'perspayee_expiry': expiry,
        'perspayee_gen': 1
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function startDMSAuthRP(amount, currency, clientIpAddress, language, description, recPaymentId, expiry, callBack) {
    var postFields = {
        'command': 'd',
        'amount': amount,
        'currency': currency,
        'client_ip_addr': clientIpAddress,
        'language': language,
        'description': description,
        'msg_type': 'DMS',
        'biller_client_id': recPaymentId,
        'perspayee_expiry': expiry,
        'perspayee_gen': 1
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

//regular payments without first payment for a certain amount
function registerRP(currency, language, clientIpAddress, description, recPaymentId, expiry, callBack) {
    var postFields = {
        'command': 'p',
        'currency': currency,
        'client_ip_addr': clientIpAddress,
        'language': language,
        'description': description,
        'msg_type': 'AUTH',
        'biller_client_id': recPaymentId,
        'perspayee_expiry': expiry,
        'perspayee_gen': 1
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}

function makeRP(amount, currency, clientIpAddress, description, recPaymentId, callBack) {
    var postFields = {
        'command': 'e',
        'amount': amount,
        'currency': currency,
        'client_ip_addr': clientIpAddress,
        'description': description,
        'biller_client_id': recPaymentId,
    }

    requestData(postFields, function (err, data) {
        callBack(err, data);
    })
}
