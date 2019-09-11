
// console.log('window', window)
let x=42
// console.log('window', window)
// const toggleVideo = () => {
//     var myVideo = document.getElementsByTagName("video")[0];
//     // console.log()
//     if (myVideo.pause) myVideo.play();
//     else myVideo.pause();
//   };
 
  const deactivateControls = () => {
    // console.log('disactivating controls')
  
    let controlbar = document.getElementById("controls");
  
    controlbar.setAttribute("visible", "false");
    for (let i = 1; i < controlbar.childElementCount; ++i) {
      // console.log(controlbar.children[i]);
      controlbar.children[i].classList.remove("clickable");
    }
  };
  
 const activateControls=()=>{
    // console.log('activating controls')
    let controlbar = document.getElementById("controls");
    controlbar.setAttribute("visible", "true");
            for (let i = 1; i < controlbar.childElementCount; ++i) {
              controlbar.children[i].setAttribute("class", "clickable");
            }
  }
  
 const activateRaycaster=()=>{
    let raycaster=document.getElementById('cursorToggle')
    // console.log('raycaster.getAttribute("line").opacity', raycaster.getAttribute("laser-controls"))
    if(raycaster.getAttribute('line')){
      raycaster.getAttribute("line").opacity = 1;
      raycaster.getAttribute("line").color = 'red';
      raycaster.getAttribute("raycaster").enabled=true
      raycaster.getAttribute("laser-controls").model=true
    }
  }
  
 const deactivateRaycaster=()=>{
    let raycaster=document.getElementById('cursorToggle')
    if(raycaster.getAttribute('line')){
    raycaster.getAttribute("line").opacity = 0;
    // raycaster.getAttribute("line").color = 'red';
    raycaster.getAttribute("raycaster").enabled=false
    raycaster.getAttribute("laser-controls").model=false
    }
  
  }

  const setCorrectCursor=()=>{
    // console.log('navigator.getGamepads()', navigator.getGamepads())
    // console.log('determining cursor')
    normalCursor=document.getElementById('cursorToggle')
    // console.log('normalCursor', normalCursor)
    if(currentDeviceType===DEVICE_TYPES.VR_HEADSET){
    vrControllerCursor=document.getElementById('vrHeadsetControllerCursorRight')
      
      normalCursor.id='NotUsedCursor'
      normalCursor.parentNode.removeChild(normalCursor);
      vrControllerCursor.id='cursorToggle'


      //listen for controllers that connect
      // window.addEventListener('gamepadconnected',event=>{
      //   console.log('gamepad connected just now')
      //   console.log('event', event)
      //   setControllerHand(event.gamepad.hand)
      // })
    }
    // console.log('document.getElementById("cursorToggle") currentCursor', document.getElementById("cursorToggle"))
  }

  const setControllerHand=(orientation)=>{
    let oldController=document.getElementById('cursorToggle')
    if(orientation==='left' || oldController.getAttribute('laser-controls').hand!=='left'){
      oldController.id='notUsedCursorRight'
      rightControllerTag.getAttribute("line").opacity = 0;
      rightControllerTag.getAttribute("raycaster").enabled=false
     
      leftControllerTag.getAttribute('line').opacity=1
      leftControllerTag.getAttribute('raycaster').enabled=true
      leftControllerTag.id='cursorToggle'

    }else{
      oldController.id='notUsedCursorLeft'

      leftControllerTag.getAttribute("line").opacity = 0;
      leftControllerTag.getAttribute("raycaster").enabled=false
     
      rightControllerTag.getAttribute('line').opacity=1
      rightControllerTag.getAttribute('raycaster').enabled=true
      rightControllerTag.id='cursorToggle'
    }
  }

  

  const initializeInstructions=()=>{
    // console.log('initializing instructions',currentDeviceType)
    // console.log('check conditional',currentDeviceType!==DEVICE_TYPES.VR_HEADSET)

    if(currentDeviceType!==DEVICE_TYPES.VR_HEADSET){
      // console.log('initializing intructionsNotVR')
      document.getElementById('instructions').style.display='flex'
    }else{
      // console.log('initializing intructionsVR')
      document.getElementById('instructionsVR').style.display='flex'
    }
}
const changeInstructionsLanguage=(oldInstructionsId,newInstructionsId)=>{
  document.getElementById(oldInstructionsId).style.display='none'
  document.getElementById(newInstructionsId).style.display='flex'
}

const removeCameraControls=()=> {
  let ua = window.navigator.userAgent.toString();
  if(ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1){
    // console.log("deactivating camera controls");
    document.getElementById("cameraControl").setAttribute("transparent","true");
    // console.log(document.getElementById('cameraControl'));
  }
}

const firstPlayVideo=()=>{
  // console.log("play video first time");

  document.getElementById('video').removeEventListener('play',firstPlayVideo)
  // removeBouncingArrow()
  // document.getElementById('activator-ring').setAttribute("opacity", "0")
}

const removeBouncingArrow=()=>{
  document.getElementById('bouncingArrow').setAttribute('visible','false')
}




  
  