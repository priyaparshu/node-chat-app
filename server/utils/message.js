const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    console.log('from', from);
    console.log('lat', latitude);
    console.log('long', longitude);
    return {

        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()

    };
};

module.exports = { generateMessage, generateLocationMessage };