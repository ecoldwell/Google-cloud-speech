const appMounts = async () => {
    console.log("app mounts");


    currentDeviceType = await getDeviceType();
    vrHeadsetName = await getVRHeadset();
    console.log("currentDevice", currentDeviceType);
    console.log("vrHeadsetName", vrHeadsetName);




 
    
    // userId = getUserId();
    // // initialSetLanguage();
    // userToken = makeUserToken();
    // console.log(userToken);
  };
  
  const afterAframeElementsMount = async () => {
    console.log('after aframe elements mount')

    initialSetLanguage()

    showMotionPermissionsMessage()
    addMotionDetectionCheck()


    let accessToken = ''
    let secondsWatched = 0;
    setInterval(() => {
      if (!((document.getElementById('video')).paused)) {
        ++secondsWatched;
      }
    }, 1000)

    setTimeout(() => {
      window.addEventListener('beforeunload', (e) => {
        fetch(OUR_URL.SERVER_HOST + "/api/videos/clearuservideohash/?hash=" + videoHash + '&userId=' + userId + '&accessToken=' + accessToken + '&seconds=' + secondsWatched)
      })
    }, 500);

    function checkHashAndGetVideo() {
  
      let time = Date.now().toString();
      accessToken = time + videoHash;
      accessToken = sha256(accessToken);

      //INITIAL CHECK USER HASH AND GET VIDEO
      fetch(OUR_URL.SERVER_HOST + "/api/videos/checkuservideohash/", {
        method: "POST",
        body: JSON.stringify({ hash: videoHash, userId: userId, accessToken: accessToken }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        console.log(response);
        return response.json();
      }).then((response) => {
        console.log('this dang problem', response);
        console.log(typeof(response));
        if (!response.sources) {
          console.log("no sources");
          window.location.assign(OUR_URL.LANDING_PAGE);
        }


        //will be dash video
        let source0 = {};

        //will be hls video
        let source1 = {};

        response.sources.map(source => {
          if (source.type === "application/dash+xml") {
            source0.src = source.source;
            source0.type = source.type;
          }
          if (source.type === "application/x-mpegURL") {
            source1.src = source.source;
            source1.type = source.type;
          }
        });
        console.log("source0", source0);
        console.log("source1", source1);

        let videoTag = document.getElementById("video");

        let sourceTag1 = document.createElement("source");
        sourceTag1.setAttribute("src", source0.src);
        sourceTag1.setAttribute("type", source0.type);

        let sourceTag2 = document.createElement("source");
        sourceTag2.setAttribute("src", source1.src);
        sourceTag2.setAttribute("type", source1.type);

        // videoTag.appendChild(sourceTag1);
        videoTag.appendChild(sourceTag2);
        currentVideoSrc = source1.src
        // currentVideoSrc="https://marcobucketnomads.s3.amazonaws.com/TourismTeaser_07-26-19_STEREO_TEMPTRACK.m3u8"
        console.log('currentVideoSource', currentVideoSrc)

        

        // console.log('before manifest parsed')
        //for playing hls
        // if (Hls.isSupported()) {
          console.log('playing hls source')
          loadNewVideo(currentVideoSrc)
      
          video.onloadedmetadata = (event) => {
            let timeToString = (time) => {
              if (time < 60) {
                if (time < 10) {
                  return '0:0' + (parseInt(time).toString());  
                }
                return '0:' + (parseInt(time).toString());
              }
              let minutes = parseInt(time/60);
              let seconds = (time - (60 * minutes))
              if (seconds < 10) {
                return minutes + ':0' + parseInt((time - (60 * minutes)))
              }
              return minutes + ':' + parseInt((time - (60 * minutes)))
            }
            let playUpdateInterval = setInterval(() => {
              let rightNow = timeToString(video.currentTime)
              if (rightNow.split(':')[0].length == 2) {
                document.getElementById('currentTime').setAttribute('position', '-0.6125 -2.2 0')
              }
              if (rightNow.split(':')[0].length == 1) {
                document.getElementById('currentTime').setAttribute('position', '-0.5 -2.2 0')
              }
              document.getElementById('currentTime').setAttribute('value', rightNow);
            }, 1000)
            document.getElementById('totalTime').setAttribute('value', '/' + timeToString(video.duration))
          }





      


        //restarts the video if it crashes

        videoTag.addEventListener("error", error => {
          console.log("error123", error);
          console.log('timestamp',error.timeStamp)
          let currentTime = video.currentTime
          console.log('currentTime', currentTime)
          hls = new Hls()
          console.log('loading source')
          console.log('currentVideoSource', currentVideoSrc)

          // hls.loadSource('https://videouploadwork123222.s3.amazonaws.com/converted/multibitrateRoto.m3u8');
          hls.loadSource(currentVideoSrc);
          
          console.log('hls', hls)
          console.log('attaching media')
          hls.attachMedia(videoTag)
          console.log('hls', hls)
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log('manifest was parsed')
            videoTag.currentTime = currentTime - .2
            videoTag.oncanplay = () => {
              console.log('can play')
              console.log('newTime', videoTag.currentTime)
              console.log('starting play timeout')
              setTimeout(() => videoTag.play(), 1000)
            }

            // console.log('going to play video after reloading')
            // videoTag.play();
          });
        });

      });
    }


    checkHashAndGetVideo()

    setInterval(() => {
        fetch(OUR_URL.SERVER_HOST + '/api/videos/lastupdate/?userId='+ userId + '&accessToken=' + accessToken + '&seconds=' + secondsWatched)
        secondsWatched = 0;
      }, 120000);


    //SET UP CURSOR BASED ON WHETHER USER HAS AN OCULUS OR NOT
    leftControllerTag = document.getElementById('vrHeadsetControllerCursorLeft')
    rightControllerTag = document.getElementById('vrHeadsetControllerCursorRight')

    setTimeout(() => {
      setCorrectCursor();
      // initializeInstructions();
      renderInstructions(currentLanguage)
      document.getElementById('video').onplay=destroyInstructions
      setTimeout(()=>{
        destroyInstructions()
      },20000)


      console.log('currentDeviceType', currentDeviceType)
      // if(currentDeviceType===DEVICE_TYPES.IOS){
      //   console.log('rotating sky for iphone')
      //   let skyTag=document.getElementsByTagName('a-sky')[0]
      //   skyTag.setAttribute('rotation','180 270 0')
      // }
    }, 2500)
    


    let scene = document.querySelector("a-scene");
    let vid = document.getElementById("video");
    vid.addEventListener("ended", () => {
      scene.exitVR();
      if (window.location.search == '' || window.location.search == '?blackhawks' || window.location.search == '?travel-the-world' || window.location.search == '?golf-tournament') {
        window.location.assign(OUR_URL.LANDING_PAGE);
      }else {
        window.location.assign(OUR_URL.VR_PAGE);
      }
    });
    let button = document.querySelector("a-plane");



    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      }
    };
    let timeoutID;
    if (isMobile.any()) {
      document.onvisibilitychange = () => {
        console.log('timeout', timeoutID);
        if (document.visibilityState.match(/hidden/i)) {
          timeoutID = window.setTimeout(() => {
            fetch(OUR_URL.SERVER_HOST + "/api/videos/clearuservideohash/?userId=" + userId + '&accessToken=' + userToken +  '&seconds=' + secondsWatched).then((response) => {
                return response.text();
              }).then((response) => {
                // console.log('response from beforeunload', response);
                if (window.location.search == '' || window.location.search == '?blackhawks' || window.location.search == '?travel-the-world' || window.location.search == '?golf-tournament') {
                  window.location.assign(OUR_URL.LANDING_PAGE);
                }else {
                  window.location.assign(OUR_URL.VR_PAGE);
                }
              })
          }, 30000);
        }else if (document.visibilityState.match(/visible/i)) {
          if (timeoutID) {
            clearTimeout(timeoutID);
          }
        }
      }
    }
    /* if the device is not ios hide the download button */
    


    var circle = anime({
      targets: [".loader"],
      rotate: 180,
      duration: 1600,
      loop: true,
      elasticity: 600,
      easing: "easeOutElastic",
      delay: function (el, index) {
        return index * 80;
      }
    });
    document.addEventListener("DOMContentLoaded", function () {
      // console.log("hello");
      // console.log("Yay! The readyState just increased to  " + "HAVE_CURRENT_DATA or greater for the first time.");

      // var scene = document.querySelector('a-scene');
      // var cameraTimeout = document.getElementById("nomadsLoading");
      var blur = document.getElementById("mobileDisplay");
      var activeMobile = document.getElementById("mobile-button");
      scene.addEventListener("loaded", function (e) {
        blur.style.transparent = "false";
        blur.style.opacity = "1";
        blur.style.transform = "rotate(0deg)";
        activeMobile.style.display = "flex";
        activeMobile.style.opacity = "1";
        // cameraTimeout.style.display = "block";
        //   document.getElementById("animeDemo").style.display = "block";
      });
    });
    // document.getElementById("mobile-button").onclick = function () {

    document.getElementById("mobile-button").style.display = "none";
    // document.getElementById("mobileDisplay").style.display = "none";
    // document.getElementById("instructions").style.opacity="1";
    // document.getElementById("instructions").transparent="false";
    // docuent.getElementById("instructions").style.display = "block";

    video.addEventListener('canplaythrough', function () {
      var promise = video.pause();
      if (promise !== undefined) {
        promise.catch(function (error) {
          console.error('Auto-play was prevented');
          console.error('We Show a UI element to let the user manually start playback');
          activeMobile.style.display = 'block';
        }).then(function () {
          console.info('Auto-play started');
          document.getElementById("mobile-button").style.display = 'none';
        });
      }
    }); //  Fires when the browser can play through the audio/video without stopping for buffering

    
  };