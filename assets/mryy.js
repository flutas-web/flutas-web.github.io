function process(e) {
    try {
        e = e || {hitokoto: '这里似乎什么也没有~',from_who: null,from: 'RequestError'};
        const data = JSON.parse(e);
        let from;
        if(data.from_who == 'null') {
            from = data.from_who +`(${data.from})`;
        } else {
            from = data.from;
        }
        let content = data.hitokoto + '<hr><br>——' + from;
        $('#hitokoto').innerHTML = content;
    } catch {}
}