const showMotionPermissionsMessage = () => {
  if (currentDeviceType === DEVICE_TYPES.ANDROID) {
    if (currentLanguage === LANGUAGES.ENGLISH) {
      document.getElementById("android").style.display = "flex";
    } else if (currentLanguage === LANGUAGES.FRENCH) {
      document.getElementById("androidFrench").style.display = "flex";
    }
  } else if (currentDeviceType === DEVICE_TYPES.IOS) {
    if (currentLanguage === LANGUAGES.ENGLISH) {
      document.getElementById("no-support").style.display = "flex";
    } else if (currentLanguage === LANGUAGES.FRENCH) {
      document.getElementById("frenchDropdown").style.display = "flex";
    }
  }
};

const addMotionDetectionCheck = () => {
  if (currentDeviceType === DEVICE_TYPES.IOS) {
    const motionListener = () => {
      hasMotionEvents_ = true;
      document.getElementById("no-support").style.display = "none";
      document.getElementById("frenchDropdown").style.display = "none";

      window.removeEventListener("devicemotion", motionListener);
    };
    window.addEventListener("devicemotion", motionListener);
  } else if (currentDeviceType === DEVICE_TYPES.ANDROID) {
    console.log("it is android");
    window.navigator.permissions
      .query({ name: "gyroscope" })
      .then(response => {
        console.log(response);
        document.getElementById("android").style.display = "none";
      })
      .catch(error => {
        console.warn(error);
        document.getElementById("android").style.display = "flex";

        // alert(error);

        // alert(error);
      });
  }
};

const changePermissionMessageLang=(oldMessage,newMessage)=>{
  document.getElementById(oldMessage).style.display='none'
  document.getElementById(newMessage).style.display='flex'
}
