export interface RequestDataType {
    name: string,
    status: string
    size: string
    time: string
    url: string
}
export interface NetworkStateType {
    requests: Array<XhrDataType>,
    visiable: true,
    id: string
}

export interface XhrDataType {
    method: string,
    url: string,
    id: string,
    size: string,
    responseHeaders?: object,
    requestHeaders?: object,
    time: Date | string,
    status: string,
    name: string,
    sendData: any,
    response: any
}