/**
 * @license
 * Copyright 2024 Aluk Library Authors
 * SPDX-License-Identifier: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.aluk = factory());
}(this, function (exports) {
    let aluk;
    let fremwork = function (e, t) {
        let fn = this;
        var ce;
        if (e == '' || e == undefined) {
            ce = '';
        }
        if (e == 'body' || e == 'head') {
            ce = [];
            ce.push(document[e])
        }
        if (typeof (e) == 'string' && checkHtml(e) === false) {
            try {
                ce = document.querySelectorAll(e.toString());
            } catch {
                ce = ''
            }

        } else {
            if (typeof (e) == 'number') {
                ce = '';
            } else {
                if (typeof (e) == 'object') {
                    ce = new Array(e);
                } else {
                    if (checkHtml(e) === true) {
                        ce = new Array(htmlToElement(e));
                    }
                }
            }
        }
        if (ce.length > 1) {
            let c = 0;
            ce.forEach(element => {
                this[c] = element;
                c++;
            });
        } else {
            if (ce.length > 0) {
                this[0] = ce[0];
            }
        }
        Object.defineProperty(this, '$$frem$$', {
            enumerable: false,
            configurable: false,
            value: fn
        })
    }
    fremwork.prototype = {
        remove: function () {
            try {
                let count = 0;
                for (let [key] of Object.entries(this.$$frem$$)) {

                    this[key].remove()
                    count++;
                }
                return count;
            } catch (e) {
                try {
                    this[0].remove();
                    return 1;
                } catch (e) {
                    return 0;
                }

            }
        },
        Prep: function (e, t) {
            t = t || false;
            (t ? window : document).addEventListener(t ? 'load' : 'DOMContentLoaded', e)
        }
    };
    let elements = {};
    elements.applier = fremwork;

    /*

    **/
    let specialTags = [];
    let frame = {
        import: function (url) {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function () {
                new Function(xhr.responseText)();
            });
            xhr.open("GET", url);
            xhr.send();
        },
        export: function (obj) {
            let result;
            if (typeof obj == 'function') {
                try {
                    specialTags.push(new obj(window, aluk.frame.export).tag);
                    aluk.frame.list.push(new (Object.freeze(obj))(window, aluk.frame.export));
                    result = true;
                } catch {
                    result = false;
                }
                finally {
                    return result;
                }
            } else {
                console.warn('Cannot load expansion\n', obj)
                return result = false;
            }
        },
        register: function (e, t) {
            switch (typeof e) {
                case "object":
                    return vailate(e, t);
                case "function":
                    return vailate(new e(window, aluk.frame.export), t);
                default:
                    console.warn('Cannot load expansion\n', e)
                    break;
            }
            function vailate(f) {
                if (aluk(f) == aluk('')) {
                    if (t == false || t == undefined) {
                        console.warn('Cannot load expansion\n', f.constructor);
                        return false;
                    } else {
                        return frame.export(f.constructor);
                    }

                }
                else {
                    return frame.export(f.constructor);
                }
            }
            return false;
        },
        list: []
    }
    let isHtmlElement = function (variable) {
        return variable instanceof Element || variable instanceof HTMLElement;
    }
    let checkHtml = function (htmlStr) {

        var reg = /<[a-z][\s\S]*>/i;

        return reg.test(htmlStr);

    }
    let htmlToElement = function (html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.firstChild;
    }
    let objectToCss = function (obj) {
        return Object.entries(obj)
            .map(([key, value]) => `${key}: ${value};`)
        //.join('\n');
    }
    aluk = function (e, t) { return new elements.applier(e, t) }
    aluk.objectToCss = objectToCss;
    aluk.checkHtml = checkHtml;
    aluk.isHtmlElement = isHtmlElement;
    aluk.frame = frame;
    aluk.originalCreateElement = document.createElement;
    Object.defineProperty(document, 'createElement', {
        value: function (tagName) {
            if (specialTags.includes(tagName)) {
                const element = aluk.originalCreateElement.call(document, tagName);
                element.$$aluk_framed$$ = false;
                const foundItem = aluk.frame.list.find(item => item.tag == tagName);
                if (typeof foundItem == 'undefined') return;
                try {
                    const shadow = element.attachShadow({ mode: 'closed' });
                    element.$$aluk_framed$$ = true;
                    shadow.innerHTML = foundItem.inner || '';
                    (async function () { (foundItem.renderer || ((e) => { e }))(element, shadow) })();
                    requestAnimationFrame(async function () { (e.onframe || ((e) => { e }))(t, shadow) })
                } catch { }


                return element;
            } else {
                let element = aluk.originalCreateElement.call(document, tagName);
                Object.defineProperty(element, '$$aluk_framed$$', {
                    value: true,
                    writable: false,
                    enumerable: false
                });
                return element;
            }
        },
        writable: false,
    });
    function frameInvoker() {
        aluk.frame.list.forEach(e => {
            try {
                let els = document.querySelectorAll(e.tag.toString());
                els.forEach(t => {
                    if (t.$$aluk_framed$$ != false) {
                        try {
                            const shadow = t.attachShadow({ mode: 'closed' });
                            Object.defineProperty(t, '$$aluk_framed$$', {
                                value: true,
                                writable: false,
                                enumerable: false
                            });
                            shadow.innerHTML = ('<style class="original-style">' + (e.style || '') + '</style>');
                            shadow.innerHTML += e.inner || '';
                            (async function a() { (e.renderer || ((e) => { e }))(t, shadow) })();

                        } catch { }
                    }
                })
            } catch { }
        })
        requestAnimationFrame(frameInvoker)
    }
    frameInvoker();



    /*

    **/
    exports = aluk;
    return exports;
}))