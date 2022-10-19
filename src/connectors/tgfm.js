'use strict';

Connector.playerSelector = 'div.radio-player-widget';
Connector.artistSelector = 'h5.now-playing-artist';
Connector.trackSelector = 'h4.now-playing-title';
Connector.isPlaying = () =>
	Util.getAttrFromSelectors("a.radio-control-play-button", "Title") === "Stop";
