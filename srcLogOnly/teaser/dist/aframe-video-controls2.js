/******/
(function (modules) { // webpackBootstrap
  /******/ // The module cache
  /******/
  var installedModules = {};

  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {

    /******/ // Check if module is in cache
    /******/
    if (installedModules[moduleId])
      /******/
      return installedModules[moduleId].exports;

    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = installedModules[moduleId] = {
      /******/
      exports: {},
      /******/
      id: moduleId,
      /******/
      loaded: false
      /******/
    };

    /******/ // Execute the module function
    /******/
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    /******/ // Flag the module as loaded
    /******/
    module.loaded = true;

    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }


  /******/ // expose the modules object (__webpack_modules__)
  /******/
  __webpack_require__.m = modules;

  /******/ // expose the module cache
  /******/
  __webpack_require__.c = installedModules;

  /******/ // __webpack_public_path__
  /******/
  __webpack_require__.p = "";

  /******/ // Load entry module and return exports
  /******/
  return __webpack_require__(0);
  /******/
})
/************************************************************************/
/******/
([
  /* 0 */
  /***/
  function (module, exports) {

    if (typeof AFRAME === 'undefined') {
      throw new Error('Component attempted to register before AFRAME was available.');
    }

    var DEFAULT_INFO_TEXT_BOTTOM = '';
    var DEFAULT_INFO_TEXT_TOP = '';

    /**
     ** Video control component for A-Frame.
     */

    AFRAME.registerComponent('video-controls', {
      schema: {
        src: {
          type: 'string'
        },
        size: {
          type: 'number',
          default: 1.0
        },
        distance: {
          type: 'number',
          default: 2.0
        },
        barColor: {
          default: 'black'
        },
        backgroundColor: {
          default: 'white;'
        },

        textColor: {
          default: 'white'
        },
        infoTextBottom: {
          default: "white"
        },
        infoTextTop: {
          default: "white"
        },
        infoTextFont: {
          default: '35px Helvetica Neue'
        },
        statusTextFont: {
          default: '30px Helvetica Neue'
        },
        timeTextFont: {
          default: '70px Helvetica Neue'
        }
      },

      position_time_from_steps: function () {

        var unit_offset = this.current_step / this.bar_steps;

        if (this.video_el.readyState > 0) {

          this.video_el.currentTime = unit_offset * this.video_el.duration;
        }


      },

      // Puts the control in from of the camera, at this.data.distance, facing it...

      position_control_from_camera: function () {

        var self = this;

        var camera = self.el.sceneEl.camera;

        if (camera) {

          var camera_rotation = camera.el.getAttribute("rotation");
          // console.log(camera);
          var camera_yaw = camera_rotation.y;

          // Set position of menu based on camera yaw and data.pitch

          // Have to add 1.6m to camera.position.y (????)
          // console.log(self);
          self.y_position = -(camera.position.y + 0.2);
          self.x_position = self.data.distance * Math.sin(camera_yaw * Math.PI / 180.0);
          self.z_position = -(self.data.distance * Math.cos(camera_yaw * Math.PI / 180.0));
          // self.y_position = 0.5;
          // self.x_position = 1;
          // self.z_position = -3;

          // self.el.setAttribute("position", [0, 0, 0].join(" "));
          // console.log('x_position', self.x_position);
          // console.log('y_position', self.y_position);
          // console.log('z_position', self.z_position);
          self.el.setAttribute("position", [self.x_position, self.y_position, self.z_position].join(" "));


          // and now, make our controls rotate towards origin
          // console.log('camera.position.x', camera.position.x);
          // console.log('camera.position.y', camera.position.y);
          // console.log('camera.position.z', camera.position.z);
          this.el.object3D.lookAt(new THREE.Vector3(camera.position.x, camera.position.y + 0.2, camera.position.z));

        }

      },
      /**
       * Called once when component is attached. Generally for initial setup.
       */
      init: function () {

        var self = this;
        this.intervalId = 0;
        var intervalSet = false;
        // var controlSpeed = this;

        // Next two vars used to control transport bar with keyboard arrows

        this.bar_steps = 15.0;

        this.current_step = 0.0;

        this.el.setAttribute("visible", false);

        this.video_selector = this.data.src;

        this.video_el = document.querySelector(this.video_selector);

        // image sources for play/pause

        self.play_image_src = document.getElementById("video-play-image") ? "#video-play-image" : "./assets/newer_play_button.png";
        self.pause_image_src = document.getElementById("video-pause-image") ? "#video-pause-image" : "./assets/new_pause_button.png";
        self.back_image_src = document.getElementById("video-back-image") ? "#video-back-image" : "./assets/home_icon.png";
        self.close_image_src = document.getElementById("video-close-image") ? "#video-close-image" : "./assets/cancel.png";
        self.rewind_image_src = document.getElementById("video-rewind-image") ? "#video-rewind" : "./assets/rewind_time.png";
        self.short_rewind_image_src = document.getElementById("short-video-rewind-image") ? "#short-video-rewind" : "./assets/rewind_time.png";
        self.forward_image_src = document.getElementById("video-forward-image") ? "#video-forward" : "./assets/fast_time.png";
        self.short_forward_image_src = document.getElementById("short-video-forward-image") ? "#short-video-forward" : "./assets/fast_time.png";
        self.camera_image_src = document.getElementById("video-camera-image") ? "#video-camera-image" : "./assets/camera.png";
        self.speaker_image_src = document.getElementById('video-audio-image') ? '#video-audio-image' : './assets/icons8-speaker-96.png'
        self.mute_image_src = document.getElementById('video-audio-image') ? '#video-audio-image' : './assets/icons8-mute-96.png'
        self.network_indicator_src=initialUploadSpeed?initialUploadSpeed>=40?'./assets/networkIndicators/green.png':(initialUploadSpeed<40 && initialUploadSpeed>=20)?'./assets/networkIndicators/yellow.png':'./assets/networkIndicators/red.png':'./assets/networkIndicators/red.png'


        
        // Create icon image (play/pause), different image whether video is playing.

        this.play_image = document.createElement("a-image");
        this.play_image.setAttribute('scale', '0.6 0.6 0.6')


        if (this.video_el.paused) {
          this.play_image.setAttribute("src", self.play_image_src);
        } else {
          this.play_image.setAttribute("src", self.pause_image_src);
        }

        // Change icon to 'play' on end

        this.video_el.addEventListener("ended", function () {

          self.play_image.setAttribute("src", self.play_image_src);

        });

        // Change icon to 'pause' on start.

        this.video_el.addEventListener("pause", function () {

          self.play_image.setAttribute("src", self.play_image_src);

        });

        // Change icon to 'play' on pause.

        this.video_el.addEventListener("playing", function () {

          self.play_image.setAttribute("src", self.pause_image_src);

        });

        this.back_image = document.createElement("a-image");
        this.back_image.setAttribute("src", self.back_image_src);
        // this.back_image.setAttribute("scale", "0.5 0.5 0.5");
        this.back_image.addEventListener("click", function () {
          let test = document.querySelector('a-scene');
          test.exitVR();
          // TOREPLACE
          window.setTimeout(() => {
            if (window.location.search == '' || window.location.search == '?blackhawks' || window.location.search == '?travel-the-world' || window.location.search == '?golf-tournament') {
              window.location.assign(OUR_URL.LANDING_PAGE);
            }else {
              window.location.assign(OUR_URL.VR_PAGE);
            }
          }, 5000);
        });


        this.speaker_image = document.createElement('a-image');
        if (this.video_el.muted) {
          this.speaker_image.setAttribute('src', self.mute_image_src)
        }else {
          this.speaker_image.setAttribute('src', self.speaker_image_src)
        }

        this.speaker_image.addEventListener('click', () => {
          if (this.video_el.muted) {
            this.speaker_image.setAttribute('src', self.speaker_image_src)
            self.video_el.muted = false;
          }else {
            this.speaker_image.setAttribute('src', self.mute_image_src)
            self.video_el.muted = true;
          }
        })

        this.camera_image = document.createElement("a-image");
        this.camera_image.setAttribute("src", self.camera_image_src);
        let ua = window.navigator.userAgent.toString();
        if(ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1){
        // console.log("deactivating camera controls");
        this.camera_image.setAttribute("transparent","true");
        this.camera_image.setAttribute("opacity","0.0");
        this.camera_image.setAttribute("id","camera_hide");
        this.camera_image.style.display = "none !important";
        this.camera_image.classList.remove("clickable");
        this.camera_image.setAttribute("scale","0 0 0");
        // document.getElementById("camera_hide").removeAttribute("clickable");
        console.log(this.camera_image);
      }
        this.camera_image.addEventListener('click', () => {
          console.log('camera clicked')
          var rotation = new THREE.Euler();
          this.video_el.pause();
          // navigator.getVRDisplays()
          //   .then(response1 => response1)
          //   .then(response => {
          //     let result = response
          //     let vrHeadset = ''
          //     try {
          //       vrHeadset = response[0].displayName
          //       if (vrHeadset.search(/Cardboard/i) >= 0) {
          //         console.log("Cardboard");
          //         let scene = document.querySelector('a-scene');
          //         scene.exitVR();
          //       }
          //     } catch (e) {}
          //   });
          let controlbar = document.getElementById("controls");
          let cursor = document.getElementById("cursorToggle");
          controlbar.setAttribute('visible', 'false');
          cursor.setAttribute('visible', 'false');
          for (i = 1; i < controlbar.childElementCount; ++i) {
            // console.log(controlbar.children[i]);
            controlbar.children[i].removeAttribute('class');
          }
          controlbar.removeAttribute('dynamic-ring');

          document.getElementById('the3').setAttribute('the3-animation', '');
          // console.log('activator-sphere');
          // navigator.getVRDisplays()
          // .then(response1=>response1)
          // .then(response=>{
          //   let result=response
          //   let vrHeadset=''
          //   try {
          //     vrHeadset=response[0].displayName
          //     if (vrHeadset.search(/Oculus/i) >= 0) {
          //       let rotation = new THREE.Euler()
          //       rotation = document.getElementById('camera').object3D.rotation
          //       let scene = document.querySelector('a-scene');
          //       scene.exitVR();
          //       document.getElementById('camera').object3D.rotation.set(rotation.x, rotation.y, rotation.z);
          // document.querySelector('a-scene').components.screenshot.capture('perspective');

          //     }
          //   }catch(e){
          //   }
          // })
          window.setTimeout(() => {
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
              var canvas = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
              canvas.toBlob(function (blob) {
                saveAs(blob, 'hello_world.png')
                window.location.replace('https://njs6.bsafe.life/test.html');
              });
            } else {
              navigator.getVRDisplays()
                .then(response1 => response1)
                .then(response => {
                  let vrHeadset = ''
                  let scene = document.querySelector('a-scene');
                  try {
                    vrHeadset = response[0].displayName
                    // TODO: Fix screenshot for Android
                    if (vrHeadset.search(/Cardboard/i) >= 0) {
                      // console.log("Android");
                      rotation = document.getElementById('camera').object3D.rotation
                      // scene.exitVR();
                      // console.log('rotation', rotation);
                      document.getElementById('rotate-sphere').object3D.rotation.x = -rotation.x;
                      document.getElementById('rotate-sphere-2').object3D.rotation.y = -rotation.y;
                      document.querySelector('a-scene').components.screenshot.capture('perspective');
                      document.getElementById('rotate-sphere').object3D.rotation.x = 0;
                      document.getElementById('rotate-sphere-2').object3D.rotation.y = 0;
                    } else if (vrHeadset.search(/Oculus/i) >= 0) {
                      // document.getElementById('camera').removeAttribute('camera-reader');
                      // console.log("Oculus");
                      rotation = document.getElementById('camera').object3D.rotation
                      // scene.exitVR();
                      // console.log('rotation', rotation);
                      document.getElementById('rotate-sphere').object3D.rotation.x = -rotation.x;
                      document.getElementById('rotate-sphere-2').object3D.rotation.y = -rotation.y;
                      document.querySelector('a-scene').components.screenshot.capture('perspective');
                      document.getElementById('rotate-sphere').object3D.rotation.x = 0;
                      document.getElementById('rotate-sphere-2').object3D.rotation.y = 0;
                    }
                  } catch (e) {
                    // console.log('Desktop');
                    document.querySelector('a-scene').components.screenshot.capture('perspective');
                  }
                });
            }
            // }
            // saveAs(download, "hello_world.img");
            // let canvas = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
            // var w=window.open('about:blank','image from canvas');
            // w.document.write("<img src='"+canvas.toDataURL("image/png")+"' alt='from canvas'/>");
            // console.log(url)
            // window.location.replace(dataURL);
          }, 3500);

          // window.setTimeout(() => {
          //   document.querySelector('a-scene').components.screenshot.capture('perspective');
          //   // for (i = 1; i < controlbar.childElementCount; ++i) {
          //   //   // console.log(controlbar.children[i]);
          //   //   controlbar.children[i].setAttribute('class', 'clickable')
          //   // }
          //   // controlbar.setAttribute('dynamic-ring', '');
          // }, delay);
          //   for (i = 1; i < controlbar.childElementCount; ++i) {
          //      // console.log(controlbar.children[i]);
          //      controlbar.children[i].removeAttribute('class', 'clickable')
          //   }
          //   controlbar.removeAttribute('dynamic-ring');
          //   document.getElementById('play-ring').removeAttribute('play-ring-animation');
          //   document.getElementById('play-ring').setAttribute('theta-length', '0.000000000000000001');

          // //  document.querySelector('a-text').setAttribute("transparent", "false");
          // //  document.querySelector('a-text').setAttribute("opacity", "1");
          // document.querySelector('a-scene').components.screenshot.capture('perspective');
        });



        // this.camera_image = document.createElement("a-image");
        // this.camera_image.setAttribute("src", self.camera_image_src);
        // this.camera_image.addEventListener("click", () => {
        //   this.video_el.pause();
        //   document.getElementById('the3').setAttribute('the3-animation', '');
        //   console.log('start animatin');
        //   // window.setTimeout(() => {document.querySelector('a-scene').components.screenshot.capture('perspective')}, 3250);
        // });

        this.close_image = document.createElement('a-image');
        this.close_image.setAttribute('src', self.close_image_src);
        this.close_image.setAttribute('scale', '0.5 0.5 0.5');
        this.close_image.addEventListener('click', () => {
          // console.log('close menu');
          let controlbar = document.getElementById("controls");
          let cursor = document.getElementById("cursorToggle");
          controlbar.setAttribute('visible', 'false');
          cursor.setAttribute('visible', 'false');
          for (i = 1; i < controlbar.childElementCount; ++i) {
            // console.log(controlbar.children[i]);
            controlbar.children[i].removeAttribute('class', 'clickable')
          }
          controlbar.removeAttribute('dynamic-ring');
          document.getElementById('play-ring').removeAttribute('play-ring-animation');
          document.getElementById('play-ring').setAttribute('theta-length', '0.05');
        })



        //     this.rewind_image = document.createElement("a-image");
        //     this.rewind_image.setAttribute("src", self.rewind_image_src);
        //     this.rewind_image.setAttribute("id", "rewind");
        //     this.rewind_image.addEventListener("click", () => {
        //      console.log("anything andrew doesn't care")
        //      if (!intervalSet) {
        //       this.intervalId = window.setInterval(() => {
        //         intervalSet = true;
        //         console.log('hehehe',this.intervalId);
        //         console.log("hi");
        //         console.log("rewind working");
        //         console.log(video.currentTime);
        //         // var controlSpeed = 15;
        //  // document.getElementById("video").currentTime(video.currentTime() - 15);
        //  self.current_step = self.current_step > 0 ? self.current_step - 15 : self.current_step;
        //               self.position_time_from_steps(); 
        //       }, 1000);
        //       // this.rewind_image.addEventListener("mouseleave", () => {
        //       //   window.clearInterval(this.intervalID)
        //       // })
        //      }

        //       // window.clearInterval(intervalID);
        //     });
        //     // this.rewind_image.addEventListener("mouseleave", function(){
        //     //   clearInterval(rewindLeave);
        //     // });

        //     // document.getElementById("rewind").mouseout(function(){
        //     //   clearInterval(rewindLeaving)
        //     // });
        // //     var rewingLeave = document.getElementById("rewind");
        // //    $("#rewind").addEventListener("mouseleave" , function(){

        // //    });
        //     this.rewind_image.addEventListener("mouseleave", () => {
        //       console.log("leave");
        //       console.log(this.intervalId);
        //       window.clearInterval(this.intervalId);
        //       intervalSet = false;
        // //       clearInterval(function(){
        // //         console.log("hi leave");
        // //         console.log("rewind working leave");
        // //         console.log(video.currentTime);
        // //  // document.getElementById("video").currentTime(video.currentTime() - 15);
        // //  self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
        // //               self.position_time_from_steps(); 
        // //       });

        //     }); 

        //     this.rewind_image.addEventListener("mouseleave", function() {

        //       clearInterval(function(){
        //         console.log("hi");
        //         console.log("rleaveplzzzz");
        //         console.log(video.currentTime);
        //         self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
        //         self.position_time_from_steps(); 
        // });


        //  // document.getElementById("video").currentTime(video.currentTime() - 15);
        // //  self.current_step = self.current_step 


        //     });


        this.short_rewind_image = document.createElement("a-image");
        this.short_rewind_image.setAttribute("src", self.short_rewind_image_src);

        this.short_rewind_image.addEventListener("click", () => {
          // console.log("anything andrew doesn't care")
          // if (!intervalSet) {
          //   this.intervalId = window.setInterval(() => {
          //     intervalSet = true;
              //  console.log('hehehe',this.intervalId);
              //  console.log("hi");
              //  console.log("rewind working");
              //  console.log(video.currentTime);
              //  var controlSpeed = 1;
              // document.getElementById("video").currentTime(video.currentTime() - 15);
              self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
              // self.position_time_from_steps();
              self.video_el.currentTime -= 10;
            // }, 1000);
            // this.rewind_image.addEventListener("mouseleave", () => {
            //   window.clearInterval(this.intervalID)
            // })
          // }

          // window.clearInterval(intervalID);
        });


        this.short_rewind_image.addEventListener("mouseleave", () => {
          //  console.log("leave");
          //  console.log(this.intervalId);
          // window.clearInterval(this.intervalId);
          // intervalSet = false;
          //       clearInterval(function(){
          //         console.log("hi leave");
          //         console.log("rewind working leave");
          //         console.log(video.currentTime);
          //  // document.getElementById("video").currentTime(video.currentTime() - 15);
          //  self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
          //               self.position_time_from_steps(); 
          //       });

        });

        // FORWARD BUTTONS
        //     this.forward_image = document.createElement("a-image");
        //     this.forward_image.setAttribute("src", self.forward_image_src);
        //     this.forward_image.addEventListener("click", () => {
        //       console.log("anything andrew doesn't care")
        //       if (!intervalSet) {
        //        this.intervalId = window.setInterval(() => {
        //          intervalSet = true;
        //          console.log('hehehe',this.intervalId);
        //          console.log("hi");
        //          console.log("rewind working");
        //          console.log(video.currentTime);
        //         //  var controlSpeed = 1;
        //   // document.getElementById("video").currentTime(video.currentTime() - 15);
        //   self.current_step = self.current_step > 0 ? self.current_step + 1 : self.current_step;
        //                self.position_time_from_steps(); 
        //        }, 1000);
        //        // this.rewind_image.addEventListener("mouseleave", () => {
        //        //   window.clearInterval(this.intervalID)
        //        // })
        //       }

        //        // window.clearInterval(intervalID);
        //      });
        //      this.forward_image.addEventListener("mouseleave", () => {
        //       console.log("leave");
        //       console.log(this.intervalId);
        //       window.clearInterval(this.intervalId);
        //       intervalSet = false;
        // //       clearInterval(function(){
        // //         console.log("hi leave");
        // //         console.log("rewind working leave");
        // //         console.log(video.currentTime);
        // //  // document.getElementById("video").currentTime(video.currentTime() - 15);
        // //  self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
        // //               self.position_time_from_steps(); 
        // //       });

        //     }); 

        this.short_forward_image = document.createElement("a-image");
        this.short_forward_image.setAttribute("src", self.short_forward_image_src);
        this.short_forward_image.addEventListener("click", () => {
          // console.log("anything andrew doesn't care")
          // if (!intervalSet) {
          //   this.intervalId = window.setInterval(() => {
          //     intervalSet = true;
          //     //  console.log('hehehe',this.intervalId);
          //     //  console.log("hi");
          //     //  console.log("rewind working");
          //     //  console.log(video.currentTime);
          //     //  var controlSpeed = 1;
          //     // document.getElementById("video").currentTime(video.currentTime() - 15);
              self.current_step = self.current_step > 0 ? self.current_step + 1 : self.current_step;
              // self.position_time_from_steps();
              self.video_el.currentTime += 10;
          //   }, 1000);
            // this.rewind_image.addEventListener("mouseleave", () => {
            //   window.clearInterval(this.intervalID)
            // })
          // }

          // window.clearInterval(intervalID);
        });
        this.short_forward_image.addEventListener("mouseleave", () => {
          // console.log("leave");
          // console.log(this.intervalId);
          window.clearInterval(this.intervalId);
          intervalSet = false;
          //       clearInterval(function(){
          //         console.log("hi leave");
          //         console.log("rewind working leave");
          //         console.log(video.currentTime);
          //  // document.getElementById("video").currentTime(video.currentTime() - 15);
          //  self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
          //               self.position_time_from_steps(); 
          //       });

        });


        this.rewind_image,
          this.short_rewind_image,
          this.forward_image,
          this.short_forward_image.addEventListener("mouseleave", () => {
            // console.log("leave");
            // console.log(this.intervalId);
            window.clearInterval(this.intervalId);
            intervalSet = false;
            //       clearInterval(function(){
            //         console.log("hi leave");
            //         console.log("rewind working leave");
            //         console.log(video.currentTime);
            //  // document.getElementById("video").currentTime(video.currentTime() - 15);
            //  self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
            //               self.position_time_from_steps(); 
            //       });

          });

        // window.clearInterval(intervalID);
        //  });


        // var clickTimer, clickEvent, onLongClick;
        // this.rewind_image.on("mousedown", function(){
        //   if(clickTimer) {
        //     window.clearTimeout(clickTimer);
        //     clickEvent = null;
        //   }
        //   clickTimer = window.setTimeout(onLongClick, 500);
        //   clickEvent = event;
        // });
        // this.rewind_image.on("mouseup", function(){
        //   window.clearTimeout(clickTimer);
        //   clickEvent = null;
        // });
        // onLongClick = function() {
        //   self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
        //        self.position_time_from_steps();
        // };
        //   rewind_image_src.on('mousedown mouseup', function mouseState(e) {
        //     if (e.type == "mousedown") {
        //         //code triggers on hold
        //         console.log("hold");
        //     }
        // });

        this.bar_canvas = document.createElement("canvas");
        this.bar_canvas.setAttribute("id", "video_player_canvas");
        this.bar_canvas.width = 1024;
        this.bar_canvas.height = 256;
        this.bar_canvas.style.display = "none";

        this.context = this.bar_canvas.getContext('2d');

        this.texture = new THREE.Texture(this.bar_canvas);

        // On icon image, change video state and icon (play/pause)

        this.play_image.addEventListener('click', function (event) {

          if (!self.video_el.paused) {
            this.setAttribute("src", self.play_image_src);

            self.video_el.pause();

          } else {
            this.setAttribute("src", self.pause_image_src);

            self.video_el.play();

          }

          // Prevent propagation upwards (e.g: canvas click)

          event.stopPropagation();

          event.preventDefault();

        });
        this.play_image.addEventListener('fusing', function () {
          document.getElementById('play-ring').setAttribute('play-ring-animation');
        });

        // window.addEventListener('keyup', function (event) {
        //   switch (event.keyCode) {

        //     // If space bar is pressed, fire click on play_image
        //     case 32:
        //       self.play_image.dispatchEvent(new Event('click'));
        //       break;

        //       // Arrow left: beginning
        //     case 37:
        //       self.current_step = 0.0;
        //       self.position_time_from_steps();
        //       break;

        //       // Arrow right: end
        //     case 39:
        //       self.current_step = self.bar_steps;
        //       self.position_time_from_steps();

        //       break;

        //       // Arrow up: one step forward
        //     case 38:
        //       self.current_step = self.current_step < (self.bar_steps) ? self.current_step + 1 : self.current_step;
        //       self.position_time_from_steps();

        //       break;

        //       // Arrow down: one step back
        //     case 40:
        //       self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
        //       self.position_time_from_steps();

        //       break;

        //   }
        // }, false);


        // Create transport bar

        this.bar = document.createElement("a-plane");
        this.bar.setAttribute("transparent", "true");
        this.bar.setAttribute("opacity", "0");

        // On transport bar click, get point clicked, infer % of new pointer, and make video seek to that point
        this.bar.addEventListener('fusing', function (event) {
          var point = document.getElementById('cursorToggle').components.raycaster.raycaster.intersectObject(this.object3D, true)[0].point;
          document.getElementById('play-ring').object3D.position.set(point.x, point.y, point.z);
          document.getElementById('play-ring').setAttribute('scale', '0.3 0.3 0.3')
          document.getElementById('play-ring').setAttribute('play-ring-animation', '');
        });
        this.bar.addEventListener('click', function (event) {

          // Get raycast intersection point, and from there, x_offset in bar

          var point = document.getElementById('cursorToggle').components.raycaster.raycaster.intersectObject(this.object3D, true)[0].point;
          // console.log(point);

          var x_offset = this.object3D.worldToLocal(point).x;

          var unit_offset = (x_offset / self.data.size) + 0.5;

          // Update current step for coherence between point+click and key methods

          self.current_step = Math.round(unit_offset * self.bar_steps);

          if (self.video_el.readyState > 0) {

            self.video_el.currentTime = unit_offset * self.video_el.duration;
          }

          // Prevent propagation upwards (e.g: canvas click)

          event.stopPropagation();

          event.preventDefault();

        });

        this.network_indicator=document.createElement('a-image')
        this.network_indicator.setAttribute('src',self.network_indicator_src)
        this.network_indicator.setAttribute('id','networkIndicator')
        

        // Append image icon + info text + bar to component root

        this.el.appendChild(this.bar_canvas);
        this.el.appendChild(this.play_image);
        this.el.appendChild(this.back_image);
        this.el.appendChild(this.bar);
        // this.el.appendChild(this.rewind_image);
        this.el.appendChild(this.short_rewind_image);
        // this.el.appendChild(this.forward_image);
        this.el.appendChild(this.short_forward_image);
        this.el.appendChild(this.camera_image);
        this.el.appendChild(this.close_image);
        this.el.appendChild(this.speaker_image);
        this.el.appendChild(this.network_indicator);


        // Attach double click behavior outside player once scene is loaded

        this.el.sceneEl.addEventListener("loaded", function () {

          self.position_control_from_camera();

          // this.addEventListener("dblclick", function () {

          //   var raycaster = document.getElementById("cursorToggle").components.raycaster.raycaster;

          //   // Double click is outside the player
          //   // (note that for some reason you cannot prevent a dblclick on player from bubbling up (??)

          //   if (raycaster.intersectObject(self.el.object3D, true).length == 0) {

          //     // If controls are show: hide


          //     if (self.el.getAttribute("visible")) {
          //       self.el.setAttribute("visible", false);
          //     }
          //     // Else, show at 'distance' from camera
          //     else {
          //       self.el.setAttribute("visible", true);

          //       self.position_control_from_camera();
          //     }
          //   }

          // });


        });

      },

      /**
       * Called when component is attached and when component data changes.
       * Generally modifies the entity based on the data.
       */
      update: function (oldData) {

        this.position_control_from_camera();

        this.bar.setAttribute("height", "0.1");
        this.bar.setAttribute("scale", "1 0.1 1");
        this.bar.setAttribute("position", "0 -2 0");
        // this.bar.setAttribute("border", "0 0.75 0");
        // this.bar.setAttribute("color", "#7198e5");
        // console.log('bar data', this.bar.getAttribute('position'));


        this.bar.setAttribute("height", this.data.size / 6.0);
        this.bar.setAttribute("width", this.data.size);
        // this.bar.setAttribute("position", "0.0 0.0 0");


        this.play_image.setAttribute("height", this.data.size / 6.0);
        this.play_image.setAttribute("width", this.data.size / 6.0);
        this.play_image.setAttribute("position", "0  -2.75  0");
        // console.log('play data', this.play_image.getAttribute('position'));

        this.back_image.setAttribute("height", this.data.size / 10.0);
        this.back_image.setAttribute("width", this.data.size / 10.0);
        this.back_image.setAttribute("position", "0 -1.5 0");
        // this.bar.setAttribute("color", "#7198e5"); 
        // console.log('back data', this.back_image.getAttribute('position'));

        // this.rewind_image.setAttribute("height", this.data.size/6.0);
        // this.rewind_image.setAttribute("width", this.data.size/6.0);
        // this.rewind_image.setAttribute("position",  "-2 -2.5 0");

        this.short_rewind_image.setAttribute("height", this.data.size / 10.0);
        this.short_rewind_image.setAttribute("width", this.data.size / 10.0);
        this.short_rewind_image.setAttribute("position", "-1 -2.75 0");

        // this.forward_image.setAttribute("height", this.data.size/6.0);
        // this.forward_image.setAttribute("width", this.data.size/6.0);
        // this.forward_image.setAttribute("position",  "2 -2.5 0");

        this.short_forward_image.setAttribute("height", this.data.size / 10.0);
        this.short_forward_image.setAttribute("width", this.data.size / 10.0);
        this.short_forward_image.setAttribute("position", "1 -2.75 0");

        this.camera_image.setAttribute("height", this.data.size / 10.0);
        this.camera_image.setAttribute("width", this.data.size / 10.0);
        this.camera_image.setAttribute("position", "-1.5 -1.5 0");

        this.close_image.setAttribute("height", this.data.size / 10.0);
        this.close_image.setAttribute("width", this.data.size / 10.0);
        this.close_image.setAttribute("position", "1.5 -1.5 0");

        this.speaker_image.setAttribute('height', this.data.size / 10.0);
        this.speaker_image.setAttribute('width', this.data.size / 10.0);
        this.speaker_image.setAttribute('position', '-1.75 -2.75 0');

        this.network_indicator.setAttribute('height',this.data.size/10)
        this.network_indicator.setAttribute('width',this.data.size/10)
        this.network_indicator.setAttribute('position', '1.75 -2.75 0');

      },

      /**
       * Called when a component is removed (e.g., via removeAttribute).
       * Generally undoes all modifications to the entity.
       */
      remove: function () {},

      /**
       * Called on each scene tick.
       */
      //     tick: function (t) {

      //       // Refresh every 250 millis

      //       if(typeof(this.last_time) === "undefined" || (t - this.last_time ) > 250) {

      //           // At the very least, have all video metadata
      //           // (https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState)

      //           if(this.video_el.readyState > 0) {

      //               // Get current position minutes and second, and add leading zeroes if needed

      //               var current_minutes = Math.floor(this.video_el.currentTime / 60);
      //               var current_seconds = Math.floor(this.video_el.currentTime % 60);


      //               current_minutes = current_minutes < 15 ? "0" + current_minutes : current_minutes;
      //               current_seconds = current_seconds < 15 ? "0" + current_seconds : current_seconds;

      //               // Get video duration in  minutes and second, and add leading zeroes if needed

      //               var duration_minutes = Math.floor(this.video_el.duration / 60);
      //               var duration_seconds = Math.floor(this.video_el.duration % 60);


      //               duration_minutes = duration_minutes < 15 ? "0" + duration_minutes : duration_minutes;
      //               duration_seconds = duration_seconds < 15 ? "0" + duration_seconds : duration_seconds;

      //               // Refresh time information : currentTime / duration

      //               var time_info_text = current_minutes + ":" + current_seconds + " / " + duration_minutes + ":" + duration_seconds;

      //               //  Refresh transport bar canvas

      //               var inc = this.bar_canvas.width / this.video_el.duration;

      //               //  display buffered TimeRanges

      //               if (this.video_el.buffered.length > 0) {

      //                   // Synchronize current step with currentTime

      //                   this.current_step = Math.round((this.video_el.currentTime/this.video_el.duration)*this.bar_steps);

      //                   var ctx = this.context;
      //                   ctx.fillStyle = this.data.backgroundColor;
      //                   ctx.fillRect(0, 0, this.bar_canvas.width, this.bar_canvas.height);

      //                   // Uncomment to draw a single bar for loaded data instead of 'bins'

      //                                  ctx.fillStyle = "black";

      //                                  ctx.fillRect(0, 0,
      //                                      (this.video_el.buffered.end(this.video_el.buffered.length - 1) / this.video_el.duration)*this.bar_canvas.width,
      //                                      this.bar_canvas.height/2);



      //                   // Display time info text


      //                   // ctx.font = this.data.timeTextFont;
      //                   // ctx.fillStyle = "white";
      //                   // ctx.textAlign = "left";
      //                   // ctx.fillText(time_info_text, this.bar_canvas.width/2, this.bar_canvas.height* 0.65);

      //                   // DEBUG PURPOSES

      //                  ctx.fillText(this.video_el.readyState, this.bar_canvas.width*0.1, this.bar_canvas.height* 0.65);

      //                   // If seeking to position, show

      //                   if(this.video_el.seeking){
      //                       ctx.font = this.data.statusTextFont;
      //                       ctx.fillStyle = this.data.textColor;
      //                       ctx.textAlign = "end";
      //                       ctx.fillText("Seeking", this.bar_canvas.width * 0.95, this.bar_canvas.height * 0.60);
      //                   }

      //                   // Uncomment below to see % of video loaded...

      //                   else {

      //                       var percent = (this.video_el.buffered.end(this.video_el.buffered.length - 1) / this.video_el.duration) * 100;

      //                       // ctx.font = this.data.statusTextFont;
      //                       ctx.fillStyle = this.data.backgroundColor;
      //                       ctx.textAlign = "end";

      //                       ctx.fillText(percent.toFixed(0) + "% loaded", this.bar_canvas.width * 0.95, this.bar_canvas.height * 0.60);
      //                   }


      //                   // Info text

      //                   ctx.fillStyle = this.data.textColor;
      //                   ctx.font = this.data.infoTextFont;
      //                   ctx.textAlign = "center";
      //                   ctx.fillText(this.data.infoTextTop, this.bar_canvas.width/2, this.bar_canvas.height* 0.8);
      //                   ctx.fillText(this.data.infoTextBottom, this.bar_canvas.width/2, this.bar_canvas.height* 0.95);

      //                   ctx.font = this.data.infoTextFont;
      //                   ctx.fillStyle = "white";
      //                   ctx.textAlign = "center";
      //                   ctx.fillText(this.data.infoTextBottom, this.bar_canvas.width/2, this.bar_canvas.height* 0.65);

      //                   // Show buffered ranges 'bins'

      //                   for (var i = 0; i < this.video_el.buffered.length; i++) {

      //                       var startX = this.video_el.buffered.start(i) * inc;
      //                       var endX = this.video_el.buffered.end(i) * inc;
      //                       var width = endX - startX;

      //                       ctx.fillStyle = "black";
      //                       ctx.fillRect(startX, 0, width, this.bar_canvas.height);

      //                   }

      //                   // Red bar with already played range

      //                   ctx.fillStyle = "#7198e5";
      //                   ctx.fillRect(0, 0,
      //                       (this.video_el.currentTime / this.video_el.duration)*this.bar_canvas.width,
      //                       this.bar_canvas.height);


      //               }


      //               // If material is not mapped yet to canvas texture and bar object3D is ready
      //               // assign canvas as a texture

      //               if(this.bar.object3D.children.length > 0) {

      //                   // If material is not mapped yet to canvas texture...

      //                   if(this.bar.object3D.children[0].material.map === null) {
      //                       this.bar.object3D.children[0].material = new THREE.MeshBasicMaterial();
      //                       this.bar.object3D.children[0].material.map = this.texture;
      //                   }

      //                   this.texture.needsUpdate = true;
      //               }


      //           }

      //           // Save this 't' to last_time

      //           this.last_time = t;
      //       }
      //     },

      //     /**
      //      * Called when entity pauses.
      //      * Use to stop or remove any dynamic or background behavior such as events.
      //      */
      //     pause: function () { },

      //     /**
      //      * Called when entity resumes.
      //      * Use to continue or add any dynamic or background behavior such as events.
      //      */
      //     play: function () { }
      //   });

      //   // document.getElementById("videoRewindImage").onclick(function(){
      //   //   console.log("rewind clicked");
      //   //   self.current_step = self.current_step > 0 ? self.current_step - 1 : self.current_step;
      //   //   self.position_time_from_steps();
      //   //  });

      // /***/ }
      // /******/ ]);

      tick: function (t) {

        // Refresh every 250 millis

        if (typeof (this.last_time) === "undefined" || (t - this.last_time) > 250) {

          // At the very least, have all video metadata
          // (https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState)

          if (this.video_el.readyState > 0) {

            // Get current position minutes and second, and add leading zeroes if needed

            var current_minutes = Math.floor(this.video_el.currentTime / 60);
            var current_seconds = Math.floor(this.video_el.currentTime % 60);


            current_minutes = current_minutes < 10 ? "0" + current_minutes : current_minutes;
            current_seconds = current_seconds < 10 ? "0" + current_seconds : current_seconds;

            // Get video duration in  minutes and second, and add leading zeroes if needed

            var duration_minutes = Math.floor(this.video_el.duration / 60);
            var duration_seconds = Math.floor(this.video_el.duration % 60);


            duration_minutes = duration_minutes < 10 ? "0" + duration_minutes : duration_minutes;
            duration_seconds = duration_seconds < 10 ? "0" + duration_seconds : duration_seconds;

            // Refresh time information : currentTime / duration

            var time_info_text = current_minutes + ":" + current_seconds + " / " + duration_minutes + ":" + duration_seconds;

            //  Refresh transport bar canvas

            var inc = this.bar_canvas.width / this.video_el.duration;

            //  display buffered TimeRanges

            if (this.video_el.buffered.length > 0) {

              // Synchronize current step with currentTime

              this.current_step = Math.round((this.video_el.currentTime / this.video_el.duration) * this.bar_steps);

              var ctx = this.context;
              ctx.fillStyle = "black";
              // ctx.opacity = this.data.opacity;
              ctx.fillRect(0, 0, this.bar_canvas.width, this.bar_canvas.height);

              // Uncomment to draw a single bar for loaded data instead of 'bins'

              //  ctx.fillStyle = "transprent";

              ctx.fillRect(0, 0,
                (this.video_el.buffered.end(this.video_el.buffered.length - 1) / this.video_el.duration) * this.bar_canvas.width,
                this.bar_canvas.height / 0);



              // Display time info text

              ctx.font = this.data.timeTextFont;
              ctx.fillStyle = "white";
              ctx.textAlign = "center";
              ctx.fillText(time_info_text, this.bar_canvas.width / 2, this.bar_canvas.height * 0);

              // DEBUG PURPOSES

              //                ctx.fillText(this.video_el.readyState, this.bar_canvas.width*0.1, this.bar_canvas.height* 0.65);

              // If seeking to position, show

              if (this.video_el.seeking) {
                ctx.font = this.data.statusTextFont;
                ctx.fillStyle = this.data.textColor;
                ctx.textAlign = "end";
                ctx.fillText("Seeking", this.bar_canvas.width * 0.95, this.bar_canvas.height * 0);
              }

              // Uncomment below to see % of video loaded...
              else {

                var percent = (this.video_el.buffered.end(this.video_el.buffered.length - 1) / this.video_el.duration) * 00;

                ctx.font = this.data.statusTextFont;
                // ctx.fillStyle = this.data.textColor;
                ctx.textAlign = "end";

                ctx.fillText(percent.toFixed(0) + "% loaded", this.bar_canvas.width * 0.95, this.bar_canvas.height * 0.0);
              }


              // Info text

              ctx.fillStyle = this.data.textColor;
              ctx.font = this.data.infoTextFont;
              ctx.textAlign = "center";
              // ctx.fillText(this.data.infoTextTop, this.bar_canvas.width/2, this.bar_canvas.height* 0.8);
              // ctx.fillText(this.data.infoTextBottom, this.bar_canvas.width/2, this.bar_canvas.height* 0.95);

              // Show buffered ranges 'bins'

              for (var i = 0; i < this.video_el.buffered.length; i++) {

                var startX = this.video_el.buffered.start(i) * inc;
                var endX = this.video_el.buffered.end(i) * inc;
                var width = endX - startX;

                ctx.fillStyle = "black";
                ctx.fillRect(startX, 0, width, this.bar_canvas.height / 3);

              }

              // Red bar with already played range

              ctx.fillStyle = "#7198e5";
              ctx.fillRect(0, 0,
                (this.video_el.currentTime / this.video_el.duration) * this.bar_canvas.width,
                this.bar_canvas.height / 1);

            }


            // If material is not mapped yet to canvas texture and bar object3D is ready
            // assign canvas as a texture

            if (this.bar.object3D.children.length > 0) {

              // If material is not mapped yet to canvas texture...

              if (this.bar.object3D.children[0].material.map === null) {
                this.bar.object3D.children[0].material = new THREE.MeshBasicMaterial();
                this.bar.object3D.children[0].material.map = this.texture;
              }

              this.texture.needsUpdate = true;
            }


          }

          // Save this 't' to last_time

          this.last_time = t;
        }
      },

      /**
       * Called when entity pauses.
       * Use to stop or remove any dynamic or background behavior such as events.
       */
      pause: function () {},

      /**
       * Called when entity resumes.
       * Use to continue or add any dynamic or background behavior such as events.
       */
      play: function () {}
    });


    /***/
  }
  /******/
]);
