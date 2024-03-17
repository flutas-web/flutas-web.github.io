const notyf = new Notyf({
    position: { x: 'center', y: 'top' },
    types: [
        {
            type: 'success',
            background: '#99c959',
            duration: 2000,
        },
        {
            type: 'error',
            background: '#e15b64',
            duration: 3000,
        },
        {
            type: 'warning',
            background: '#d7cb48',
            duration: 3000,
        }
    ]
});
notyf.warning = function (t) { t = this.normalizeOptions("warning", t); return this.open(t) }
var that, timer;
var app = new Vue({
    el: '#app',
    data: {
        apiKey: '',
        apiUrl: 'https://api.chatanywhere.tech/v1/chat/completions',
        apiModel: 'gpt-3.5-turbo-1106',
        bcApiUrl: 'https://yewu.bcwhkj.cn/api/v2.',
        Info: {
            wen: '',
            cxtitlecn1: '',
        },
        List: [],
        pageCount: ''
        , count: ''
        , search: {
            page: 1,
            limit: 10,
        },
        showBox: false,
        hsTime: 0,
        tiWenZhong: false,
        duiLie: [
            {
                wen: '',
                cxtitlecn1: '',
                da: 'Flutas AI 已准备就绪',
                cxCount: '',
                time: 0,
                cxaddtime: '',
                hsTime: 0,
            }
        ],
        curDuiLie: 0,
        wenQuWeiList: [],
        lianXu: false,
        KuaiJieList: [],
        history: 1,
        dd: '',

    },
    mounted() {
        that = this;
        if (that.getQV('key')) {
            that.apiKey = that.getQV('key');
            localStorage.tokenTemp = that.apiKey;
        }
        if (localStorage.tokenTemp) {
            that.apiKey = localStorage.tokenTemp;
        }
    },
    methods: {
        save() {
            console.log('保存')
            localStorage.tokenTemp = that.apiKey;
            that.showBox = !that.showBox;
        },

        tiJiaoWenTi() {
            // if(that.tiWenZhong==true){
            //     layer.msg('当前有问题进行中……，请稍候再提交');
            //     return false;
            // }
            // if(that.Info.wen.length>200){
            //     layer.msg('提问的问题内容长度不能超过200个Token(中文一字为2Token)');
            //     return false;
            // }
            console.log('Message Pushed.');
            if (that.Info.wen) {
                //移到页面最下面
                $("html,body").animate({ scrollTop: "9999999px" }, 1800);

                that.tiWenZhong = true;
                that.duiLie.push({
                    wen: that.Info.wen,
                    cxtitlecn1: that.Info.cxtitlecn1,
                    da: '',
                    cxCount: 'loading……',
                    hsTime: 0,
                })

                let postD = {
                    keyword: that.Info.wen
                    , cxtitlecn1: that.Info.cxtitlecn1 ? that.Info.cxtitlecn1 : that.Info.wen
                    , token: localStorage.tokenTemp
                    , history: that.history
                }
                let lastNo = that.duiLie.length - 1;


                //启用连续对话
                if (that.lianXu && that.duiLie.length > 1) {
                    postD.keyword = '';
                    postD.keyword = postD.keyword + 'Q: 请你后续所有回复请优先用中文做答 A: 好的. <|endoftext|>';
                    postD.keyword = postD.keyword + ' Q: ' + that.duiLie[0].wen + ' A: ' + that.duiLie[0].da + '。 <|endoftext|>';
                    that.duiLie.forEach((v, k) => {
                        //限制只提交最近的5个回合内的对话内容提交，以防太长无法提交
                        if (k < lastNo && ((lastNo - k) <= 5) && v.wen && k > 0) {
                            postD.keyword = postD.keyword + ' Q: ' + v.wen + ' A: ' + v.da + '.<|endoftext|>';
                        }
                    })
                    postD.keyword = postD.keyword + ' Q: ' + that.Info.wen + ' A: ';
                }

                //开始计时
                timers = setInterval(() => { that.hsTime++; }, 1000);

                //替换掉连续对话时的一些换行符
                postD.keyword = postD.keyword.replace(/\//g, '');


                that.liuTiJiao(lastNo, postD.keyword, 0);
            }
        },

        getQV(variable)//获取get参数
        {

            //获取get参数
            var getV;
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    getV = decodeURI(pair[1]);
                    return decodeURI(pair[1]);
                }
            }
            return (false);
        },



        liuTiJiao(lastNo, keys, cid) {

            that.Info.wen = '';
            let systemSD = '你是一个AI助手,名为Flutas AI,你的预设性别为女性,且样样精通,你的回答尽量详细一点';
            let openaiId = '';
            var postData = {
                model: that.apiModel,
                messages: [
                    { role: 'system', content: systemSD },
                    { role: 'user', content: keys }
                ],
                stream: true
            };
            console.log('Sumbit:\n', postData);
            var headerss = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + that.apiKey
            };
            let getContents = '', contentCount = 0, contentFirst = '';

            /*
            fetch(that.apiUrl, {
                method: 'post',
                headers: headerss,
                body: JSON.stringify(postData)
            }).then(function (response) {
                let end = setInterval(function () { }, 1000); for (let i = 1; i <= end; i++) { clearInterval(i); }
                $("html,body").animate({ scrollTop: "9999999px" }, 1800);
                let ele = aluk('.layui-anim-up')
                ele = ele.continue('div:not(.layui-clear)');
                if (ele.length > 0) {
                    ele.forEach(e => {
                        if (e > 2) {
                            e.firstChild.innerHTML = app.duiLie[ele.indexOf(e)].da;
                        }
                    })
                }
                that.hsTime = 0;
                let reader = response.body.getReader()
                let pump = () => {
                    return reader.read().then(({ value, done }) => {
                        if (done) {
                            console.log('Reponsed.')
                            that.tiWenZhong = false;
                            return false;
                        }
                        let s = that.Utf8ArrayToStr(value);
                        try {
                            let returnD = JSON.parse(s);
                            if (returnD.error.code) {
                                if (returnD.error.code == 'context_length_exceeded') {
                                    notyf.error('提交的全文字符过长,可取消连续对话或是刷新页面');
                                } else if (returnD.error.code == 'rate_limit_exceeded') {
                                    notyf.error('同时段提交人数过多,请检查');
                                } else if (returnD.error.code == 'internal_error') {
                                    notyf.error('API接口维护中');
                                } else if (returnD.error.message == 'Bad gateway.') {
                                    notyf.error('API接口维护中');
                                } else {
                                    notyf.error(returnD.error.message);

                                }
                                that.tiWenZhong = false;
                                return false;
                            }
                            if (returnD.codes != 200) {
                                notyf.error(returnD.mess);

                                that.duiLie.splice(that.duiLie.length - 1, 1);
                                that.tiWenZhong = false;
                                //that.reSets();
                                return false;
                            }
                        } catch (e) {
                            //console.log('返回内容无JSON格式，可能是流式内容，继续执行')
                        }


                        s = s.replace(/\n/g, "");
                        s = s.replace(/data\: /g, '')
                        s = s.replace(/\[DONE\]/g, '')
                        //s = s.replace(/\s+/g, '');

                        getContents = getContents + s;
                        getContents = getContents.replace(/}{/g, '}---{');
                        let jsonObjects = getContents.split('---');

                        that.duiLie[lastNo].da = '';
                        try {
                            that.duiLie[lastNo].da = '';
                            jsonObjects.forEach((v, k) => {
                                //console.log('v', v);
                                try {
                                    let ss = JSON.parse(v);
                                    if (typeof ss.choices[0].delta.content != 'undefined') {
                                        that.duiLie[lastNo].da += ss.choices[0].delta.content;
                                    }
                                } catch (ee) {

                                }
                            })
                            that.duiLie[lastNo].da = marked.parse(that.duiLie[lastNo].da)
                        } catch (e) {
                            that.Info.wen = '';
                            that.Info.cxtitlecn1 = '';
                            that.tiWenZhong = false;
                            notyf.error('Sse已中断链接.')
                        }
                        return pump()
                    })
                }
                pump()
            }).catch(function (err) {
                notyf.error('NetWork error: 无法请求接口\n请稍侯重试');
            })
            */

            aluk.ajax({
                url: that.apiUrl, 
                method: 'post',
                headers: headerss,
                body: JSON.stringify(postData)
            }).then(function (response) {
                let end = setInterval(function () { }, 1000); for (let i = 1; i <= end; i++) { clearInterval(i); }
                $("html,body").animate({ scrollTop: "9999999px" }, 1800);
                let ele = aluk('.layui-anim-up')
                ele = ele.continue('div:not(.layui-clear)');
                if (ele.length > 0) {
                    ele.forEach(e => {
                        if (e > 2) {
                            e.firstChild.innerHTML = app.duiLie[ele.indexOf(e)].da;
                        }
                    })
                }
                that.hsTime = 0;
                let reader = response.body.getReader()
                let pump = () => {
                    return reader.read().then(({ value, done }) => {
                        if (done) {
                            console.log('Reponsed.')
                            that.tiWenZhong = false;
                            return false;
                        }
                        let s = that.Utf8ArrayToStr(value);
                        try {
                            let returnD = JSON.parse(s);
                            if (returnD.error.code) {
                                if (returnD.error.code == 'context_length_exceeded') {
                                    notyf.error('提交的全文字符过长,可取消连续对话或是刷新页面');
                                } else if (returnD.error.code == 'rate_limit_exceeded') {
                                    notyf.error('同时段提交人数过多,请检查');
                                } else if (returnD.error.code == 'internal_error') {
                                    notyf.error('API接口维护中');
                                } else if (returnD.error.message == 'Bad gateway.') {
                                    notyf.error('API接口维护中');
                                } else {
                                    notyf.error(returnD.error.message);

                                }
                                that.tiWenZhong = false;
                                return false;
                            }
                            if (returnD.codes != 200) {
                                notyf.error(returnD.mess);

                                that.duiLie.splice(that.duiLie.length - 1, 1);
                                that.tiWenZhong = false;
                                //that.reSets();
                                return false;
                            }
                        } catch (e) {
                            //console.log('返回内容无JSON格式，可能是流式内容，继续执行')
                        }


                        s = s.replace(/\n/g, "");
                        s = s.replace(/data\: /g, '')
                        s = s.replace(/\[DONE\]/g, '')
                        //s = s.replace(/\s+/g, '');

                        getContents = getContents + s;
                        getContents = getContents.replace(/}{/g, '}---{');
                        let jsonObjects = getContents.split('---');

                        that.duiLie[lastNo].da = '';
                        try {
                            that.duiLie[lastNo].da = '';
                            jsonObjects.forEach((v, k) => {
                                //console.log('v', v);
                                try {
                                    let ss = JSON.parse(v);
                                    if (typeof ss.choices[0].delta.content != 'undefined') {
                                        that.duiLie[lastNo].da += ss.choices[0].delta.content;
                                    }
                                } catch (ee) {

                                }
                            })
                            that.duiLie[lastNo].da = marked.parse(that.duiLie[lastNo].da)
                        } catch (e) {
                            that.Info.wen = '';
                            that.Info.cxtitlecn1 = '';
                            that.tiWenZhong = false;
                            notyf.error('Sse已中断链接.')
                        }
                        return pump()
                    })
                }
                pump()
            }).catch(function (err) {
                notyf.error('NetWork error: 无法请求接口\n请稍侯重试');
            })


        },

        Utf8ArrayToStr: function (array) {
            var out, i, len, c;
            var char2, char3;

            out = "";
            len = array.length;
            i = 0;
            while (i < len) {
                c = array[i++];
                switch (c >> 4) {
                    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                        // 0xxxxxxx
                        out += String.fromCharCode(c);
                        break;
                    case 12: case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = array[i++];
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = array[i++];
                        char3 = array[i++];
                        out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                        break;
                }
            }

            return out;
        },
        //
        // /**
        //  * @return post请求方法
        //  */
        // PostUrl(urls, postData,callback,title='') {
        //     // if(postData.token){
        //     //     postData.token=kimi(postData.token);
        //     // }
        //     let start = new Date().getTime()
        //
        //     axios.post(urls, postData)
        //         .then(function (res) {
        //             let data = res.data;
        //             let end = new Date().getTime();
        //             let useTime =end - start;
        //             console.log('%cPostReturn - '+ title,'background-color:green;padding:3px;color:#fff',data,'PostUrl:'+urls,'PostData',postData,'计时:',useTime,' ms');
        //             callback(data);
        //
        //         })
        //         .catch(function (error) {
        //             let end = new Date().getTime();
        //             let useTime =end - start;
        //             console.log('%cError PostReturn - '+ title,'background-color:green;padding:3px;color:#fff',error,'PostUrl:'+urls,'PostData',postData,'计时:',useTime,' ms');
        //             callback(error);
        //         });
        // },
        /**
         * @return 当前时间
         */
        Now() {
            return moment().get('year') + '-' +
                (moment().get('month') + 1) + '-' +
                moment().get('date') + ' ' +
                moment().get('hour') + ':' +
                moment().get('minute') + ':' +
                moment().get('second');
        },




    }
});

