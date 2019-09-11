



let currentDeviceType = STRINGS.NOT_AVAILABLE
let vrHeadsetName = STRINGS.NOT_AVAILABLE


let currentVideoSrc = ''
let leftControllerTag;
let rightControllerTag;
let currentLanguage="LANGUAGES.ENGLISH"


let hls=undefined

let currentVideoObj=undefined
let videoErrorCount=0
let videoTag;

let initialUploadSpeed=0
let initialDownloadSpeed=0


let connectionInfo={
    connection:navigator.connection || navigator.mozConnection || navigator.webkitConnection,
    type:(navigator.connection || navigator.mozConnection || navigator.webkitConnection).effectiveType
}

//VIDEO OBJECT SHOULD BE STRUCTURED AS FOLLOWS