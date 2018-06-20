# TBC-Credit-Card-Payment-Gateway-nodejs-library

Nodejs library to make TBC credit card payments work on website!

Please see the php library by plugandplay to follow the important steps` https://github.com/plugandpay/tbc-credit-card-payment-gateway-php-lib

## Usage

- Put Your certificate(converted to .pem) full path and passphrase in RequestEngine.js

```
smsStartTransaction(1, 981, 'client IP address', 'description', 'EN', function(data) {
    console.log(data)
});
```

Inspired by @plugandplay 🙂
