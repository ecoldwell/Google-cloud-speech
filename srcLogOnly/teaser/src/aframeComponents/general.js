// AFRAME.registerComponent("play-on-focus", {
    //   schema: {
    //     color: { default: "red" }
    //   },
    //   init: function () {
    //     let vid = document.getElementById("video");
    //     // var vid = videojs('video');
    //     let data = this.data;
    //     let el = this.el;
    //   }
    // });
    // AFRAME.registerComponent("controls-appear", {
    //   init: function () {
    //     let el = this.el;
    //     let data = this.data;
    //     let controlbar = document.getElementById("controls");
    //     let cursor = document.getElementById("cursorToggle");
    //     el.addEventListener("mouseenter", function () {
    //       // console.log("Enter");
    //       cursor.setAttribute("visible", "true");
    //       controlbar.setAttribute("visible", "true");
    //       // controlbar.setAttribute('controls-clean-up', '');
    //     });
    //     el.addEventListener("mouseleave", function () {
    //       // console.log("Leave");
    //       // cursor.setAttribute("visible", "false");
    //       controlbar.setAttribute("visible", "false");
    //     });
    // document.getElementById('control-plane').addEventListener('mouseleave', () => {
    //   console.log('control plane')
    //   for (i = 1; i < controlbar.childElementCount; ++i) {
    //     // console.log(controlbar.children[i]);
    //     controlbar.children[i].removeAttribute('class')
    //   }
    //   document.getElementById('controls').removeEventListener('mouseenter', () => {
    //     console.log('removing hahahahah');
    //   })
    // })
    // }
    // });


AFRAME.registerComponent('sphere-activate', {
    init: function () {
      let controlbar = document.getElementById("controls");
      let cursor = document.getElementById("cursorToggle");
      this.el.addEventListener('mouseenter', function () {
        cursor.setAttribute('visible', 'true');
      })
      this.el.addEventListener('mouseleave', function () {
        cursor.setAttribute('visible', 'false');
        document.getElementById('tl-ring').removeAttribute('tl-ring-animation');
        document.getElementById('tr-ring').removeAttribute('tr-ring-animation');
        document.getElementById('br-ring').removeAttribute('br-ring-animation');
        document.getElementById('bl-ring').removeAttribute('bl-ring-animation');
        document.getElementById('tl-ring').setAttribute('theta-length', '0.05');
        document.getElementById('tr-ring').setAttribute('theta-length', '0.05');
        document.getElementById('bl-ring').setAttribute('theta-length', '0.05');
        document.getElementById('br-ring').setAttribute('theta-length', '0.05');
        document.getElementById('tl-ring').setAttribute('color', 'black');
        document.getElementById('tr-ring').setAttribute('color', 'black');
        document.getElementById('bl-ring').setAttribute('color', 'black');
        document.getElementById('br-ring').setAttribute('color', 'black');
      })
      this.el.addEventListener("click", function () {
        // console.log('hehe');
        controlbar.setAttribute('visible', 'true');
        // document.getElementById('control-plane').setAttribute('visible', 'true');
        // document.querySelector('a-scene').components.screenshot.capture('perspective')
        for (i = 1; i < controlbar.childElementCount; ++i) {
          // console.log(controlbar.children[i]);
          controlbar.children[i].setAttribute('class', 'clickable')
        }
        controlbar.setAttribute('dynamic-ring', '');
      });
      this.el.addEventListener('fusing', function () {
        document.getElementById('tl-ring').setAttribute('tl-ring-animation', '');
      });
    }
  });

  AFRAME.registerComponent('dynamic-ring', {
    init: function () {
      // document.getElementById('controls').children[4].addEventListener('fusing', () => {
      //   // console.log('fusigegegegegegege');
      //   // document.getElementById('cursorToggle').setAttribute('cursor-animation', '');
      //   // let position = new THREE.Vector3();
      //   // document.getElementById('controls').children[4].object3D.getWorldPosition(position);
      //   // console.log(position);
      //   // document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
      //   // document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      //   // document.getElementById('play-ring').setAttribute('scale', '0.3 0.3 0.3');
      // })
      document.getElementById('controls').children[6].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })
      document.getElementById('controls').children[4].addEventListener('fusing', () => {
        let position = new THREE.Vector3();
        document.getElementById('controls').children[4].object3D.getWorldPosition(position);
        // console.log('2');
        // console.log(position);
        document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
        document.getElementById('play-ring').setAttribute('scale', '0.75 0.75 0.75')
        document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      })
      document.getElementById('controls').children[4].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })
      document.getElementById('controls').children[5].addEventListener('fusing', () => {
        let position = new THREE.Vector3();
        document.getElementById('controls').children[5].object3D.getWorldPosition(position);
        // console.log('3');
        // console.log(position);
        document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
        document.getElementById('play-ring').setAttribute('scale', '0.75 0.75 0.75')
        document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      })
      document.getElementById('controls').children[5].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })
      document.getElementById('controls').children[7].addEventListener('fusing', () => {
        let position = new THREE.Vector3();
        document.getElementById('controls').children[7].object3D.getWorldPosition(position);
        // console.log('5');
        // console.log(position);
        document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
        document.getElementById('play-ring').setAttribute('play-ring-animation', '');
        document.getElementById('play-ring').setAttribute('scale', '0.75 0.75 0.75')
      })
      document.getElementById('controls').children[7].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })
      document.getElementById('controls').children[8].addEventListener('fusing', () => {
        let position = new THREE.Vector3();
        document.getElementById('controls').children[8].object3D.getWorldPosition(position);
        // console.log('6');
        // console.log(position);
        document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
        document.getElementById('play-ring').setAttribute('scale', '0.75 0.75 0.75')
        document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      })
      document.getElementById('controls').children[8].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })
      document.getElementById('controls').children[9].addEventListener('fusing', () => {
        let position = new THREE.Vector3();
        document.getElementById('controls').children[9].object3D.getWorldPosition(position);
        // console.log('7');
        // console.log(position);
        document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
        document.getElementById('play-ring').setAttribute('scale', '0.75 0.75 0.75')
        document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      })
      document.getElementById('controls').children[9].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })
      document.getElementById('controls').children[10].addEventListener('fusing', () => {
        let position = new THREE.Vector3();
        document.getElementById('controls').children[10].object3D.getWorldPosition(position);
        // console.log('8');
        // console.log(position);
        document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
        document.getElementById('play-ring').setAttribute('scale', '0.75 0.75 0.75')
        document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      })
      document.getElementById('controls').children[10].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })

      document.getElementById('controls').children[11].addEventListener('fusing', () => {
        let position = new THREE.Vector3();
        document.getElementById('controls').children[11].object3D.getWorldPosition(position);
        // console.log('8');
        // console.log(position);
        document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
        document.getElementById('play-ring').setAttribute('scale', '0.75 0.75 0.75')
        document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      })
      document.getElementById('controls').children[11].addEventListener('mouseleave', () => {
        document.getElementById('play-ring').removeAttribute('play-ring-animation');
        document.getElementById('play-ring').setAttribute('theta-length', '0.05');
      })
      // document.getElementById('controls').children[9].addEventListener('fusing', () => {
      //   let position = new THREE.Vector3();
      //   document.getElementById('controls').children[9].object3D.getWorldPosition(position);
      //   console.log(position);
      //   document.getElementById('play-ring').object3D.position.set(position.x, position.y, position.z)
      //   document.getElementById('play-ring').setAttribute('play-ring-animation', '');
      // })
      // document.getElementById('controls').children[9].addEventListener('mouseleave', () => {
      //   document.getElementById('play-ring').removeAttribute('play-ring-animation');
      //   document.getElementById('play-ring').setAttribute('theta-length', '0');
      // })
    },
    remove: function () {
      document.getElementById('controls').children[4].removeEventListener('fusing', () => { });
      document.getElementById('controls').children[5].removeEventListener('fusing', () => { });
      document.getElementById('controls').children[7].removeEventListener('fusing', () => { });
      document.getElementById('controls').children[8].removeEventListener('fusing', () => { });
      document.getElementById('controls').children[9].removeEventListener('fusing', () => { });
      document.getElementById('controls').children[10].removeEventListener('fusing', () => { });
      document.getElementById('controls').children[11].removeEventListener('fusing', () => { });
      // document.getElementById('controls').children[9].removeEventListener('fusing', () => { });
    }
  });
  AFRAME.registerComponent('intersect', {
    init: function () {
      let controlbar = document.getElementById("controls");
      let cursor = document.getElementById("cursorToggle");
      this.el.addEventListener('raycaster-intersected', (evt) => {
        // console.log('intersect', evt);
        if (controlbar.children[3].getAttribute('class') == 'clickable') {
          cursor.setAttribute('visible', 'true');
          controlbar.setAttribute('visible', 'true');
          // console.log(evt);
        }
      })
      // this.el.addEventListener('raycaster-intersected-cleared', (evt) => {
      //   controlbar.setAttribute('visible', 'false');
      //   cursor.setAttribute('visible', 'false');
      //   console.log('clearrrrrrrr', evt)
      //   for (i = 1; i < controlbar.childElementCount; ++i) {
      //     // console.log(controlbar.children[i]);
      //     controlbar.children[i].removeAttribute('class', 'clickable')
      //   }
      //   controlbar.removeAttribute('dynamic-ring');
      //   document.getElementById('play-ring').removeAttribute('play-ring-animation');
      //   document.getElementById('play-ring').setAttribute('theta-length', '0');
      //   this.el.removeEventListener('mouseenter', () => {

      //   })
      // });
    }
  });

  AFRAME.registerComponent('tl-ring-animation', {
    init: function () {
      // document.getElementById('cursorToggle').setAttribute('visible', 'false');
      this.el.setAttribute('animation', 'property: theta-length; to: 360; easing: easeInQuad; dur: 250; delay: 300');
      this.el.addEventListener('animationcomplete', () => {
        this.el.removeAttribute('tl-ring-animation');
        this.el.setAttribute('color', 'cyan');
        document.getElementById('tr-ring').setAttribute('tr-ring-animation', '');
      });
    },
    remove: function () {
      this.el.removeAttribute('animation');
    }
  });
  AFRAME.registerComponent('tr-ring-animation', {
    init: function () {
      this.el.setAttribute('animation', 'property: theta-length; to: 360; easing: easeInQuad; dur: 250;');
      this.el.addEventListener('animationcomplete', () => {
        this.el.removeAttribute('tr-ring-animation');
        this.el.setAttribute('color', 'cyan');
        document.getElementById('br-ring').setAttribute('br-ring-animation', '');
      });
    },
    remove: function () {
      this.el.removeAttribute('animation');
    }
  });
  AFRAME.registerComponent('br-ring-animation', {
    init: function () {
      this.el.setAttribute('animation', 'property: theta-length; to: 360; easing: easeInQuad; dur: 250;');
      this.el.addEventListener('animationcomplete', () => {
        this.el.removeAttribute('br-ring-animation');
        this.el.setAttribute('color', 'cyan');
        document.getElementById('bl-ring').setAttribute('bl-ring-animation', '');
      });
    },
    remove: function () {
      this.el.removeAttribute('animation');
    }
  });
  AFRAME.registerComponent('bl-ring-animation', {
    init: function () {
      this.el.setAttribute('animation', 'property: theta-length; to: 360; easing: easeInQuad; dur: 250;');
      this.el.addEventListener('animationcomplete', () => {
        this.el.removeAttribute('bl-ring-animation');
        this.el.setAttribute('color', 'cyan');
        window.setTimeout(() => {
          document.getElementById('tl-ring').setAttribute('theta-length', '0.05');
          document.getElementById('tr-ring').setAttribute('theta-length', '0.05');
          document.getElementById('bl-ring').setAttribute('theta-length', '0.05');
          document.getElementById('br-ring').setAttribute('theta-length', '0.05');
          document.getElementById('tl-ring').setAttribute('color', 'black');
          document.getElementById('tr-ring').setAttribute('color', 'black');
          document.getElementById('bl-ring').setAttribute('color', 'black');
          document.getElementById('br-ring').setAttribute('color', 'black');
          document.getElementById('controls').setAttribute('visible', 'true');
          // document.getElementById('box-2').setAttribute('fade-in', '');
        }, 100)
      });
    },
    remove: function () {
      this.el.removeAttribute('animation');
    }
  });
  AFRAME.registerComponent('play-ring-animation', {
    init: function () {
      this.el.setAttribute('animation', 'property: theta-length; to: 360; easing: easeInQuad; dur: 1300;');
      this.el.addEventListener('animationcomplete', () => {
        this.el.setAttribute('theta-length', '0.05');
        this.el.removeAttribute('play-ring-animation');
      })
    },
    remove: function () {
      this.el.removeAttribute('animation');
    }
  })
  AFRAME.registerComponent('the3-animation', {
    init: function () {
      this.el.setAttribute('position', '0 0 -3');
      this.el.setAttribute('animation', 'property: opacity; from: 1.0; to: 0.0; easing: easeInQuad; dur: 1000');
      this.el.addEventListener('animationcomplete', () => {
        this.el.removeAttribute('the3-animation');
        document.getElementById('the2').setAttribute('the2-animation', '');
        // console.log('done!');
      })
    },
    remove: function () {
      this.el.removeAttribute('animation');
      this.el.setAttribute('position', '0 0 -6');
    }
  })
  AFRAME.registerComponent('the2-animation', {
    init: function () {
      this.el.setAttribute('position', '0 0 -3');
      this.el.setAttribute('animation', 'property: opacity; from: 1.0; to: 0.0; easing: easeInQuad; dur: 1000');
      this.el.addEventListener('animationcomplete', () => {
        this.el.removeAttribute('the2-animation');
        document.getElementById('the1').setAttribute('the1-animation', '');
        // console.log('done!');
      })
    },
    remove: function () {
      this.el.removeAttribute('animation');
      this.el.setAttribute('position', '0 0 -6');
    }
  })
  AFRAME.registerComponent('the1-animation', {
    init: function () {
      this.el.setAttribute('position', '0 0 -3');
      this.el.setAttribute('animation', 'property: opacity; from: 1.0; to: 0.0; easing: easeInQuad; dur: 1000');
      this.el.addEventListener('animationcomplete', () => {
        this.el.removeAttribute('the1-animation');
        // console.log('done!');
      })
    },
    remove: function () {
      this.el.setAttribute('position', '0 0 -6');
      this.el.removeAttribute('animation');
    }
  })

  AFRAME.registerComponent('camera-reader', {
    tick: function () {
      ++i;
      if (i >= 5) {
        i = 0;
        let position = new THREE.Vector3();
        let rotation = new THREE.Euler();
        // sphere is a hidden object used to help determine the direction user is facing
        // camera rotation also helps determine the direction the user is facing
        position = document.getElementById('sphere').object3D.getWorldPosition(position);
        rotation = document.getElementById('camera').object3D.rotation;
        //   let playPosition = new THREE.Vector3();
        //   playPosition = document.getElementById('controls').children[2].object3D.getWorldPosition(playPosition);
        // console.log(position);
        // mod 2PI to determine which way the user is facing. modulo because the rotation keeps adding up, e.g. 2 full circle is 4PI.
        // positive and negative are both separate cases, depending on which direction the user turns.
        // positive when turning left, negative when turning right
        let rotationMod = rotation.y % (2 * Math.PI);
        // console.log(rotationMod);
        let x_set = -1
        let z_set = Math.sqrt(29 - (x_set * x_set));
        let menuActivate_y = 4;
        let menuActivate_z = 4;
        let angle_set = Math.atan(x_set / z_set);
        // Dealing with + angles
        if (rotationMod >= 0) {
          // console.log('positive');
          // Front, angle smaller than 45deg or PI/4, or angle bigger than 315deg or 7PI/4
          if (rotationMod <= Math.PI / 4 || rotationMod > 7 * Math.PI / 4) {
            // console.log('in the front');
            document.getElementById('controls').object3D.position.set(0, -x_set, -z_set);   // position is set to a fixed distance
            // the order of rotation matters
            document.getElementById('controls').object3D.rotation.order = 'ZYX';
            document.getElementById('controls').object3D.rotation.set(angle_set, 0, 0);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'ZYX';
            document.getElementById('play-ring').object3D.rotation.set(angle_set, 0, 0);
            if (position.z >= -1.5 && position.z <= 2) { // when user is looking down, position the ball
              // document.getElementById('menu-sphere').object3D.position.set(0, -7, -1.5);
              // document.getElementById('lolgo').object3D.position.set(0, -menuActivate_y, -menuActivate_z);
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), 0, 0);
            }
          } else if (rotationMod <= 3 * Math.PI / 4 && rotationMod > Math.PI / 4) {
            // console.log('in the left');
            document.getElementById('controls').object3D.position.set(-z_set, -x_set, 0);
            document.getElementById('controls').object3D.rotation.order = 'ZYX';
            document.getElementById('controls').object3D.rotation.set(0, Math.PI / 2, -angle_set);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'ZYX';
            document.getElementById('play-ring').object3D.rotation.set(0, Math.PI / 2, -angle_set);
            if (position.x >= -1.5 && position.x <= 2) {
              // document.getElementById('menu-sphere').object3D.position.set(-1.5, -7, 0);
              // document.getElementById('lolgo').object3D.position.set(-menuActivate_z, -menuActivate_y, 0);
              // document.getElementById('lolgo').object3D.rotation.order = 'ZYX'
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), Math.PI / 2, 0);
            }
          } else if (rotationMod <= 5 * Math.PI / 4 && rotationMod > 3 * Math.PI / 4) {
            // console.log('in the back');
            document.getElementById('controls').object3D.position.set(0, -x_set, z_set);
            document.getElementById('controls').object3D.rotation.order = 'XYZ';
            document.getElementById('controls').object3D.rotation.set(-angle_set, Math.PI, 0);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'XYZ';
            document.getElementById('play-ring').object3D.rotation.set(-angle_set, Math.PI, 0);
            if (position.z >= -2 && position.z <= 1.5) {
              // document.getElementById('menu-sphere').object3D.position.set(0, -7, 1.5);
              // document.getElementById('lolgo').object3D.position.set(0, -menuActivate_y, menuActivate_z);
              // document.getElementById('lolgo').object3D.rotation.order = 'ZYX'
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), Math.PI, 0);
            }
          } else if (rotationMod <= 7 * Math.PI / 4 && rotationMod > 5 * Math.PI / 4) {
            // console.log('in the right');
            document.getElementById('controls').object3D.position.set(z_set, -x_set, 0);
            document.getElementById('controls').object3D.rotation.order = 'ZYX';
            document.getElementById('controls').object3D.rotation.set(0, -Math.PI / 2, angle_set);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'ZYX';
            document.getElementById('play-ring').object3D.rotation.set(0, -Math.PI / 2, angle_set);
            if (position.x >= -2 && position.x <= 1.5) {
              // document.getElementById('menu-sphere').object3D.position.set(1.5, -7, 0);
              // document.getElementById('lolgo').object3D.position.set(menuActivate_z, -menuActivate_y, 0);
              // document.getElementById('lolgo').object3D.rotation.order = 'ZYX'
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), -Math.PI / 2, 0);
            }
          }
        } else if (rotationMod < 0) {
          // console.log('negative');
          rotationMod = Math.abs(rotationMod);
          if (rotationMod <= Math.PI / 4 || rotationMod > 7 * Math.PI / 4) {
            // console.log('in the front');
            document.getElementById('controls').object3D.position.set(0, -x_set, -z_set);
            document.getElementById('controls').object3D.rotation.order = 'ZYX';
            document.getElementById('controls').object3D.rotation.set(angle_set, 0, 0);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'ZYX';
            document.getElementById('play-ring').object3D.rotation.set(angle_set, 0, 0);
            if (position.z >= -1.5 && position.z <= 2) {
              // document.getElementById('menu-sphere').object3D.position.set(0, -7, -1.5);
              // document.getElementById('lolgo').object3D.position.set(0, -menuActivate_y, -menuActivate_z);
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), 0, 0);
            }
          } else if (rotationMod <= 3 * Math.PI / 4 && rotationMod > Math.PI / 4) {
            // console.log('in the right');
            document.getElementById('controls').object3D.position.set(z_set, -x_set, 0);
            document.getElementById('controls').object3D.rotation.order = 'ZYX';
            document.getElementById('controls').object3D.rotation.set(0, -Math.PI / 2, angle_set);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'ZYX';
            document.getElementById('play-ring').object3D.rotation.set(0, -Math.PI / 2, angle_set);
            if (position.x >= -2 && position.x <= 1.5) {
              // document.getElementById('menu-sphere').object3D.position.set(1.5, -7, 0);
              // document.getElementById('lolgo').object3D.position.set(menuActivate_z, -menuActivate_y, 0);
              // document.getElementById('lolgo').object3D.rotation.order = 'ZYX'
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), -Math.PI / 2, 0);
            }
          } else if (rotationMod <= 5 * Math.PI / 4 && rotationMod > 3 * Math.PI / 4) {
            // console.log('in the back');
            document.getElementById('controls').object3D.position.set(0, -x_set, z_set);
            document.getElementById('controls').object3D.rotation.order = 'XYZ';
            document.getElementById('controls').object3D.rotation.set(-angle_set, Math.PI, 0);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'XYZ';
            document.getElementById('play-ring').object3D.rotation.set(-angle_set, Math.PI, 0);
            if (position.z >= -2 && position.z <= 1.5) {
              // document.getElementById('menu-sphere').object3D.position.set(0, -7, 1.5);
              // document.getElementById('lolgo').object3D.position.set(0, -menuActivate_y, menuActivate_z);
              // document.getElementById('lolgo').object3D.rotation.order = 'ZYX'
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), Math.PI, 0);
            }
          } else if (rotationMod <= 7 * Math.PI / 4 && rotationMod > 5 * Math.PI / 4) {
            // console.log('in the left');
            document.getElementById('controls').object3D.position.set(-z_set, -x_set, 0);
            document.getElementById('controls').object3D.rotation.order = 'ZYX';
            document.getElementById('controls').object3D.rotation.set(0, Math.PI / 2, -angle_set);
            // document.getElementById('play-ring').object3D.position.set(playPosition.x, playPosition.y, playPosition.z);
            document.getElementById('play-ring').object3D.rotation.order = 'ZYX';
            document.getElementById('play-ring').object3D.rotation.set(0, Math.PI / 2, -angle_set);
            if (position.x >= -1.5 && position.x <= 2) {
              // document.getElementById('menu-sphere').object3D.position.set(-1.5, -7, 0);
              // document.getElementById('lolgo').object3D.position.set(-menuActivate_z, -menuActivate_y, 0);
              // document.getElementById('lolgo').object3D.rotation.order = 'ZYX'
              // document.getElementById('lolgo').object3D.rotation.set(-Math.atan(menuActivate_y / menuActivate_z), Math.PI / 2, 0);
            }
          }
        }
        initialX = this.el.object3D.rotation.x;
        initialY = this.el.object3D.rotation.y;
      }
    }
  });
  AFRAME.registerComponent("controllerinput", {
    init: function () {
      this.el.addEventListener("trackpaddown", (event) => {
        // console.log("oculus clicked!!!!!");
        // console.log('event trackpaddown', event)
        // console.log('controller hand clicked', this.el.getAttribute('laser-controls').hand)
        // console.log('current cursor hand', document.getElementById('cursorToggle').getAttribute('laser-controls').hand)
        // console.log('is correct hand?', this.el.getAttribute('laser-controls').hand !== document.getElementById('cursorToggle').getAttribute('laser-controls').hand)
        if (this.el.getAttribute('laser-controls').hand !== document.getElementById('cursorToggle').getAttribute('laser-controls').hand) {
          // console.log('changing controls hand')
          let handUsed = this.el.getAttribute('laser-controls').hand
          // console.log('hand used', handUsed)
          setControllerHand(handUsed)
        } else {
          if (this.el.getAttribute("line").opacity === 1) {
            // console.log('before deactivate controls function')
            deactivateControls()
            deactivateRaycaster()
          } else {
            // console.log('before activate controls function')
            activateControls()
            activateRaycaster()
          }
        }
      });
      this.el.addEventListener("gripdown", (event) => {
        // console.log("oculus clicked!!!!!");
        // console.log('event gripdown', event)
        // console.log(
        //   'this.el.getAttribute("line")',
        //   this.el.getAttribute("line").opacity
        // );

        // console.log('controller hand clicked', this.el.getAttribute('laser-controls').hand)
        // console.log('current cursor hand', document.getElementById('cursorToggle').getAttribute('laser-controls').hand)
        // console.log('is correct hand?', this.el.getAttribute('laser-controls').hand !== document.getElementById('cursorToggle').getAttribute('laser-controls').hand)
        if (this.el.getAttribute('laser-controls').hand !== document.getElementById('cursorToggle').getAttribute('laser-controls').hand) {
          // console.log('changing controls hand')
          let handUsed = this.el.getAttribute('laser-controls').hand
          // console.log('hand used', handUsed)
          setControllerHand(handUsed)
        } else {
          if (this.el.getAttribute("line").opacity === 1) {
            // console.log('before deactivate controls function')
            deactivateControls()
            deactivateRaycaster()
          } else {
            // console.log('before activate controls function')
            activateControls()
            activateRaycaster()
          }
        }
      });
    }
  });

  AFRAME.registerComponent('only-show-cursor',{
  init:function(){
    let cursor = document.getElementById("cursorToggle");
    this.el.addEventListener('mouseenter', function () {
      console.log('mouse entered instructions panel',this.el)
      cursor.setAttribute('visible', 'true');
    })
    this.el.addEventListener('mouseleave', function () {
      console.log('mouse leave instructions panel',this.el)

      cursor.setAttribute('visible', 'false');
    })
    
  }
})

AFRAME.registerComponent('enable-cursor',{
  init:function(){
    let cursor = document.getElementById("cursorToggle");
    this.el.addEventListener('mouseenter', function () {
      console.log('mouse entered',this.el)
      cursor.setAttribute('visible', 'true');
    })
    this.el.addEventListener('mouseleave', function () {
      cursor.setAttribute('visible', 'false');
      document.getElementById('tl-ring').removeAttribute('tl-ring-animation');
      document.getElementById('tr-ring').removeAttribute('tr-ring-animation');
      document.getElementById('br-ring').removeAttribute('br-ring-animation');
      document.getElementById('bl-ring').removeAttribute('bl-ring-animation');
      document.getElementById('tl-ring').setAttribute('theta-length', '0.05');
      document.getElementById('tr-ring').setAttribute('theta-length', '0.05');
      document.getElementById('bl-ring').setAttribute('theta-length', '0.05');
      document.getElementById('br-ring').setAttribute('theta-length', '0.05');
      document.getElementById('tl-ring').setAttribute('color', 'black');
      document.getElementById('tr-ring').setAttribute('color', 'black');
      document.getElementById('bl-ring').setAttribute('color', 'black');
      document.getElementById('br-ring').setAttribute('color', 'black');
    })
    this.el.addEventListener('fusing', function () {
        console.log('fusing ',this.el)
      document.getElementById('tl-ring').setAttribute('tl-ring-animation', '');
    });
  }
})

