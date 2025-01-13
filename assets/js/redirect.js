(function ({ gt, win, con, doc }) {

    let lastid = '';
    
    let funcs = {
        a: () => { return typeof win.location.hash !== 'undefined' ? win.location.hash.startsWith('#/') : false },
        b: () => {
            let t = win.location.hash.split('#/')[1];
            switch (true) {
                case t.startsWith('a'):
                    return { type: 'article', 'id': t.substring(1).split('?')[0] }
                default:
                    return { type: 'undefined', 'id': '00' };
            }
        },
        c: (f, e) => { con.log(f, e == undefined ? '' : e) },
        crm: (content) => {
            try {
                if (aluk(`flutas-main`).length === 0 || aluk(`flutas-main`).length === undefined) {
                    gt.flutas_main = document.createElement('flutas-main');
                    doc.body.appendChild(gt.flutas_main);
                }
                gt.flutas_main.shadow = gt.flutas_main.getShadowRoot();
                gt.flutas_main.shadow.querySelector('.flutas-main.inner').innerHTML = marked.parse(content.content);
                doc.title = content.title + ` - Flutas`;
            } catch (t) {
                funcs.c('error loading page', t);
            }

        },
        loadf: (json) => {
            funcs.crm(json);
        },
        loade: (e) => { funcs.crm(e); }
    }
    let redirect = {
        article: {
            init: (id) => {
                lastid = id;
                fetch(`../registry/saves/${id}.json`).then((res) => res.json()).then(f => { funcs.loadf(f) }).catch(e => { funcs.loade(e) })
            }
        },
        notice: {
            init: (id) => {
                lastid = id;
                fetch(`../registry/notices/${id}.json`).then((res) => res.json()).then(f => { funcs.loadf(f) }).catch(e => { funcs.loade(e) })
            }
        }
    };
    gt.funcs = funcs;

    if (funcs.a()) {
        let t = funcs.b();
        switch (t.type) {
            case 'article':
                redirect.article.init(t.id);
                break;
            case 'notice':
                redirect.notice.init(t.id);
                break;
            default:
                redirect.article.init('00');
                break;
        }
    } else {
        redirect.article.init('00');
    }




    function scrollToElement(elementId) {
        const element = gt.flutas_main.shadow.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动
        } else {
            console.log('元素未找到:', elementId);
        }
    }

    function scrollToEle() {
        let params = new URLSearchParams(win.location.hash.split('?')[1]);
        let posValue = params.get('pos');
        if(posValue != null) {
            try {
                scrollToElement(posValue);
            } catch {}  
        }
    }
    // 定义要执行的函数
    function onUrlChange() {
        if (!funcs.a()) {
            redirect.article.init('00');
        } else {
            if(lastid !== funcs.b().id) {
                redirect[funcs.b().type].init(funcs.b().id);
            }
        }
        scrollToEle();
    }
    win.addEventListener('hashchange', onUrlChange);
    win.addEventListener('popstate', onUrlChange);

}
)({
    gt: globalThis,
    win: window,
    con: console,
    doc: document
});