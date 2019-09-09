
console.log('loaded networkinfo js')
const setUploadSpeed=async()=>{
    console.log('setting uploadspeed')
    let uploadSpeed=await getUploadSpeed()
    console.log('uploadSpeed', uploadSpeed)
    initialUploadSpeed=uploadSpeed
    console.log('initialUploadSpeed', initialUploadSpeed)
    
    let networkIndicator=document.getElementById('networkIndicator')
    console.log('networkIndicator', networkIndicator)
    if(networkIndicator){
        if(initialUploadSpeed>=40){
        networkIndicator.setAttribute('src','./assets/networkIndicators/green.png')
        }else if(initialUploadSpeed<40 && initialUploadSpeed >=20){
            networkIndicator.setAttribute('src','./assets/networkIndicators/yellow.png')
        }else{
            networkIndicator.setAttribute('src','./assets/networkIndicators/red.png')
        }
    }
    console.log('networkIndicator', networkIndicator)

    if(window.location.hash.slice(1)==='dev'){
    renderNetworkInfo(initialUploadSpeed)
    }
}

const setDownloadSpeed=async()=>{
    console.log('setting downloadspeed')
    let downloadSpeed=await getDownloadSpeed()
    console.log('downloadSpeed', downloadSpeed)
    initialDownloadSpeed=Number.parseFloat(downloadSpeed)
    console.log('initialDownloadSpeed', initialDownloadSpeed)

    if(window.location.hash.slice(1)==='dev'){
        renderNetworkInfo(initialUploadSpeed,initialDownloadSpeed)
        }
}

createUploadSpeedTag=(speed)=>{
    let uploadSpeedTag=document.createElement('a-entity')
    uploadSpeedTag.setAttribute('position','0 0 0')
    uploadSpeedTag.setAttribute('geometry','primitive:plane;width:.8;height:auto')
    uploadSpeedTag.setAttribute('material','color:red;')
    uploadSpeedTag.setAttribute('text',`value:Upload Speed: ${speed.toFixed(2)} Megabytes per second;wrapCount:30`)
    return uploadSpeedTag

}

createDownloadSpeedTag=(speed)=>{
    console.log('speed', speed)
    let downloadSpeedTag=document.createElement('a-entity')
    downloadSpeedTag.setAttribute('position','0 -.2 0')
    downloadSpeedTag.setAttribute('geometry','primitive:plane;width:.8;height:auto')
    downloadSpeedTag.setAttribute('material','color:red;')
    downloadSpeedTag.setAttribute('text',`value:Download speed: ${speed.toFixed(2)} Megabytes per second;wrapCount:30`)
    return downloadSpeedTag

}



createNetworkInfoContainer=(uploadSpeed=initialUploadSpeed,downloadSpeed=initialDownloadSpeed)=>{
    console.log('uploadSpeed', uploadSpeed)
    // clo
    let container=document.createElement('a-entity')
    container.setAttribute('id','networkInfo')
    container.setAttribute('position','.5 .2 -1')
    container.appendChild(createUploadSpeedTag(uploadSpeed))
    container.appendChild(createDownloadSpeedTag(downloadSpeed))
    return container

}

const renderNetworkInfo=(uploadSpeed)=>{

    if(document.getElementById('networkInfo')){
        destroyNetworkInfo()
    }
    document.getElementsByTagName('a-scene')[0].appendChild(createNetworkInfoContainer(uploadSpeed))

}

const destroyNetworkInfo=()=>{
    if(document.getElementById('networkInfo')){
        document.getElementById('networkInfo').parentNode.removeChild(document.getElementById('networkInfo'))
    }
}