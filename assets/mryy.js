function process(e) {
    try {
        e = e || {hitokoto: '这里似乎什么也没有~',from_who: null,from: 'RequestError'};
        const data = typeof e == 'string' ? JSON.parse(e) : e;
        let from;
        if(data.from_who == 'null') {
            from = data.from_who +`(${data.from})`;
        } else {
            from = data.from;
        }
        let content = `<p>${data.hitokoto}</p><hr><p style="float:right">———— ${from}</p>`;
        document.querySelector('#hitokoto').innerHTML = content;
    } catch(ex) {console.error(e,ex)}
}

process()