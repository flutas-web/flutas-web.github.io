/**
 * @license
 * Copyright 2024 Invoker Authors
 * SPDX-License-Identifier: MIT
 */

!function (t, e) { if (typeof exports === 'object' && typeof module !== 'undefined') { e(exports) } else if (typeof define === 'function' && define.amd) { define(["exports"], e) } else { let target = (typeof globalThis !== 'undefined') ? globalThis : (t || self); target.invoker = {}; e(target.invoker) } }(this, (function (t) {
    "use strict";
    class Requirelist {
        constructor(i, url, result) {
            let _this = this;
            let $isChrome = typeof chrome !== 'undefined';
            let $isTopWindow = typeof top === 'object' && typeof window === 'object' && top === window;
            let $isGlobalThisDefined = typeof globalThis !== 'undefined';
            let $isGlobalDefined = $isGlobalThisDefined && typeof globalThis.global !== 'undefined';

            let $$url$$ = url || null;
            let $$result$$ = result || null;
            Object.keys({
                $$url$$,
                $$result$$,
                $isChrome,
                $isTopWindow,
                $isGlobalDefined,
                $isGlobalThisDefined
            }).forEach((k) => {
                Object.defineProperty(_this, k, {
                    writable: false,
                    enumerable: false,
                })
            });
            Object.keys(i).forEach(function (key) {
                Object.defineProperty(_this, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        return i[key];
                    },
                    set: function (v) {
                        try {
                            i[key] = v;
                            return true;
                        } catch { return false }
                    }
                });
            });
        }
    }

    class delegate extends Function {
        constructor(f) {
            if (f == undefined || f == null) throw new ReferenceError(`
            Uncaught TypeError: Failed to create new delegate as \n\n\`\`\`\n${`delegate () { [native code] }`}\n\`\`\`\n\n on ${(typeof globalThis !== 'undefined') ? globalThis : (t || self)}: 1 argument required, but only 0 present.`)
            if (typeof f != 'object') throw new ReferenceError(`
            Uncaught TypeError: Failed to create new delegate as \n\n\`\`\`\n${JSON.stringify(f)}\n\`\`\`\n\n on ${(typeof globalThis !== 'undefined') ? globalThis : (t || self)}: 1 object required, but only 1 other type.`)
            if (typeof f.entry == 'function') {
                if (!(/\{\s*\[native code\]\s*\}/.test('' + f.entry))) {
                    const values = JSON.parse(JSON.stringify(f.args.replace(/'/g, '"')));
                    const variableNames = [];
                    const result = [];

                    for (const value of values
                        .replace(/\[/g, '')
                        .replace(/\]/g, '')
                        .split(',')) {
                        const randomName = '$$$$' + generate(12) + '$$$$$';
                        variableNames.push(randomName);
                        const declaration = `let ${randomName}=${value};`;
                        result.push(declaration);
                    }
                    let arget = result.join();
                    let argresolve = variableNames.join(',');
                    (super(`${arget}\n(${f.entry})(${argresolve})`))();
                }
            }

        }
    }


    function generate(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_$';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }



    function scripter(text, queries = {}, url) {
        const globalObject = typeof window !== 'undefined' ? window : global;

        const initialSnapshot = new Map(Object.entries(globalObject));

        const returner = new Function(text)(t || globalObject);

        const finalSnapshot = new Map(Object.entries(globalObject));

        const changes = {};

        finalSnapshot.forEach((value, key) => {
            if (!initialSnapshot.has(key) || initialSnapshot.get(key) !== value) {
                changes[key] = value;
            }
        });
        Object.entries(changes).forEach(([queryKey, queryValue]) => {
            try {
                delete globalObject[queryKey]
            } catch {
                globalObject[queryKey] = null;
            }
        })

        function getNestedValue(obj, path) {
            return path.split('.')
                .reduce((acc, part) => acc && acc[part], obj);
        }

        if (Object.keys(queries).length === 0) {
            return new Requirelist(changes, url, returner);
        }

        const filteredChanges = {};
        Object.entries(queries)
            .forEach(([queryKey, queryValue]) => {
                const pathParts = queryValue.split('.');
                let base = changes;
                if (pathParts.length > 1) {
                    const nestedValue = getNestedValue(globalObject, queryValue);
                    if (nestedValue !== undefined) {
                        filteredChanges[queryKey] = nestedValue;
                    }
                } else {
                    if (typeof changes[queryValue] !== 'undefined') {
                        filteredChanges[queryKey] = changes[queryValue];
                    }
                }
            });
        return new Requirelist(filteredChanges, url, returner);
    }


    function remote(data, options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            const fs = (typeof require != 'function' && typeof module == 'undefined') ? { readFile: (e) => { return `return ${e}` } } : require('fs');
            const urlRegex = /^(https?|file):\/\/[^\s/$.?#].[^\s]*$/;
            if (urlRegex.test(data)) {
                if (data.startsWith('https://' || 'http://' || 'ftp://')) {
                    fetch(data)
                        .then(response => response.text())
                        .then((e) => {
                            resolve(scripter(e, typeof options.queries != 'undefined' ? options.queries : {}, data))
                        })
                        .catch(reject);
                } else {
                    const filePath = data;
                    fs.readFile(filePath, typeof options.encoding != 'undefined' ? options.encoding : 'utf-8', (err, content) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(scripter(content, typeof options.queries != 'undefined' ? options.queries : {}, data));
                        }
                    });
                }
            } else if (data.startsWith('data:')) {
                fetch(data)
                    .then(response => response.text())
                    .then((e) => {
                        resolve(scripter(e, typeof options.queries != 'undefined' ? options.queries : {}, data))
                    })
                    .catch(reject);
            } else {
                const fullPath = combine(data);
                if (fullPath.startsWith('https://' || 'http://' || 'ftp://')) {
                    fetch(fullPath)
                        .then(response => response.text())
                        .then((e) => {
                            scripter(e, typeof options.queries != 'undefined' ? options.queries : {}, data);
                        })
                        .catch(reject);
                } else {
                    const filePath = fullPath.replace('file://', '');
                    fs.readFile(filePath, typeof options.encoding != 'undefined' ? options.encoding : 'utf-8', (err, content) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(scripter(content, typeof options.queries != 'undefined' ? options.queries : {}, data));
                        }
                    });
                }
            }
        });
    }


    function invoke() {
        console.log('Invoker.invoke() is not allowed in later versions.')
    }

    function combine(dir,b) {
        if (typeof process !== 'undefined' && process.versions && process.versions.node) {
            const path = require('path');
            let currentPath = __dirname;
            let combinedPath = path.resolve(currentPath, dir);
            return combinedPath;
        } else if (typeof window !== 'undefined') {
            let currentUrl = new URL(window.location.href);
            let combinedUrl = new URL(dir, currentUrl);
            typeof b != 'undefined' ? combinedUrl = new URL(b,combinedUrl) : (()=>{})()
            return combinedUrl.toString();
        } else {
            console.error('Cannot determine the environment or combining paths is not applicable.');
            return null;
        }
    }

    class Modulelist {
        constructor(init) {
            this._this = this;
            Object.keys(init).forEach(function (key) {
                Object.defineProperty(_this, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        return i[key];
                    },
                    set: function (v) {
                        try {
                            i[key] = v;
                            return true;
                        } catch { return false }
                    }
                });
            });
        }

        add(v) {
            Object.keys(v).forEach(function (key) {
                Object.defineProperty(this._this, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        return i[key];
                    },
                    set: function (v) {
                        try {
                            i[key] = v;
                            return true;
                        } catch { return false }
                    }
                });
            })
        }

        remove(key) {
            if (this[key] != undefined && this[key] != add && this[key] != remove && this[key].name != undefined) {
                try {
                    delete this[key];
                } catch {
                    this[key] = null;
                } finally {
                    return true;
                }
            }
        }
    }

    t = {
        remote,
        invoke,
        delegate,
        Modulelist,
        combine
    };

    if (typeof globalThis.window == 'object') {
        let target = (typeof globalThis !== 'undefined') ? globalThis : (window || self); target.invoker = t;
        target.modules = new Modulelist({});
        return t;
    } else if (typeof globalThis.global == 'object') {
        globalThis.global.modules = new Modulelist({});
        module.exports = t;
    } else {
        t = { error: 1, code: 200 };
        throw new Error('Invoker cannot run in this environment.')
    }
}))
