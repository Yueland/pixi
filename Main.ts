var cid = 0;
var ua = navigator.userAgent;
var isIOS = ua.indexOf("iPhone") > 0;

var scale = 1;
var h, hh;

var app;
var main = new PIXI.Container();

document.addEventListener('WeixinJSBridgeReady', function () {
}, false);

var _hmt = _hmt || [];

var isLocal = false;
if (location.host.indexOf("localhost") == 0 || location.host.indexOf("192.168.1.") == 0) {
	isLocal = true;
};

window.onload = () => {
	app = new PIXI.Application({ width: 640, height: 1236, backgroundColor: 0 });
	app.stage.addChild(main);
	app.view.id = "pixi";
	document.body.appendChild(app.view);
	scale = scaleToWindow(app.view);

	h = Math.floor(document.body.clientHeight / scale);
	hh = h / 2;

	document.documentElement.style.fontSize = document.body.clientWidth / 6.4 + 'px';

	R.loadRES(CONFIG.LOADING, () => {

		R.loadRES(CONFIG.RES, () => {
			_hmt.push(['_trackEvent', 'loading', 'complete']);
		});
		_hmt.push(['_trackEvent', 'loading', 'start']);
	});
};

function toChannel(id: number): void {
	console.log("toChannel: " + id);
	cid = id;

	let mc = <c.CB>new window["c"]["C" + id]();
	TWEEN.removeAll();
	main.removeChildren();
	if (!!mc) {
		mc.id = id;
		main.addChild(mc);
	}
};

_hmt.push(['_trackEvent', 'page', 'landing']);