"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBatchID = exports.setBeeUrl = exports.doit = void 0;
var bee_js_1 = require("@ethersphere/bee-js");
var mantaray_js_1 = require("mantaray-js");
var mantaray_js_2 = require("mantaray-js");
var FS = __importStar(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var path_2 = require("path");
var promises_1 = require("fs/promises");
var node_http_1 = __importDefault(require("node:http"));
var node_https_1 = __importDefault(require("node:https"));
var httpAgent = new node_http_1.default.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000,
    maxSockets: 1000,
});
var httpsAgent = new node_https_1.default.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000,
    maxSockets: 1000,
});
var axios = require("axios");
axios.default;
axios.defaults.httpAgent = httpAgent;
axios.defaults.httpsAgent = httpsAgent;
axios.defaults.timeout = 10000; // Default of 10 second timeout
var beeUrl = "http://bee-1:1633";
var localBeeUrl = "http://localhost:1633";
var setBeeUrl = function (url) {
    beeUrl = url;
};
exports.setBeeUrl = setBeeUrl;
var batchID = "";
var setBatchID = function (id) {
    batchID = id;
};
exports.setBatchID = setBatchID;
var bee;
try {
    bee = new bee_js_1.Bee(beeUrl);
}
catch (err) {
    showBoth("".concat(err));
}
var tagID = 0;
var progress = "";
var uploadDelay = 0; // msec to sleep after each upload to give node a chance to breathe (0 to disable)
var exitRequested = false;
// # Log related
function specificLocalTime(when) {
    return when.toLocaleTimeString("en-GB"); // en-GB gets a 24hour format, but amazingly local time!
}
function currentLocalTime() {
    return specificLocalTime(new Date());
}
function showTopLine(text) {
    text = currentLocalTime() + " " + text;
    // Save cursor, Home cursor, text, Erase to end of line, Restore cursor
    process.stderr.write("\u001b7" + "\u001b[H" + text + "\u001b[K" + "\u001b8");
}
function showSecondLine(text) {
    var save = "\u001b7";
    var home = "\u001b[H";
    var down = "\u001bD";
    var erase = "\u001b[K";
    var restore = "\u001b8";
    text = currentLocalTime() + " " + text;
    // Save cursor, Home cursor, Down line, text, Erase to end of line, Restore cursor
    //process.stderr.write('\u001b7'+'\u001b[H'+'\u001bD'+text+'\u001b[K'+'\u001b[H'+'\u001bD'+'\u001bD'+'\u001b[K'+'\u001b8')
    process.stderr.write(save + home + down + text + erase + home + down + down + erase + restore);
}
function showError(text) {
    //process.stderr.clearLine(1);
    console.error("\u001b[K" + currentLocalTime() + " " + text);
}
function showLog(text) {
    printStatus(text);
    console.log(currentLocalTime() + " " + text);
}
function showBoth(text) {
    showLog(text);
    showError(text);
}
var pendingStatus = undefined;
function statusPrinter() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(500)];
                case 1:
                    _a.sent();
                    process.stderr.write(pendingStatus + "\u001b[K\r"); // Erase to end of line then return
                    //	process.stderr.clearLine(1); process.stderr.cursorTo(0);
                    pendingStatus = undefined;
                    return [2 /*return*/];
            }
        });
    });
}
function printStatus(text) {
    if (!pendingStatus)
        statusPrinter();
    pendingStatus = text;
}
var hexToBytes = function (hexString) {
    return bee_js_1.Utils.hexToBytes(hexString);
};
var bytesToHex = function (data) {
    if (!data)
        return "*undefined*";
    return bee_js_1.Utils.bytesToHex(data);
};
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function statusDelay(sec) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(sec > 0)) return [3 /*break*/, 2];
                    printStatus("Delaying ".concat(sec, " seconds..."));
                    return [4 /*yield*/, sleep(1000)];
                case 1:
                    _a.sent();
                    sec--;
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
var mime = require("mime-types");
function contentType(path) {
    var mimeType = mime.lookup(path);
    if (!mimeType) {
        mimeType = mime.lookup(".bin");
        if (!mimeType)
            mimeType = "application/octet-stream";
    }
    return mime.contentType(mimeType);
}
var utf8ArrayToStr = (function () {
    var charCache = new Array(128); // Preallocate the cache for the common single byte chars
    var charFromCodePt = String.fromCodePoint || String.fromCharCode;
    var result = Array();
    var hasFromCodePoint = typeof String.fromCodePoint == "function";
    return function (array) {
        var codePt, byte1;
        var buffLen = array.length;
        result.length = 0;
        for (var i = 0; i < buffLen;) {
            byte1 = array[i++];
            if (byte1 <= 0x7f) {
                codePt = byte1;
            }
            else if (byte1 <= 0xdf) {
                codePt = ((byte1 & 0x1f) << 6) | (array[i++] & 0x3f);
            }
            else if (byte1 <= 0xef) {
                codePt =
                    ((byte1 & 0x0f) << 12) |
                        ((array[i++] & 0x3f) << 6) |
                        (array[i++] & 0x3f);
            }
            else if (hasFromCodePoint) {
                codePt =
                    ((byte1 & 0x07) << 18) |
                        ((array[i++] & 0x3f) << 12) |
                        ((array[i++] & 0x3f) << 6) |
                        (array[i++] & 0x3f);
            }
            else {
                codePt = 63; // Cannot convert four byte code points, so use "?" instead
                i += 3;
            }
            result.push(charCache[codePt] || (charCache[codePt] = charFromCodePt(codePt)));
        }
        return result.join("");
    };
})();
// type gotFile = {
//   fullPath: string;
//   entry: Dirent;
// };
// async function* getFileEntries(dir: string): AsyncGenerator<gotFile> {
//   const entries = await readdir(dir, { withFileTypes: true });
//   for (const entry of entries) {
//     const res = resolve(dir, entry.name);
//     yield { fullPath: res, entry: entry };
//   }
// }
function getFiles(dir) {
    return __asyncGenerator(this, arguments, function getFiles_1() {
        var entries, _i, entries_1, entry, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __await((0, promises_1.readdir)(dir, { withFileTypes: true }))];
                case 1:
                    entries = _a.sent();
                    _i = 0, entries_1 = entries;
                    _a.label = 2;
                case 2:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 9];
                    entry = entries_1[_i];
                    res = (0, path_2.resolve)(dir, entry.name);
                    if (!entry.isDirectory()) return [3 /*break*/, 5];
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(getFiles(res))))];
                case 3: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, __await(res)];
                case 6: return [4 /*yield*/, _a.sent()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function executeBinaryAPI(URL, API, params, method, headers, body) {
    if (params === void 0) { params = ""; }
    if (method === void 0) { method = "get"; }
    if (headers === void 0) { headers = {}; }
    if (body === void 0) { body = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var actualURL, doing, start, response, err_1, elapsed, elapsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (params != "")
                        params = "/" + params;
                    actualURL = URL + "/" + API + params;
                    doing = method + " " + actualURL;
                    start = new Date().getTime();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({
                            method: method,
                            url: actualURL,
                            headers: headers,
                            data: body,
                            responseType: "arraybuffer",
                            httpAgent: httpAgent,
                            httpsAgent: httpsAgent,
                            maxContentLength: Infinity,
                            maxBodyLength: Infinity,
                        })];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
                    if (err_1.response) {
                        //showError(actualURL)
                        showError(doing +
                            " " +
                            elapsed +
                            "s response error " +
                            err_1 +
                            " with " +
                            JSON.stringify(err_1.response.data));
                        //showError(JSON.stringify(err.response.data))
                    }
                    else if (err_1.request) {
                        showError(doing + " " + elapsed + "s request error " + err_1);
                        //showError(JSON.stringify(err.request))
                    }
                    else {
                        showError(doing + " " + elapsed + "s other error " + err_1);
                        //showError(JSON.stringify(err))
                    }
                    throw err_1;
                case 4:
                    elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);
                    //showError(actualURL+' response.data='+JSON.stringify(response.data))
                    //showError(doing+' '+elapsed+' response.data='+JSON.stringify(response.data))
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function executeAPI(URL, API, params, method, headers, body) {
    if (params === void 0) { params = ""; }
    if (method === void 0) { method = "get"; }
    if (headers === void 0) { headers = {}; }
    if (body === void 0) { body = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var actualURL, doing, start, response, err_2, elapsed, elapsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (params != "")
                        params = "/" + params;
                    actualURL = URL + "/" + API + params;
                    doing = method + " " + actualURL;
                    start = new Date().getTime();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({
                            method: method,
                            url: actualURL,
                            headers: headers,
                            data: body,
                            httpAgent: httpAgent,
                            httpsAgent: httpsAgent,
                            maxContentLength: Infinity,
                            maxBodyLength: Infinity,
                        })];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
                    if (err_2.response) {
                        //showError(actualURL)
                        showError(doing +
                            " " +
                            elapsed +
                            "s response error " +
                            err_2 +
                            " with " +
                            JSON.stringify(err_2.response.data));
                        //showError(JSON.stringify(err.response.data))
                    }
                    else if (err_2.request) {
                        showError(doing + " " + elapsed + "s request error " + err_2);
                        //showError(JSON.stringify(err.request))
                    }
                    else {
                        showError(doing + " " + elapsed + "s other error " + err_2);
                        //showError(JSON.stringify(err))
                    }
                    throw err_2;
                case 4:
                    elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);
                    //showError(actualURL+' response.data='+JSON.stringify(response.data))
                    //showError(doing+' '+elapsed+' response.data='+JSON.stringify(response.data))
                    return [2 /*return*/, response.data];
            }
        });
    });
}
var runMonitor = true;
function monitorTag(ID) {
    return __awaiter(this, void 0, void 0, function () {
        var lastTag, lastText, nextTime, tag, text, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showLog("Monitoring tag ".concat(ID));
                    _a.label = 1;
                case 1:
                    if (!runMonitor) return [3 /*break*/, 8];
                    if (tagID != ID) {
                        showBoth("Monitoring tag ".concat(ID, " exiting, tagID=").concat(tagID));
                        return [3 /*break*/, 8];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, executeAPI(beeUrl, "tags", "".concat(ID))];
                case 3:
                    tag = _a.sent();
                    text = "TAG ".concat(ID, " sync:").concat(tag.synced, " proc:").concat(tag.processed, " total:").concat(tag.total, " procPend:").concat(tag.total - tag.processed, " syncPend:").concat(tag.processed - tag.synced);
                    if (!lastTag || !lastText || lastText != text) {
                        showTopLine(text);
                        lastText = text;
                        lastTag = tag;
                    }
                    if (!nextTime || new Date() >= nextTime) {
                        showLog("".concat(progress, " ").concat(text));
                        nextTime = new Date(new Date().getTime() + 1 * 60000);
                    }
                    return [4 /*yield*/, sleep(1000)];
                case 4:
                    _a.sent();
                    showSecondLine(progress);
                    return [3 /*break*/, 7];
                case 5:
                    err_3 = _a.sent();
                    showError("monitorTag: ".concat(err_3));
                    return [4 /*yield*/, sleep(10000)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 1];
                case 8:
                    if (lastText)
                        showBoth("Done Monitoring ".concat(ID, " ").concat(lastText));
                    return [2 /*return*/, true];
            }
        });
    });
}
function logDeltaTag(what, startTag, endTag) {
    var text = "".concat(what, " total:").concat(endTag.total - startTag.total, " proc:").concat(endTag.processed - startTag.processed, " sync:").concat(endTag.synced - startTag.synced);
    showLog(text);
    showError(text);
}
function countManifest(node, prefix, indent) {
    if (prefix === void 0) { prefix = ""; }
    if (indent === void 0) { indent = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var count, _i, _a, _b, key, fork, newPrefix, _c, heap;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    count = 0;
                    if (!node.forks) return [3 /*break*/, 4];
                    _i = 0, _a = Object.entries(node.forks);
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    _b = _a[_i], key = _b[0], fork = _b[1];
                    newPrefix = prefix + utf8ArrayToStr(fork.prefix);
                    _c = count;
                    return [4 /*yield*/, countManifest(fork.node, newPrefix, indent + "  ")];
                case 2:
                    count = _c + _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    count++;
                    if (node.isWithPathSeparatorType()) {
                        heap = process.memoryUsage();
                        progress = "Count ".concat(prefix, " rss:").concat(Math.floor(heap.rss / 1024 / 1024), "MB heap:").concat(Math.floor(heap.heapUsed / 1024 / 1024), "/").concat(Math.floor(heap.heapTotal / 1024 / 1024), "MB");
                        showSecondLine(progress);
                        //printStatus(`${indent} ${prefix} => ${count} Node`)
                    }
                    return [2 /*return*/, count];
            }
        });
    });
}
function saveManifest(storageSaver, node, prefix, indent, counts) {
    if (prefix === void 0) { prefix = ""; }
    if (indent === void 0) { indent = ""; }
    if (counts === void 0) { counts = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        var myCount, _i, _a, _b, key, fork, newPrefix, _c, reference, count, ref, err_4, heap, didPercent;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!!counts) return [3 /*break*/, 2];
                    _d = { processed: 0 };
                    return [4 /*yield*/, countManifest(node)];
                case 1:
                    counts = (_d.total = _e.sent(), _d);
                    showBoth("Saving ".concat(counts.total, " manifest nodes"));
                    _e.label = 2;
                case 2:
                    myCount = 0;
                    if (!node.forks) return [3 /*break*/, 6];
                    _i = 0, _a = Object.entries(node.forks);
                    _e.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    _b = _a[_i], key = _b[0], fork = _b[1];
                    newPrefix = prefix + utf8ArrayToStr(fork.prefix);
                    return [4 /*yield*/, saveManifest(storageSaver, fork.node, newPrefix, indent + "  ", counts)];
                case 4:
                    _c = _e.sent(), reference = _c.reference, count = _c.count;
                    //showLog(`save ${newPrefix} => ${bytesToHex(reference)}`)
                    myCount += count;
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    ref = hexToBytes(zeroAddress);
                    _e.label = 7;
                case 7:
                    _e.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, node.save(storageSaver)];
                case 8:
                    ref = _e.sent();
                    showLog("save ".concat(prefix, " => ").concat(bytesToHex(ref)));
                    return [3 /*break*/, 10];
                case 9:
                    err_4 = _e.sent();
                    showBoth("save ".concat(prefix, " ERROR ").concat(err_4));
                    return [3 /*break*/, 10];
                case 10:
                    if (counts)
                        counts.processed++;
                    myCount++;
                    heap = process.memoryUsage();
                    progress = "rss:".concat(Math.floor(heap.rss / 1024 / 1024), "MB heap:").concat(Math.floor(heap.heapUsed / 1024 / 1024), "/").concat(Math.floor(heap.heapTotal / 1024 / 1024), "MB");
                    if (counts && counts.total > 0 && counts.processed > 0) {
                        didPercent = Math.floor((counts.processed / counts.total) * 10000) / 100;
                        progress = "Save ".concat(prefix, " ").concat(didPercent, "% or ").concat(counts.processed, "/").concat(counts.total, " ").concat(progress);
                    }
                    if (node.isWithPathSeparatorType()) {
                        showSecondLine(progress);
                        printStatus("".concat(indent, " ").concat(prefix, " => ").concat(bytesToHex(ref), " Node"));
                    }
                    return [2 /*return*/, { reference: ref, count: myCount }];
            }
        });
    });
}
// TODO CHECK THIS
function storeFileAsPath(fullPath, posixPath, rootNode, coverageCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var mimeType, content, stats, modified, lastModified, metaData, reference, entry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mimeType = contentType(fullPath);
                    return [4 /*yield*/, FS.readFile(fullPath)];
                case 1:
                    content = _a.sent();
                    return [4 /*yield*/, FS.stat(fullPath)];
                case 2:
                    stats = _a.sent();
                    modified = stats.mtime;
                    lastModified = modified.toUTCString();
                    metaData = {
                        "Content-Type": mimeType,
                        Filename: path_1.default.basename(fullPath),
                    };
                    //Object.assign(metaData, { "Last-Modified": lastModified })
                    if (coverageCallback) {
                        if (posixPath.slice(-4).toLowerCase() == ".png") {
                            showError("Need To Parse ".concat(posixPath, " for coverageCallback"));
                        }
                    }
                    printStatus("adding ".concat(fullPath, " as ").concat(posixPath, " type:").concat(mimeType, " modified:").concat(lastModified));
                    return [4 /*yield*/, uploadData(content, posixPath, true)];
                case 3:
                    reference = _a.sent();
                    entry = bytesToHex(reference);
                    if (rootNode) {
                        //showBoth(`adding rootNode Fork for ${fullPath}->${posixPath} reference ${bytesToHex(reference)}`)
                        rootNode.addFork(new TextEncoder().encode(posixPath), reference, metaData);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// async function storeFile(
//   fullPath: string,
//   rootNode: MantarayNode | undefined,
//   rootPath: string,
//   coverageCallback?: (z: number, x: number, y: number) => void
// ) {
//   const relPath = relative(rootPath, fullPath);
//   const posixPath = relPath.split(PATH.sep).join(PATH.posix.sep);
//   const stats = await FS.stat(fullPath);
//   const modified = stats.mtime;
//   return storeFileAsPath(fullPath, posixPath, rootNode, coverageCallback);
// }
function addFile(node, sourcePath, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var stats, modified, modifiedUTC, relPath, posixPath, mimeType, fileString, content, metaData, reference;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, FS.stat(filePath)];
                case 1:
                    stats = _a.sent();
                    modified = stats.mtime;
                    modifiedUTC = modified.toUTCString();
                    relPath = (0, path_2.relative)(sourcePath, filePath);
                    posixPath = relPath.split(path_1.default.sep).join(path_1.default.posix.sep);
                    mimeType = contentType(relPath);
                    // CHECK THIS
                    // if (mimeType == "application/octet-stream") {
                    //   if (posixPath.slice(0, 2) == "A/") mimeType = "text/html";
                    //   else if (posixPath.slice(0, 2) == "M/") mimeType = "text/plain";
                    // }
                    if (mimeType == "application/octet-stream") {
                        fileString = filePath.split(".");
                        if (fileString[fileString.length - 1] === "html")
                            mimeType = "text/html";
                        else if (fileString[fileString.length - 1] === "css")
                            mimeType = "text/plain";
                    }
                    return [4 /*yield*/, FS.readFile(filePath)];
                case 2:
                    content = _a.sent();
                    metaData = { "Content-Type": mimeType, Filename: path_1.default.basename(relPath) };
                    return [4 /*yield*/, uploadData(content, relPath, true)];
                case 3:
                    reference = _a.sent();
                    node.addFork(new TextEncoder().encode(posixPath), reference, metaData);
                    return [2 /*return*/];
            }
        });
    });
}
function newManifest(storageSaver, sourcePath) {
    return __awaiter(this, void 0, void 0, function () {
        var startTag, monTag, node, fileCount, rootMeta, rootFork, rootNode, type, didCount, middleTag, start, refCollection, elapsed, endTag;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bee.createTag()];
                case 1:
                    startTag = _a.sent();
                    tagID = startTag.uid;
                    runMonitor = true;
                    monTag = monitorTag(tagID);
                    showBoth("Creating manifest from ".concat(sourcePath, " using tag ").concat(tagID, " at ").concat(startTag.startedAt));
                    node = new mantaray_js_1.MantarayNode();
                    showBoth("Counting files and generating index");
                    fileCount = 0;
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, f, relPath, heap, e_1_1;
                            var e_1, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _d.trys.push([0, 5, 6, 11]);
                                        _a = __asyncValues(getFiles(sourcePath));
                                        _d.label = 1;
                                    case 1: return [4 /*yield*/, _a.next()];
                                    case 2:
                                        if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 4];
                                        f = _b.value;
                                        relPath = (0, path_2.relative)(sourcePath, f);
                                        fileCount++;
                                        heap = process.memoryUsage();
                                        progress = "rss:".concat(Math.floor(heap.rss / 1024 / 1024), "MB heap:").concat(Math.floor(heap.heapUsed / 1024 / 1024), "/").concat(Math.floor(heap.heapTotal / 1024 / 1024), "MB");
                                        progress = "Count ".concat(fileCount, " ").concat(sourcePath, " ").concat(progress);
                                        _d.label = 3;
                                    case 3: return [3 /*break*/, 1];
                                    case 4: return [3 /*break*/, 11];
                                    case 5:
                                        e_1_1 = _d.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3 /*break*/, 11];
                                    case 6:
                                        _d.trys.push([6, , 9, 10]);
                                        if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 8];
                                        return [4 /*yield*/, _c.call(_a)];
                                    case 7:
                                        _d.sent();
                                        _d.label = 8;
                                    case 8: return [3 /*break*/, 10];
                                    case 9:
                                        if (e_1) throw e_1.error;
                                        return [7 /*endfinally*/];
                                    case 10: return [7 /*endfinally*/];
                                    case 11: return [2 /*return*/];
                                }
                            });
                        }); })()];
                case 2:
                    _a.sent();
                    rootMeta = { "website-index-document": "index.html" };
                    node.addFork(new TextEncoder().encode("/"), hexToBytes(zeroAddress), rootMeta);
                    rootFork = node.getForkAtPath(new TextEncoder().encode("/"));
                    rootNode = rootFork.node;
                    type = rootNode.getType;
                    type |= mantaray_js_2.NodeType.value;
                    type = (mantaray_js_2.NodeType.mask ^ mantaray_js_2.NodeType.withPathSeparator) & type;
                    rootNode.setType = type;
                    // }
                    showBoth("Adding ".concat(fileCount, " files"));
                    didCount = 0;
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, f, relPath, posixPath, heap, didPercent, e_2_1;
                            var e_2, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _d.trys.push([0, 6, 7, 12]);
                                        _a = __asyncValues(getFiles(sourcePath));
                                        _d.label = 1;
                                    case 1: return [4 /*yield*/, _a.next()];
                                    case 2:
                                        if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 5];
                                        f = _b.value;
                                        relPath = (0, path_2.relative)(sourcePath, f);
                                        posixPath = relPath.split(path_1.default.sep).join(path_1.default.posix.sep);
                                        didCount++;
                                        printStatus("queueing ".concat(didCount, "/").concat(fileCount, " ").concat(posixPath));
                                        heap = process.memoryUsage();
                                        progress = "rss:".concat(Math.floor(heap.rss / 1024 / 1024), "MB heap:").concat(Math.floor(heap.heapUsed / 1024 / 1024), "/").concat(Math.floor(heap.heapTotal / 1024 / 1024), "MB");
                                        if (fileCount > 0) {
                                            didPercent = Math.floor((didCount / fileCount) * 10000) / 100;
                                            progress = "Add ".concat(posixPath, " ").concat(didPercent, "% or ").concat(didCount, "/").concat(fileCount, " ").concat(progress);
                                        }
                                        return [4 /*yield*/, addFile(node, sourcePath, f)];
                                    case 3:
                                        _d.sent();
                                        _d.label = 4;
                                    case 4: return [3 /*break*/, 1];
                                    case 5: return [3 /*break*/, 12];
                                    case 6:
                                        e_2_1 = _d.sent();
                                        e_2 = { error: e_2_1 };
                                        return [3 /*break*/, 12];
                                    case 7:
                                        _d.trys.push([7, , 10, 11]);
                                        if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 9];
                                        return [4 /*yield*/, _c.call(_a)];
                                    case 8:
                                        _d.sent();
                                        _d.label = 9;
                                    case 9: return [3 /*break*/, 11];
                                    case 10:
                                        if (e_2) throw e_2.error;
                                        return [7 /*endfinally*/];
                                    case 11: return [7 /*endfinally*/];
                                    case 12: return [2 /*return*/];
                                }
                            });
                        }); })()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sleep(1000)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, bee.retrieveTag(tagID)];
                case 5:
                    middleTag = _a.sent();
                    showBoth("Saving manifest");
                    start = new Date().getTime();
                    return [4 /*yield*/, saveManifest(storageSaver, node)];
                case 6:
                    refCollection = (_a.sent()).reference;
                    elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);
                    showBoth("Final ".concat(sourcePath, " collection reference ").concat(bytesToHex(refCollection), " in ").concat(elapsed, "s"));
                    return [4 /*yield*/, bee.retrieveTag(tagID)];
                case 7:
                    endTag = _a.sent();
                    logDeltaTag("manifest create", startTag, middleTag);
                    logDeltaTag("manifest save", middleTag, endTag);
                    logDeltaTag("manifest total", startTag, endTag);
                    runMonitor = false;
                    return [4 /*yield*/, monTag];
                case 8:
                    _a.sent();
                    return [2 /*return*/, bytesToHex(refCollection)];
            }
        });
    });
}
var zeroAddress = "0000000000000000000000000000000000000000000000000000000000000000";
function printAllForks(storageLoader, node, reference, prefix, indent, what, filter, excludes, manifestOnly, loadFiles, saveFiles) {
    return __awaiter(this, void 0, void 0, function () {
        var err_5, badAddr, types, address, addrString, entry, content, err_6, meta, _i, _a, _b, key, value, _c, _d, _e, key, fork, newPrefix, checkLen, found, _f, excludes_1, exclude;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!reference)
                        return [2 /*return*/];
                    if (exitRequested)
                        return [2 /*return*/];
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, node.load(storageLoader, reference)];
                case 2:
                    _g.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _g.sent();
                    badAddr = bytesToHex(reference);
                    showBoth("printAllForks: Failed to load ".concat(prefix, " address ").concat(badAddr, " ").concat(err_5));
                    return [2 /*return*/];
                case 4:
                    types = "";
                    if (node.isValueType())
                        types = types + "Value ";
                    if (node.isEdgeType())
                        types = types + "Edge ";
                    if (node.isWithPathSeparatorType())
                        types = types + "Separator ";
                    if (node.IsWithMetadataType())
                        types = types + "Meta ";
                    address = node.getContentAddress;
                    addrString = "";
                    if (address)
                        addrString = bytesToHex(address);
                    //showLog(`${indent}type:x${Number(node.getType).toString(16)} ${types} prefix:${prefix} content:${addrString}`)
                    showLog("".concat(indent, "type:x").concat(Number(node.getType).toString(16), " ").concat(types, " prefix:").concat(prefix, " content:").concat(addrString));
                    entry = bytesToHex(node.getEntry);
                    if (!(entry != zeroAddress)) return [3 /*break*/, 8];
                    showLog("".concat(indent, "type:x").concat(Number(node.getType).toString(16), " ").concat(types, " prefix:").concat(prefix, " entry:").concat(entry));
                    if (!(loadFiles && what && what != "")) return [3 /*break*/, 8];
                    _g.label = 5;
                case 5:
                    _g.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, downloadData(entry, prefix)];
                case 6:
                    content = _g.sent();
                    showLog("".concat(indent).concat(prefix, " got ").concat(content.length, " bytes"));
                    return [3 /*break*/, 8];
                case 7:
                    err_6 = _g.sent();
                    showLog("printAllForks:downloadData(".concat(prefix, ") err ").concat(err_6));
                    return [3 /*break*/, 8];
                case 8:
                    if (node.IsWithMetadataType() && node.getMetadata) {
                        meta = "";
                        for (_i = 0, _a = Object.entries(node.getMetadata); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            meta = meta + key + ":" + value + " ";
                        }
                        showLog("".concat(indent, "metadata: ").concat(meta));
                    }
                    if (exitRequested)
                        return [2 /*return*/];
                    if (!node.forks)
                        return [2 /*return*/];
                    _c = 0, _d = Object.entries(node.forks);
                    _g.label = 9;
                case 9:
                    if (!(_c < _d.length)) return [3 /*break*/, 17];
                    _e = _d[_c], key = _e[0], fork = _e[1];
                    newPrefix = prefix + utf8ArrayToStr(fork.prefix);
                    if (!(filter && filter != "")) return [3 /*break*/, 14];
                    checkLen = Math.min(newPrefix.length, filter.length);
                    if (!(newPrefix.slice(0, checkLen) == filter.slice(0, checkLen))) return [3 /*break*/, 13];
                    if (!(checkLen < filter.length)) return [3 /*break*/, 11];
                    showLog("printAllForks:recursing ".concat(newPrefix, " for ").concat(filter));
                    return [4 /*yield*/, printAllForks(storageLoader, fork.node, fork.node.getEntry, newPrefix, indent + "  ", what, filter, excludes, manifestOnly, loadFiles, saveFiles)];
                case 10:
                    _g.sent();
                    return [3 /*break*/, 16];
                case 11:
                    showBoth("printAllForks:Satisfied ".concat(filter, " with ").concat(newPrefix, " ").concat(bytesToHex(fork.node.getEntry)));
                    _g.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    showLog("printAllForks:Ignoring ".concat(newPrefix, " NOT ").concat(filter));
                    return [3 /*break*/, 16];
                case 14:
                    if (excludes && excludes.length > 0) {
                        found = false;
                        for (_f = 0, excludes_1 = excludes; _f < excludes_1.length; _f++) {
                            exclude = excludes_1[_f];
                            if (newPrefix.length >= exclude.length) {
                                if (newPrefix.slice(0, exclude.length) == exclude) {
                                    showBoth("printAllForks:Excluding ".concat(newPrefix));
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (found)
                            return [3 /*break*/, 16];
                    }
                    return [4 /*yield*/, printAllForks(storageLoader, fork.node, fork.node.getEntry, newPrefix, indent + "  ", what, filter, excludes, manifestOnly, loadFiles, saveFiles)];
                case 15:
                    _g.sent();
                    _g.label = 16;
                case 16:
                    _c++;
                    return [3 /*break*/, 9];
                case 17: return [2 /*return*/];
            }
        });
    });
}
// async function dumpManifest(
//   storageLoader: StorageLoader,
//   reference: string,
//   what: string,
//   filter: string | undefined = undefined,
//   excludes: string[] | undefined,
//   manifestOnly = false,
//   loadFiles: Boolean = true,
//   saveFiles: Boolean = false
// ): Promise<MantarayNode> {
//   var start = new Date().getTime();
//   showLog(`dumpManifest:${what} from ${reference} ${filter}`);
//   const node = new MantarayNode();
//   await printAllForks(
//     storageLoader,
//     node,
//     hexToBytes(reference),
//     "",
//     "",
//     what,
//     filter,
//     excludes,
//     manifestOnly,
//     loadFiles,
//     saveFiles
//   );
//   var elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);
//   showBoth(`dumpManifest:${what} ${filter} in ${elapsed} seconds`);
//   return node;
// }
function uploadData(content, what, pin) {
    return __awaiter(this, void 0, void 0, function () {
        var retryDelay, timeout, reference, start, err_7, err_8, elapsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    retryDelay = 15;
                    timeout = 10000;
                    start = new Date().getTime();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 11]);
                    return [4 /*yield*/, executeAPI(beeUrl, "bytes", "", "POST", {
                            "Content-Type": "application/octet-stream",
                            "swarm-postage-batch-id": batchID,
                            "swarm-tag": "".concat(tagID),
                            "swarm-pin": "".concat(pin),
                        }, content)];
                case 2:
                    //reference = (await bee.uploadData(batchID, content, {pin: pin, tag: tagID, timeout: timeout, fetch: fetch})).reference
                    reference = (_a.sent()).reference;
                    if (!(uploadDelay > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, sleep(uploadDelay)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 11];
                case 5:
                    err_7 = _a.sent();
                    showBoth("uploadData ".concat(what, " ").concat(content.length, " bytes failed with ").concat(err_7));
                    return [4 /*yield*/, statusDelay(retryDelay)];
                case 6:
                    _a.sent();
                    printStatus("uploadData RETRYING ".concat(what, " ").concat(content.length, " bytes after ").concat(err_7));
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, executeAPI(beeUrl, "bytes", "", "POST", {
                            "Content-Type": "application/octet-stream",
                            "swarm-postage-batch-id": batchID,
                            "swarm-tag": "".concat(tagID),
                            "swarm-pin": "".concat(pin),
                        }, content)];
                case 8:
                    //reference = (await bee.uploadData(batchID, content, {pin: pin, tag: tagID, timeout: timeout*4, fetch: fetch})).reference	// Quadruple the timeout for the retry
                    reference = (_a.sent()).reference;
                    return [3 /*break*/, 10];
                case 9:
                    err_8 = _a.sent();
                    showBoth("uploadData ".concat(what, " RETRY ").concat(content.length, " bytes failed with ").concat(err_8));
                    throw err_8;
                case 10: return [3 /*break*/, 11];
                case 11:
                    elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
                    if (elapsed >= timeout / 4 / 1000)
                        // Alert the user if we are >25% of timeout value
                        showError("uploadData ".concat(what, " ").concat(content.length, " bytes took ").concat(elapsed, "s, ref:").concat(reference));
                    showLog("Upload ".concat(what, " ").concat(content.length, " bytes => ").concat(reference));
                    return [2 /*return*/, hexToBytes(reference)];
            }
        });
    });
}
var saveFunction = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, uploadData(data, "saveFunction(".concat(data.length, ")"), true)];
    });
}); };
function downloadData(address, what) {
    if (what === void 0) { what = "*unknown*"; }
    return __awaiter(this, void 0, void 0, function () {
        var start, bytes, content, err_9, elapsed_1, elapsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = new Date().getTime();
                    bytes = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, executeBinaryAPI(beeUrl, "bytes", address)];
                case 2:
                    //content = await bee.downloadData(address)
                    content = _a.sent();
                    bytes = content.length;
                    if (bytes == 0)
                        throw new Error("Zero Bytes Read");
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _a.sent();
                    elapsed_1 = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
                    showBoth("downloadData ".concat(what, " ").concat(address, " failed in ").concat(elapsed_1, "s with ").concat(err_9));
                    throw err_9;
                case 4:
                    elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
                    if (elapsed >= 5)
                        showError("downloadData(".concat(what, " ").concat(address, ") took ").concat(elapsed, "s for ").concat(bytes, " bytes"));
                    return [2 /*return*/, content];
            }
        });
    });
}
// const loadFunction = async (address: Reference): Promise<Uint8Array> => {
//   return downloadData(bytesToHex(address), "loadFunction");
//	var start = new Date().getTime()
//	var bytes = 0
//	var r
//	try {
//		r = await bee.downloadData(bytesToHex(address))
//		bytes = r.length
//		if (bytes == 0) throw new Error('Zero Bytes Read');
//	}
//	catch (err) {
//		const elapsed = Math.trunc((new Date().getTime() - start)/100+0.5)/10.0
//		showBoth(`loadFunction ${bytesToHex(address)} failed in ${elapsed}s with ${err}`)
//		throw err
//	}
//	var elapsed = Math.trunc((new Date().getTime() - start)/100+0.5)/10.0
//	if (elapsed >= 1)
//		showError(`loadFunction(${bytesToHex(address)}) took ${elapsed}s`)
//	return r;
// };
function doit(srcDir) {
    return __awaiter(this, void 0, void 0, function () {
        var rootNode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, newManifest(saveFunction, srcDir)];
                case 1:
                    rootNode = _a.sent();
                    showBoth("Uploaded ".concat(srcDir, " as ").concat(rootNode));
                    //	You can define your own root reference for dumping purposes if desired
                    //	const rootNode = "9aafea948007399891290fc3b294fdfbbf7f51313111dd20ba2bb6ff2a1ecd27"
                    //	This will dump out the uploaded manifest for diagnostic purposes
                    //	await dumpManifest(loadFunction, rootNode, srcDir, undefined, undefined, false, true, false)
                    showBoth("TAG information may be viewed using curl ".concat(beeUrl, "/tags/").concat(tagID, " | jq"));
                    showBoth("View your archive at ".concat(beeUrl, "/bzz/").concat(rootNode));
                    return [2 /*return*/];
            }
        });
    });
}
exports.doit = doit;
