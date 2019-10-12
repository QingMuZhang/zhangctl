function objTostr(obj1) {
    obj1.t = new Date().getTime()
    var arr = [];
    for (var key in obj1) {
        //发送请求时url不能出现中文，需要转码
        arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj1[key]));
    }
    return arr.join('&');
}


function ajax(url, obj1, timeout, success, error) {
    //0.将对象转化为字符串
    var str = objTostr(obj1);
    //1.创建一个异步对象
    var xhr;
    if (window.XMLHttpRequest)
        xhr = new XMLHttpRequest();
    else
        //IE不同点1：ie5,ie6
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    //2.设置请求方式和请求地址,最后表示异步
    //IE不同点2：ie通过Ajax发送get请求，会默认一个URL只有一个结果，可使用Math.random()或new Date().getTime()生成一个随机数
    xhr.open('GET', url + '?' + str, true);
    //3.发送请求
    xhr.send();
    //4.监听状态变化
    xhr.onreadystatechange = function () {
        /*
          0	UNSENT	代理被创建，但尚未调用 open() 方法。
          1	OPENED	open() 方法已经被调用。
          2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
          3	LOADING	下载中； responseText 属性已经包含部分数据。
          4	DONE	下载操作已完成。
        */
        if (xhr.readystate === 4) {
            clearInterval(timer);
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                success(xhr);
            } else {
                error(xhr);
            }
        }
    }
    //判断是否传入超时时间
    if (timeout)
    {
        timer=setInterval(function(){
            xhr.abort();
            clearInterval(timer);
        },timeout)
    }
}