function onStart() {
    $(document).ready(function() {
        $('#fullpage').fullpage({
            //options here
            anchors: ['home', 'about', 'music', 'video', 'tour', 'contact'],
            sectionsColor: ['#f0672f', '#9DC9E0', '#E84237', '#6C5964', '#C96F9D', '#1BBC9B'],
            css3: true,
            menu: '#menu',
            autoScrolling:true,
            scrollHorizontally: true,
            navigation: true,
            slidesNavigation: true,
            onLeave: function( origin, destination, direction ) {
            	if ( destination.index == 0 ) {
            		$('#player').fadeIn();
            		$('#play-button').fadeOut(500);
            	} else {
            		$('#player').fadeOut();
            		if ( $( '#jplayer' ).data().jPlayer.status.paused == false ) $('#play-button').fadeIn(750);
            	}
            }
        });
        initPlayer();
        //methods
        $.fn.fullpage.setAllowScrolling(true);
    });
}

var player;
var tracks = [ '473053026', '455480868', '451228755', '635502306' ];
var trackPlaying;

function initPlayer() {
	$('#player').tinycircleslider({ interval: false, dotsSnap: true, dotsHide: true });
	player = $('#player').data("plugin_tinycircleslider");
	$("#player .button, #play-button").on( "click", playerButtonPressed );
	window.addEventListener('touchstart', function onFirstTouch() {
		$("#player .button #play-button").on( "touchstart", playerButtonPressed );
		window.removeEventListener('touchstart', onFirstTouch, false );
	}, false);
	$("#player").on( "slideChanged", function() {
		if ( $( '#jplayer' ).data().jPlayer.status.paused == false ) playTrack();
	});
	$( '#jplayer' ).jPlayer({
		play: function() { jPlayerPlayEventHandler() },
		pause: function() { jPlayerPauseEventHandler() },
		ended: function() { jPlayerEndedEventHandler() },
		swfPath: 'swf',
		supplied: 'mp3',
		wmode: 'window',
		solution: 'html, flash'
	});
}

function jPlayerPlayEventHandler() {
	$("#player .button").css('background-position','-100px -50px');
	$("#play-button i").removeClass("fa-play").addClass("fa-pause");
	
}

function jPlayerPauseEventHandler() {
	$("#player .button").css('background-position','0 -50px');
	$("#play-button i").removeClass("fa-pause").addClass("fa-play");
}

function jPlayerEndedEventHandler() {
}

function playerButtonPressed() {
	( $( '#jplayer' ).data().jPlayer.status.paused ) ? playTrack() : stopTrack();
}

function playTrack() {
	var trackId = tracks[ player.slideCurrent ];
	if ( trackPlaying == undefined || trackId !== trackPlaying ) $( '#jplayer' ).jPlayer( 'setMedia', { 'mp3': 'https://api.soundcloud.com/tracks/' + trackId + '/stream' + '?client_id=c4fd5fec1802b582fc806f6df899b7b3' });
	trackPlaying = trackId;	
	$( '#jplayer' ).jPlayer( 'play' );
}

function stopTrack() {
	$( '#jplayer' ).jPlayer( 'pause' );
}