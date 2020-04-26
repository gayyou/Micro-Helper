
import {networkEmitter} from '../Network';

interface xhrDataType {
    method: string,
    url: string,
    id: Symbol,
    responseHeaders: object,
    requestHeaders: object,
    time: Date,
    status: string,
    name: string,
    data: any
}
export default class XhrHandler {
    private _id: Symbol; // request id
    private _xhr: XMLHttpRequest;  // xhr instance
    private _method: string;
    private _url: string; 
    private _xhrData: any;

    constructor(xhr: XMLHttpRequest, method: string, url: string) {
        this._id = Symbol(); 
        this._xhr = xhr;   
        this._method = method; 
        this._url = url;

        this._xhrData = {
            method: this._method,
            url: this._url,
            id: this._id,
            name: getFileName(this._url),
            status: 'pending'
        }
    }
   
     /**
     * handle initial data like method, url... when send was called
     * a new request record will dispaly on the network panel
     */
    public handleSend(data):void { 

        networkEmitter.emit('send', this._xhrData);
    }
    public handleDone():void {
      
    }
    /**
     * handle response headers when readystate === 2
    */
    public handleResponseHeaders():void  {
        // const headers:object = getHeaders(this._xhr);
        
        // networkEmitter.emit('send', this._id, )
    }
    /**
     * only handle custom request headers (setRequestHeader)
     */
    public handleRequestHeader(key: string, val: string): void {
        // this._xhrData.requestHeaders.
    }
}

// utils
// function getHeaders(xhr: XMLHttpRequest):object {
//     const rawData:string = xhr.getAllResponseHeaders() || '';
//     const headersArr:Array<string> = rawData.split('\n');
    
//     let ret: object = {};
    
//     // translate headers array to key-val object
//     for (let line of headersArr) {
//         if (line === '') continue;
//         let [key, val] = line.split(': ');
//         ret[key] = val;
//     }
//     return ret;
// }
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