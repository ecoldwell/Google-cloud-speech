var imageAddr = "./assets/safari.jpg"; 
var downloadSize = 109957; //bytes
function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}
function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the imagefile for download detection");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    
// if (window.addEventListener) {
//     window.addEventListener('load', InitiateSpeedDetection, false);
// } else if (window.attachEvent) {
//     window.attachEvent('onload', InitiateSpeedDetection);
// }
function MeasureConnectionSpeed () {
    return new Promise((resolve,reject)=>{

    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        let resultsMbps=showResults();
        // console.log("download time is:");
        console.log('resultsMbps', resultsMbps)
        resolve(resultsMbps)
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("not downloading,   ERRORRRRRR");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        ShowProgressMessage([
            "Your download speed is:", 
            speedBps + " bps", 
            speedKbps + " kbps", 
            speedMbps + " Mbps"
        ]);
        return speedMbps
    }
})
}

const getDownloadSpeed=async()=>{
    timerPromise=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('download speed test took too long')
        },20000)
    })

    return await Promise.race([timerPromise,MeasureConnectionSpeed()])
}