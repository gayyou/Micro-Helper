# Micro-Helper
手机端控制台兼性能监控小工具

## Network Panel

通过事件代理系统+重写原型实现非侵入式ajax拦截，不影响第三方或自己修改过对象原型的结果

### 适用范围
只能拦截基于XMLHttprequest或fetch的请求

### 未实现或实现不了的功能

* 拦截jsonp
* 拦截浏览器url形式的资源请求，如图片
* 获取浏览器设置的请求头（只能获取通过setRequestHeaders设置的请求头）
* 无法获取精确的请求处理时间（与代码的执行需要时间有关）有20ms左右的误差
* 在使用CORS跨域的时候，有可能会获取不到完整的响应头，这是由W3S规定的，解决方法：在响应中添加响应头`Access-Control-Expose-Headers:*`