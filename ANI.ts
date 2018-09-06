class ANI {
	public static spd = 250;
	public static fadeIn(item: any, callback?: Function): TWEEN.Tween {
		item.alpha = 0;
		item.visible = true;
		return new TWEEN.Tween(item).to({ alpha: 1 }, this.spd)
			.onComplete(function () {
				if (!!callback) {
					callback();
				}
			})
			.start();
	}
	public static fadeOut(item: any, callback?: Function): TWEEN.Tween {
		return new TWEEN.Tween(item).to({ alpha: 0 }, this.spd)
			.onComplete(function () {
				item.visible = false;
				if (!!callback) {
					callback();
				}
			})
			.start();
	}
	public static from(item: any, obj: any, spd?: number, delay?: number, callback?: Function): TWEEN.Tween {
		spd = spd || this.spd;
		delay = delay || 0;
		let tmp = {};
		for (let key in obj) {
			tmp[key] = item[key];
			item[key] = obj[key];
		}
		return new TWEEN.Tween(item)
			.delay(delay)
			.to(tmp, spd)
			.onComplete(function () {
				if (!!callback) {
					callback();
				}
			})
			.start();
	}
	public static loop(item: any, obj: any, spd?: number): TWEEN.Tween {
		return new TWEEN.Tween(item).to(obj, spd || this.spd)
			.repeat(Infinity)
			.yoyo(true)
			.start();
	}
}
class R {
	private static dict = {};
	private static item = [];

	public static get(name: string) {
		if (!!this.dict[name]) {
			return this.dict[name];
		}
		let len = this.item.length;
		let res = PIXI.loader.resources;
		for (let i = len - 1; i >= 0; i--) {
			let obj = this.item[i];
			let texture = res[obj].texture;
			if (!!texture) {
				if (name == obj) {
					let texture = res[name].texture;
					if (!this.dict[name]) {
						this.dict[name] = texture;
					}
					this.item.splice(i, 1);
					return texture;
				}
			} else {
				let textures = res[obj].textures;
				let texture = null;
				for (let key in textures) {
					if (!this.dict[key]) {
						this.dict[key] = textures[key];
					}
					if (name == key) {
						texture = textures[key];
					}
				}
				this.item.splice(i, 1);
				if (!!texture) {
					return texture;
				}
			}
		}
		return null;
	}

	public static getSpriteBase(name: string): vincent.display.SpriteBase {
		let mc = new vincent.display.SpriteBase(R.get(name));
		return mc;
	}

	public static getSprite(name: string): PIXI.Sprite {
		let mc = new PIXI.Sprite(R.get(name));
		return mc;
	}

	public static add(name: string, src: string): R {
		PIXI.loader.add(name, src);
		this.item.push(name);
		return this;
	}

	public static getRepeatANI(value: string, max: number): PIXI.extras.AnimatedSprite {
		let mat = [];
		for (let i = 1; i <= max; i++) {
			let item = R.get(value + i);
			mat.push(item);
		}
		for (let i = max - 1; i > 1; i--) {
			let item = R.get(value + i);
			mat.push(item);
		}

		return new PIXI.extras.AnimatedSprite(mat);
	}

	public static getANI(value: string, max: number): PIXI.extras.AnimatedSprite {
		let mat = [];
		for (let i = 1; i <= max; i++) {
			let item = R.get(value + i);
			mat.push(item);
		}

		return new PIXI.extras.AnimatedSprite(mat);
	}

	public static load(callback): R {
		PIXI.loader.load(callback);
		return this;
	}

	public static loadRES(arr: Array<any>, callback): void {
		let len = arr.length;
		for (let i = 0; i < len; i++) {
			R.add(arr[i].name, window["sourcePath"] + arr[i].file + "?v=" + CONFIG.VERSION);
		}
		R.load(callback);
	}
}

function getUrlArg(value: string): any {
	let obj = getUrlArgs();
	if (!!obj && !!obj[value]) {
		return obj[value];
	}
	return null;
}

function getUrlArgs(): any {
	let url = location.href;
	let reMatch;
	if (reMatch = url.match(/\?([^#]+)#?/)) {
		let querystring = reMatch[1];
		let args = querystring.split(/&|=/);
		let arg = {};
		for (let i = 0; i < args.length; i += 2) {
			arg[args[i]] = args[i + 1];
		}
		return arg;
	}
}

function randomArray(arr: Array<any>): Array<any> {
	let tmp = arr.slice();
	tmp.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
	return tmp;
}

function scaleToWindow(canvas: HTMLCanvasElement): number {
	let scaleX: number, scaleY: number, scale: number, center: string;

	scaleX = window.innerWidth / canvas.offsetWidth;
	scaleY = window.innerHeight / canvas.offsetHeight;

	scale = Math.max(scaleX, scaleY);
	canvas.style.transformOrigin = "0 0";
	canvas.style.transform = "scale(" + scale + ")";

	if (canvas.offsetWidth > canvas.offsetHeight) {
		if (canvas.offsetWidth * scale < window.innerWidth) {
			center = "horizontally";
		} else {
			center = "vertically";
		};
	} else {
		if (canvas.offsetHeight * scale < window.innerHeight) {
			center = "vertically";
		} else {
			center = "horizontally";
		};
	};

	let margin;
	if (center === "horizontally") {
		margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
		canvas.style.marginTop = 0 + "px";
		canvas.style.marginBottom = 0 + "px";
		canvas.style.marginLeft = margin + "px";
		canvas.style.marginRight = margin + "px";
	};

	if (center === "vertically") {
		margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
		canvas.style.marginTop = margin + "px";
		canvas.style.marginBottom = margin + "px";
		canvas.style.marginLeft = 0 + "px";
		canvas.style.marginRight = 0 + "px";
	};

	canvas.style.paddingLeft = 0 + "px";
	canvas.style.paddingRight = 0 + "px";
	canvas.style.paddingTop = 0 + "px";
	canvas.style.paddingBottom = 0 + "px";
	canvas.style.display = "block";

	return scale;
}

module vincent.display {
	export class SpriteBase extends PIXI.Sprite {

		public constructor(texture?: PIXI.Texture) {
			super(texture);
			this.once("added", this.onAddToStage);
			this.once("removed", this.removeHandler, this);
		}

		public setAnchor(x: number, y: number) {
			this.anchor.x = x / this.width;
			this.anchor.y = y / this.height;
		}

		public set anchorX(value: number) {
			this.anchor.x = value / this.width;
		}

		public set anchorY(value: number) {
			this.anchor.y = value / this.height;
		}

		public set scaleX(value: number) {
			this.scale.x = value;
		}

		public get scaleX(): number {
			return this.scale.x;
		}

		public get scaleY(): number {
			return this.scale.y;
		}

		public set scaleY(value: number) {
			this.scale.y = value;
		}

		private onAddToStage(e): void {
			this.init();
		}

		private removeHandler(e): void {
			this.onRemoved();
		}

		protected init(): void {
		}

		protected onRemoved() {
		}
	}
}

module c {
	export class CB extends vincent.display.SpriteBase {
		public id: number;

		public constructor() {
			super();
		}

		protected init(): void {
		}
	}
}
