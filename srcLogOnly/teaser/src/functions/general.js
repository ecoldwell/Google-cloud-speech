function toggleVideoBigBtn() {
    document.getElementById('mobile-button').parentNode.removeChild(document.getElementById('mobile-button'))
    var myVideo = document.getElementsByTagName("video")[0];
    //  console.log('toggling video dammit')
    if (myVideo.pause) {
      // console.log('playing damn video')
      myVideo.play();
    } else {
      myVideo.pause()
    };
    removeBouncingArrow()
    document.getElementById('activator-ring').setAttribute("opacity", "0")
    document.getElementById('activator-ring').style.transition = "0.5s ease";
  }