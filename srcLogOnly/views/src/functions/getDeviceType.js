


    let getDeviceType=async()=>{
  
        let isVRHeadset=false
        
        isVRHeadset=await getVRHeadset()
        if(isVRHeadset){
          console.log('isheadset')
            return DEVICE_TYPES.VR_HEADSET
        }else{
          return platformCheck()
        }
      } 
      
      let platformCheck = () => {
        let ua = window.navigator.userAgent.toString();
        console.log('ua', ua)
        if (ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1) {
          return DEVICE_TYPES.IOS;
        } else if (ua.indexOf('Macintosh') !== -1) {
          return DEVICE_TYPES.MAC;
        }else if (ua.indexOf('Android') !== -1) {
          return DEVICE_TYPES.ANDROID;
        }else if (ua.indexOf('Linux') !== -1) {
          return DEVICE_TYPES.LINUX
        }else {
          return DEVICE_TYPES.DESKTOP;
        }
      };

      let getVRHeadset=async ()=>{
        let vrDisplayObj=await navigator.getVRDisplays()
        console.log('vrDisplayObj', vrDisplayObj)
        
        //THE CASE WHERE THERE IS NOT HEADSET
        if(!vrDisplayObj.length){
          // if(false){
          return false
        }
        else if(vrDisplayObj[0].displayName.includes('Cardboard')){
          return false
        }
        else{
          return vrDisplayObj[0].displayName
        }
      }
      
      