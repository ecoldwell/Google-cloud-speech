var conf = {
    key: 'c84f9202-e735-4c49-a1d4-409dce2de1d8',
    
    source: {
      dash: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd',
     // hls: 'https://bitmovin.com/player-content/playhouse-vr/m3u8s/105560.m3u8',
     // progressive: 'https://bitmovin.com/player-content/playhouse-vr/progressive.mp4',
     // poster: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/poster.jpg',
      vr: {
        startupMode: '2d',
        startPosition: 180
      }
    },
    style: {
      aspectratio: '2:1'
    },
    playback: {
      muted: true
    }
  };
  
  var playerContainer = document.getElementById('player-container');
  var  player = new bitmovin.player.Player(playerContainer, conf);
  
  player.load(conf.source);
  