/**
 * Created by wjkang on 2016/5/31.
 */
$(function(){
    $("#FBA_btn").click(function(){
            chrome.tabs.executeScript(null,{file:"content_script.js"});

        }

    );
    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            if (request.result == "doing") {
                $("#FBA_btn").html("请求中...");
                sendResponse({});
            }
            else if(request.result=="success") {
                $("#FBA").prepend('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>同步完成。</div>');
                $("#FBA_btn").html("立即同步FBA订单报告");
                sendResponse({});
            }
        });

});
