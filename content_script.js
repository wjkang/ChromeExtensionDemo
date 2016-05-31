/**
 * Created by wjkang on 2016/5/31.
 */
chrome.extension.sendRequest({result: "doing"}, function(response) {
   console.log(response);
});
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:63342/demo/WishProductTemplate.xls", true);
//xhr.overrideMimeType("text/plain; charset=x-user-defined");
xhr.responseType = "blob";
xhr.onreadystatechange = function (e) {
    if (this.readyState == 4 && this.status == 200) {

        var blob = new Blob([this.response], {type: "application/vnd.ms-excel"});
        var xhr1 = new XMLHttpRequest();

        xhr1.open("POST", "http://localhost:14055/Handler.ashx", true);

        xhr1.onreadystatechange = function (e) {
            if (this.readyState == 4 && this.status == 200) {
                chrome.extension.sendRequest({result: "success"}, function(response) {
                    console.log(response);
                });
            }
        };
        var formData = new FormData();
        formData.append("file", blob, "download.xls");
        xhr1.send(formData);

    }
    else
    {
        chrome.extension.sendRequest({result: "error"}, function(response) {
            console.log(response);
        });
    }
};
xhr.send();






