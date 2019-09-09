// document.querySelector('a-scene').emit('log', {message: 'hello', channel: 'bar'});
//     let scene = document.querySelector('a-scene');
//     let vid = document.getElementById('video');
//     vid.addEventListener('ended', () => {
//       scene.exitVR();
//       window.location.href = 'https://bself.life';
//     })
//     let button = document.querySelector('a-plane');
  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
/* if the device is not ios hide the download button */

if(isMobile.iOS()){
var root = document.documentElement;
root.className += ' mobileIOS';
var mobile = document.getElementById("mobile-button").style.visibility = "visible";

};
function toggleVideo() {
        var myVideo = document.getElementsByTagName('video')[0];
 // console.log()
        if (myVideo.pause)
            myVideo.play();
        else
            myVideo.pause();
      }
var circle = anime ({
  targets: ['.loader'],
  rotate: 180,
  duration: 1600,
  loop: true,
  elasticity: 600,
  easing: 'easeOutElastic',
  delay: function(el, index) {
    return index * 80;
  },
});
document.addEventListener('DOMContentLoaded', function() {
      console.log('hello');
      console.log('Yay! The readyState just increased to  ' + 
      'HAVE_CURRENT_DATA or greater for the first time.');

    var scene = document.querySelector('a-scene');
    var blur = document.getElementById("mobileDisplay");
    var activeMobile = document.getElementById("mobile-button");
    scene.addEventListener('loaded', function (e) {
        blur.style.transparent ='false';
        blur.style.opacity ='1';
        blur.style.transform ='rotate(0deg)';
        activeMobile.style.display ="flex";
        activeMobile.style.opacity ="1";

    });
});
document.getElementById('mobile-button').onclick = function() {document.getElementById('mobile-button').style.display = 'none';};
document.querySelector("a-plane").style.backgroundColor = "rgba(0,0,0,0)";
