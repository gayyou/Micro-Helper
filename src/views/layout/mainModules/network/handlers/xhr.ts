
import {networkEmitter} from '../Network';

export default class XhrHandler {
    private _id: Symbol;
    private _xhr: XMLHttpRequest; 

    constructor(xhr) {
        this._id = Symbol();
        this._xhr = xhr;

    }
    handlerHeaders() {
        
        // networkEmitter.emit('send', this._id, )
    }
    handleSend(data) {

    }
    handlerDone() {
      
    }
}