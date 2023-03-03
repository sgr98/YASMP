export const getDateStr = (datetime) => {
    if (typeof datetime === 'string') datetime = new Date(datetime);

    if (typeof datetime === 'object') {
        let hr = datetime.getHours();
        let min = datetime.getMinutes();
        if (hr < 10) hr = '0' + String(hr);
        if (min < 10) min = '0' + String(min);
        return hr + ':' + min;
    }
    return '';
};

export const getJsonPort = (port, mul=3) => {
    const prt = parseInt(port);
    const ind = prt % 1000;
    return String((mul * 1000) + ind);
};

export const getSendURL = (domain, port, options = []) => {
    let url = domain + ':' + port + "/";
    for (let option of options) {
        url += option + '/';
    }
    return url;
};
