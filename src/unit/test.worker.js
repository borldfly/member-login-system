onmessage = function(event) {
    let { data } = event;
    postMessage({id: data.id || ''});
};