function getQueryObject(search) {
    search = search.substring(1);
    const reg = /([^?&=]+)=([^&]*)/g;
    const obj = {};
    search.replace(reg, function(rs, $1, $2) {
        const name = decodeURIComponent($1);
        const val = String(decodeURIComponent($2));
        obj[name] = val;
        return rs;
    });

    return obj;
}

console.log(
    getQueryObject('?utm_source=gold_browser_extension')
);
/([^?&=]+)=([^&]*)/g


/([^&=?])=([^&]*)/g

/(\d{1,3})(?=(\d{3})+(?=$|\.))/g
//  const searchObj = new URLSearchParams(search);


