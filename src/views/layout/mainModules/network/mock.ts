const baseURL:string = 'http://localhost:4001'

class Request {
    private xhr: XMLHttpRequest
    constructor(method: string, url: string) {
        this.xhr = new XMLHttpRequest;
        this.xhr.open(method, baseURL + url, true);
    }
    send(data: any) {
        
        this.xhr.send(data);
    }
}

export function test1() {
    let xhr = new Request('post', '/api/test1');
    xhr.send(null);
}