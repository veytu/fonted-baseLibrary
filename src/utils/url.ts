/**
 * 参数提取
 * 解析hash地址中的query参数。避免query参数中用#作为值。
 * @param locationHash string
 * @returns
 */
function parseHashUrlQuery(locationHash: string): Record<string, any> {
    const searchIndex = locationHash.indexOf('?');
    const hashIndex = locationHash.indexOf('#');
    if (hashIndex != -1 && hashIndex > searchIndex) {
        locationHash = locationHash.split('#')[0];
    }
    if (searchIndex != -1) {
        const str = locationHash.split('?')[1];
        return parseQuery(str);
    }
    return {};
}

function parseQuery(query: string) {
    const strArr = query.split('&');
    const result: any = {};
    for (let i = 0; i < strArr.length; i++) {
        const q = strArr[i];
        // 这里需要注意对base64值的处理，base64中是包含 = 符号的。(分享的传值是通过url传值,值是通过base64加密的)
        const match = q.match('([^=]*)=(.*)');
        if (match && match.length >= 3) {
            result[match[1]] = match[2];
        }
    }
    return result;
}


export {
    parseHashUrlQuery,
    parseQuery
}