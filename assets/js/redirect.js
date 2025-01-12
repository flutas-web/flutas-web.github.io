(function ({ gt, win, con, doc }) {
    let funcs = {
        a: () => { return typeof win.location.hash !== 'undefined' ? win.location.hash.startsWith('#/') : false },
        b: () => {
            let t = win.location.hash.split('#/')[1];
            switch (true) {
                case t.startsWith('a'):
                    return { type: 'article', 'id': t.substring(1) }
                default:
                    return { type: 'undefined', 'id': '000' };
            }
        },
        c: (f) => { con.log(f) },
        crm: (content) => {
            try {
                if(aluk(`flutas-main`).length === 0 || aluk(`flutas-main`).length === undefined) {
                    gt.flutas_main = document.createElement('flutas-main');
                    doc.body.appendChild(gt.flutas_main);
                }
                gt.flutas_main.shadow = gt.flutas_main.getShadowRoot();
                gt.flutas_main.shadow.querySelector('flutas-main inner').innerHTML = marked.parse(content.content);
            } catch {
                funcs.c('error loading page');
            }
            
        },
        loadf: (json) => {
            funcs.crm();
        },
        loade: (e) => { funcs.crm(e); }
    }
    let redicrect = {
        article: {
            init: (id) => {
                fetch(`../registry/.saves/${id}.json`).then((res) => res.json()).then(f=>{funcs.loadf(f)}).catch(e => {funcs.loade(e)})
            }   
        },
        notice: {
            init: (id) => {
                fetch(`../registry/.notices/${id}.json`).then((res) => res.json()).then(f=>{funcs.loadf(f)}).catch(e => {funcs.loade(e)})
            }
        }
    };
    gt.funcs = funcs;

    if (funcs.a()) {
        let t = funcs.b();
        switch (t.type) {
            case 'article':
                redicrect.article.init(t.id);
                break;
            case 'notice':
                redicrect.notice.init(t.id);
                break;
            default:
                funcs.c('undefined');
                break;
        }
    } else {
        funcs.c('undefined');
    }
}
)({
    gt: globalThis,
    win: window,
    con: console,
    doc: document
});