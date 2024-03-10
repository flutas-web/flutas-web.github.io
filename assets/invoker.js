if (typeof window !== 'undefined') {
	console.log("\n %c Invoke %c https://github.com/Xbodw/Invoke-js \n",
		"color: #fff; background: linear-gradient(90deg, rgba(125,3,214,1) 0%, rgba(3,102,214,1) 50%, rgba(3,214,121,1) 100%); padding:5px 0;",
		"background: #fff;padding:5px 1px;")
}

class Invokelist {
	constructor(result) {
		for (let key in result) {
			this[key] = result[key];
		}
	}
}

if (typeof global !== 'undefined' && global.Object === Object) {
	if(window !== global) {
	global.Invokelist = Invokelist;
	global.invoke = invoke;
	global.scripter = scripter;
	global.isLocalFileUrl = isLocalFileUrl,
		global.combine = combine,
		global.isNetworkUrl = isNetworkUrl,
		module.exports = {
			invoke,
			Invokelist,
			scripter,
			isNetworkUrl,
			isLocalFileUrl
		};
	}
}


/*function scripter(text, queries = {},cleanup = true) {
    const existingFunctions = {};
	let obj,obja;
	if (typeof global !== 'undefined' && global.Object ===
				Object) {
		obj = global;
	} else if(typeof(window) != 'undefined') {
		obj = window;
	} else {
		obj = global;
	}
    for (let key in obj) {
        existingFunctions[key] = obj[key];
    }
    const scriptFn = new Function(text);
    scriptFn();
    const result = {};
	if (typeof global !== 'undefined' && global.Object ===
				Object) {
		obj = global;
	} else if(typeof(window) != 'undefined') {
		obj = window;
	} else {
		obj = global;
	}
    for (let key in obj) {
        if (!existingFunctions.hasOwnProperty(key)) {
            if (Object.keys(queries).length === 0 || queries[key]) {
                result[key] = obj[key];
                if (cleanup) {
                    delete obj[key];
                }
            }
        }
    }

    return new Invokelist(result);
}*/

function scripter(text, queries = {}) {
	const globalObject = typeof window !== 'undefined' ? window : global;

	const initialSnapshot = new Map(Object.entries(globalObject));

	const returner = new Function(text)(globalObject);

	const finalSnapshot = new Map(Object.entries(globalObject));

	const changes = {};

	finalSnapshot.forEach((value, key) => {
		if (!initialSnapshot.has(key) || initialSnapshot.get(key) !== value) {
			changes[key] = value;
		}
	});

	function getNestedValue(obj, path) {
		return path.split('.')
			.reduce((acc, part) => acc && acc[part], obj);
	}

	if (Object.keys(queries)
		.length === 0) {
		if(returner) {
			changes.result = returner;
		}
		return new Invokelist(changes);
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
	if(returner) {
		filteredChanges.result = returner;
	}
	return new Invokelist(filteredChanges);
}




function isLocalFileUrl(url) {
	var localFileRegex = /^[a-zA-Z]:\\.*$/;

	return localFileRegex.test(url);
}

function isNetworkUrl(url) {
	var networkUrlRegex = /^(ftp|http|https|chrome):\/\/.*$/;

	return networkUrlRegex.test(url);
}

async function invoke(url, queries = {}) {
	return new Promise((resolve, reject) => {
		try {
			if (typeof global !== 'undefined' && global.Object ===
				Object && typeof window !='object') {
				if (isNetworkUrl(url)) {
					const https = require('https');
					https.get(url, (response) => {
							let data = '';

							response.on('data', (chunk) => {
								data += chunk;
							});

							response.on('end', () => {
								resolve(scripter(data, queries));
							});
						})
						.on('error', (error) => {
							reject(error);
						});
				} else {
					var pather = combine(url);
					if (isNetworkUrl(url)) {

					} else if (isLocalFileUrl(url)) {
						const fs = require('fs');

						function readLocalFile(filePath) {
							try {
								return fs.readFileSync(filePath, 'utf-8');
							} catch (error) {
								reject('Failed to invoke file:', error);
							}
						}

						var filePath = url;
						var fileContent = readLocalFile(filePath);
						if (fileContent) {
							resolve(scripter(fileContent, queries))
						} else {
							resolve(new Invokelist({}))
						}
					}
				}
			} else {

				if (typeof window !== 'undefined') {
					if (isNetworkUrl(url)) {
						fetch(url, {
								method: 'GET',
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							})
							.then(response => response.text())
							.then(scriptContent => {
								if (scriptContent) {
									resolve(scripter(scriptContent, queries));
								}
							})
							.catch(() => {
								reject(
									`Error loading remote script: \n${url}`
								);
							});
					} else {
						var pather = combine(url);
						if (isNetworkUrl(url)) {
							fetch(url, {
									method: 'GET',
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									}
								})
								.then(response => response.text())
								.then(scriptContent => {
									if (scriptContent) {
										resolve(scripter(scriptContent, queries));
									}
								})
								.catch(() => {
									reject(
										`Error loading remote script: \n${url}`
									);
								});
						} else if (isLocalFileUrl(url)) {
							const fs = require('fs');

							function readLocalFile(filePath) {
								try {
									return fs.readFileSync(filePath, 'utf-8');
								} catch (error) {
									reject('Failed to invoke file:', error);
								}
							}

							var filePath = url;
							var fileContent = readLocalFile(filePath);
							if (fileContent) {
								resolve(scripter(fileContent, queries))
							} else {
								resolve(new Invokelist({}))
							}
						}
					}

				} else {
					if (isNetworkUrl(url)) {

					} else {
						var pather = combine(url);
						if (isNetworkUrl(url)) {
							const https = require('https');
						https.get(url, (response) => {
							let data = '';

							response.on('data', (chunk) => {
								data += chunk;
							});

							response.on('end', () => {
								resolve(scripter(data, queries));
							});
						})
						.on('error', (error) => {
							reject(error);
						});
						} else if (isLocalFileUrl(url)) {
							const fs = require('fs');

							function readLocalFile(filePath) {
								try {
									return fs.readFileSync(filePath, 'utf-8');
								} catch (error) {
									reject('Failed to invoke file:', error);
								}
							}

							var filePath = url;
							var fileContent = readLocalFile(filePath);
							if (fileContent) {
								resolve(scripter(fileContent, queries))
							} else {
								resolve(new Invokelist({}))
							}
						}
					}
				}
			}
		} catch (error) {
			if (error.response) {
				reject(
					`Error executing remote script: \n${error}\n\n${error.response.status} at ${url}`
				);
			} else {
				reject(
					`Error executing remote script: \n${error} at ${url}`
				);
			}

		}
	});
}

function combine(dir) {
	if (typeof process !== 'undefined' && process.versions && process.versions.node) {
		const path = require('path');
		let currentPath = __dirname;
		let combinedPath = path.resolve(currentPath, dir);
		return combinedPath;
	} else if (typeof window !== 'undefined') {
		let currentUrl = new URL(window.location.href);
		let combinedUrl = new URL(dir, currentUrl);
		return combinedUrl.toString();
	} else {
		console.error('Cannot determine the environment or combining paths is not applicable.');
		return null;
	}
}