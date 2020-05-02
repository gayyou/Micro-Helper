
import {networkEmitter} from '../index';
import {isPlainObject} from "@/utils";
import {XhrDataType} from '../Network'

export default class XhrHandler {
    private _id: string; // request id
    private _xhr: XMLHttpRequest;  // xhr instance
    private _method: string;
    private _url: string; 
    private _xhrData: any;

    constructor(xhr: XMLHttpRequest, method: string, url: string) {
        this._id = getUniqueID(); 
        this._xhr = xhr;   
        this._method = method.toUpperCase(); 
        this._url = url;

        this._xhrData = {
            method: this._method,
            url: this._url,
            id: this._id,
            name: getFileName(this._url),
            status: 'pending',
            size: "0B",
            time: 'pending',
            startTime: '',
            endTime: '',
            sendData: null,
            requestHeaders: {},
            responseHeaders: {},
            response: null
        }
    }
   
     /**
     * handle initial data like method, url... when send was called
     * a new request record will dispaly on the network panel
     * XMLHttpRequest.send();
     * XMLHttpRequest.send(ArrayBuffer data);
     * XMLHttpRequest.send(ArrayBufferView data);
     * XMLHttpRequest.send(Blob data);
     * XMLHttpRequest.send(Document data);
     * XMLHttpRequest.send(DOMString? data);
     * XMLHttpRequest.send(FormData data);
     */
    
    public handleSend(data: null | ArrayBuffer | ArrayBufferView| Blob | Document | FormData | string):void { 
        // if use GET method, save query string 
        if (this._method === 'GET') {
            this._xhrData.sendData = getQueryString(this._url);
        }
        // if use POST PUT ... method, save data
        if (data !== null && isPlainObject(data)) {
            this._xhrData.sendData = data;
        }
        // this._xhrData.startTime = new Date().getTime();
        networkEmitter.emit('send', this._xhrData);
    }
    public handleDone(): void {
        // update request status
        let status: string = this._xhr.status === 0 ? '(failed)' : this._xhr.status + '';
        this._xhrData.status = status;
        // update request time
        this._xhrData.time = getTime(this._xhrData.startTime, this._xhrData.endTime);
        // update response data
        const resType: string = this._xhr.responseType;
        this._xhrData.response = this._xhr.response;
    }
    /**
     * handle response headers when readystate === 2
    */
    public handleResponseHeaders(): void  {
        const headers:object = getResponseHeaders(this._xhr);
        this._xhrData.responseHeaders = headers;
    }
    /**
     * only handle custom request headers (setRequestHeader)
     */
    public handleRequestHeader(key: string, val: string): void {
        this._xhrData.requestHeaders[key] = val;
    }
}

// utils
function getTime(startTime:string, endTime: string): string {
    let time:number = parseInt(endTime) - parseInt(startTime);
    let fix: string = 'ms';
    return time + fix
}
function getResponseHeaders(xhr: XMLHttpRequest):object {
    const rawData:string = xhr.getAllResponseHeaders() || '';
    const headersArr:Array<string> = rawData.split('\n');
    let ret: object = {};
    
    // translate headers array to key-val object
    for (let line of headersArr) {
        if (line === '') continue;
        let [key, val] = line.split(': ');
        ret[key] = val;
    }
    return ret;
}
/**
 * get fileName
 * @param url 
 */
export function getFileName(url: string): string {
    // get paths array
    let paths: Array<string> = url.split('/');
    // get last path 
    let lastPath: string = paths[paths.length - 1];
    // define return value
    let fileName: string = lastPath;
    // if last path has queryString like http://www.xxx.com/xxx.html
    if (lastPath.indexOf('?') !== -1)
        fileName = lastPath.split('?')[0]; 
    // if last path like http://www.xxx.com/，get hostname
    if (lastPath === '')
        fileName = new URL(url).hostname;
    return fileName;
}

/**
 * get an unique id string
 */
export function getUniqueID(): string {
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    return id;
  }

/**
 * get url query string
 * @param url 
 */
export function getQueryString(url: string) {
    if (url.indexOf('?') === -1) return {};
    
    let paramStr: string = url.split('?')[1];
    // ['key=val']
    let params:Array<string> = paramStr.split('&');

    let res = {};
    for (let param of params) {
        let [key, val] = param.split('=');
        if (res[key]) {
            if (!Array.isArray(res[key])) 
                res[key] = [res[key]];
            else    
                res[key] = [];
            res[key].push(val);
        }
        else 
            res[key] = val;
    }
    return res;
}
