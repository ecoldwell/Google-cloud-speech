const loadNewVideo = src => {
  let videoTag = document.getElementById("video");
  currentVideoSrc = src;
  hls = new Hls();
  hls.loadSource(src);
  // hls.loadSource('https://videouploadwork123222.s3.amazonaws.com/Tour_teaser_5k_MK_11072019.m3u8');
  hls.attachMedia(videoTag);
  hls.on(Hls.Events.MANIFEST_PARSED, function() {
    // console.log('Hls.Events.MANIFEST_PARSED');
    if (currentDeviceType === DEVICE_TYPES.IOS) {
      // console.log('playing ios video')
      video.play();
    }
  });
  if (typeof addHlsEventListeners !== "undefined") {
    addHlsEventListeners();
  }
};
