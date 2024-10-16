export function encode(params: string) {
    params = encodeURI(params);
    const str = JSON.stringify(params);
    return window.btoa(str);
}

export function decode(str: string) {
    try {
        const jsonStr = window.atob(str);
        const data = JSON.parse(jsonStr);
        if (data.owner && data.owner !== '') {
            data.owner = decodeURI(data.owner);
        }
        if (data.region && data.region !== '') {
            data.region = data.region.toUpperCase();
        }
        return data;
    } catch (e) {
        console.warn(`Invalid decode content:%o`, e);
        return null;
    }
}