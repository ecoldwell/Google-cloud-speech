console.log('video info js')
const getVideoResolution=()=>{
    let currentLevelIndex=hls.levelController.currentLevelIndex
    let width=hls.levelController._levels[currentLevelIndex].width
    let height=hls.levelController._levels[currentLevelIndex].height
    return width+' x '+height
}



const createVideoResolutionTag=(maxIndex,levelIndex,resolution)=>{
    console.log('creating video resolution tag with resolution',resolution)
    textTag=document.createElement('a-entity')
    // textTag.setAttribute('id','videoInfo')
    textTag.setAttribute('geometry','primitive:plane;width:.8;height:auto')
    textTag.setAttribute('material','color:red;')
    textTag.setAttribute('position','0 .15 0')
    textTag.setAttribute('text',`value:Max Index:${maxIndex}\n Current Quality level index:${levelIndex}\nResolution:${resolution};wrapCount:30`)
    return textTag
}

const createErrorCountTag=(errorCount)=>{
    // console.log('creating video resolution tag with resolution',resolution)
    textTag=document.createElement('a-entity')
    textTag.setAttribute('geometry','primitive:plane;width:.8;height:.1')
    textTag.setAttribute('material','color:red;')
    // textTag.setAttribute('position','.5 0 -1')
    textTag.setAttribute('text',`value:Error Count: ${errorCount};wrapCount:30`)
    return textTag
}
const createVideoInfoContainer=()=>{
    containerTag=document.createElement('a-entity')
    containerTag.setAttribute('id','videoInfo')
    containerTag.setAttribute('position','.5 .5 -1')

    containerTag.appendChild(createVideoResolutionTag(hls.levelController._levels.length-1,hls.levelController.currentLevelIndex,getVideoResolution()))
    containerTag.appendChild(createErrorCountTag(videoErrorCount))

    return containerTag
}

const renderVideoInfo=(levelIndex,resolution)=>{
    document.getElementsByTagName('a-scene')[0].appendChild(createVideoInfoContainer())
}
const destroyVideoInfo=()=>{
    if(document.getElementById('videoInfo')){
    document.getElementById('videoInfo').parentNode.removeChild(document.getElementById('videoInfo'))
    }
}



const updateVideoInfo=()=>{
    destroyVideoInfo()
    renderVideoInfo()
}