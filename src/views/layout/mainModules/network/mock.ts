const baseURL:string = 'http://localhost:4001'

class Request {
    private xhr: XMLHttpRequest
    constructor(method: string, url: string) {
        this.xhr = new XMLHttpRequest();
        this.xhr.open(method, url, true);
    }
    setHead(key: string, val: string) {
        this.xhr.setRequestHeader(key, val);
    }
    send(data: any) {
        
        this.xhr.send(data);
    }
}
export function test1() {
    let xhr = new Request('post', baseURL + '/api/test1');
    // xhr.setHead('Content-Type', 'custom');
    xhr.send(null);
}

export function test2() {
    let xhr = new Request('post', baseURL + '/api/test2');
    xhr.send(null);
}

function test3() {
    let xhr = new Request('get', 'http://wechatfe.github.io/vconsole/ajax.html');
    xhr.send(null);
}
export default [
    test1,
    test2,
    test3
]
   
