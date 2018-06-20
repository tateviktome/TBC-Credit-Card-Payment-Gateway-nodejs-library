const https = require('https');
const fs = require('fs');
const axios = require('axios');

var submitURL = 'https://securepay.ufc.ge:18443/ecomm2/MerchantHandler';
var certPath = 'Certificate full path';
var certPassphrase = 'Certificate passphrase';

module.exports = {
    request: function (postParameters, callBack) {
        const agent = new https.Agent({
            cert: fs.readFileSync(certPath),
            key: fs.readFileSync(certPath),
            passphrase: certPassphrase,
            rejectUnauthorized: false
        });
    
        var queryString = buildQuery(postParameters);
    
        axios.post(submitURL, queryString, {
                httpsAgent: agent
            })
            .then(res => callBack(null, res.data))
            .catch(err => callBack(err, null));
    }
}

//helpers
function buildQuery(formdata, numeric_prefix, arg_separator) {
    var value, key, tmp = [],
        that = this;

    var _http_build_query_helper = function(key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
            val = "1";
        } else if (val === false) {
            val = "0";
        }
        if (val !== null && typeof(val) === "object") {
            for (k in val) {
                if (val[k] !== null) {
                    tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
                }
            }
            return tmp.join(arg_separator);
        } else if (typeof(val) !== "function") {
            return urlencode(key) + "=" + urlencode(val);
        } else if (typeof(val) == "function") {
            return '';
        } else {
            throw new Error('There was an error processing for http_build_query().');
        }
    };

    if (!arg_separator) {
        arg_separator = "&";
    }
    for (key in formdata) {
        value = formdata[key];
        if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
        }
        tmp.push(_http_build_query_helper(key, value, arg_separator));
    }

    return tmp.join(arg_separator);
};

function urlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};