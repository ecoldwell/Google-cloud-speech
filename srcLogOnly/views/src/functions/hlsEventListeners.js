const addHlsEventListeners=()=>{
    hls.on(Hls.Events.LEVEL_SWITCHING, function (evt1,evt2,evt3){
        console.log("Hls.Events.LEVEL_SWITCHING");
        console.log('evt1', evt1)
        console.log('evt2', evt2)
        console.log('evt3', evt3)
      });
      hls.on(Hls.Events.ERROR, function (evt,evt2){
        console.log("Hls.Events.ERROR");
        console.log(evt);
        console.log('evt2', evt2)
      });
      hls.on(Hls.Events.MANIFEST_PARSED,function(evt){
          console.log('manifest parsed')
          console.log('evt', evt)
      })
      hls.on(Hls.Events.LEVEL_LOADING, function (){
        console.log("Hls.Events.LEVEL_LOADING");
      });
      hls.on(Hls.Events.BUFFER_CREATED, function(){
        console.log("Hls.Events.BUFFER_CREATED")
      });
      hls.on(Hls.Events.BUFFER_RESET, function(){
        console.log("Hls.Events.BUFFER_RESET")
      });
      hls.on(Hls.Events.BUFFER_CODECS, function(){
        console.log("Hls.Events.BUFFER_CODECS")
      });
      hls.on(Hls.Events.BUFFER_CREATED, function(){
        console.log("Hls.Events.BUFFER_CREATED")
      });
      hls.on(Hls.Events.BUFFER_APPENDED, function(){
        console.log("Hls.Events.BUFFER_APPENDED")
      });
      hls.on(Hls.Events.BUFFER_EOS, function(){
        console.log("Hls.Events.BUFFER_EOS")
      });
      hls.on(Hls.Events.BUFFER_FLUSHING, function(){
        console.log("Hls.Events.BUFFER_FLUSHING")
      });
      hls.on(Hls.Events.BUFFER_FLUSHED, function(){
        console.log("Hls.Events.BUFFER_FLUSHED")
      });
      hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, function(){
        console.log("Hls.AUDIO_TRACK_SWITCHED")
      });
      hls.on(Hls.Events.AUDIO_TRACK_SWITCHING, function(){
        console.log("Hls.AUDIO_TRACK_SWITCHING")
      });
      hls.on(Hls.Events.AUDIO_TRACK_LOADING, function(){
        console.log("Hls.AUDIO_TRACK_LOADING")
      });
      hls.on(Hls.Events.AUDIO_TRACK_LOADED, function(){
        console.log("Hls.AUDIO_TRACK_LOADED")
      });
      hls.on(Hls.Events.FPS_DROP_LEVEL_CAPPING, function(evt){
        console.log("FPS_DROP_LEVEL_CAPPING")
        console.log(evt);
      });

      hls.on(Hls.Events.MEDIA_ATTACHING,function(evt,evt2){
          console.log('evt', evt)
          console.log('evt2', evt2)
      })
      hls.on(Hls.Events.MEDIA_ATTACHED,function(evt,evt2){
        console.log('evt', evt)
        console.log('evt2', evt2)
    })
    hls.on(Hls.Events.MEDIA_DETACHING,function(evt,evt2){
        console.log('evt', evt)
        console.log('evt2', evt2)
    })
    hls.on(Hls.Events.MEDIA_DETACHED,function(evt,evt2){
        console.log('evt', evt)
        console.log('evt2', evt2)
    })
}