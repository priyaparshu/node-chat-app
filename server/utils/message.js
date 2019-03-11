

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    console.log('from', from);
    console.log('lat', latitude);
    console.log('long', longitude);
    return {

        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()

    };
};

module.exports = { generateMessage, generateLocationMessage };