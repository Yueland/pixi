declare namespace TWEEN {
	export class Tween {
		constructor(tween: any);

		getId(): number;
		to(properties: any, duration: number): TWEEN.Tween;
		start(time?: number): TWEEN.Tween;
		stop(): TWEEN.Tween;
		end(): TWEEN.Tween;
		stopChainedTweens(): void;
		delay(amount: number): TWEEN.Tween;
		repeat(times: number): TWEEN.Tween;
		repeatDelay(amount: number): TWEEN.Tween;
		yoyo(yoyo: boolean): TWEEN.Tween;
		easing(easing: number): TWEEN.Tween;
		interpolation(interpolation): TWEEN.Tween;
		chain(): TWEEN.Tween;
		onStart(callback: Function): TWEEN.Tween;
		onUpdate(callback: Function): TWEEN.Tween;
		onComplete(callback: Function): TWEEN.Tween;
		onStop(callback: Function): TWEEN.Tween;
		update(time): boolean;
	}

	export class Easing {
		static Linear: {
			None: number;
		}
		static Quadratic: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Cubic: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Quartic: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Quintic: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Sinusoidal: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Exponential: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Circular: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Elastic: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Back: {
			In: number;
			Out: number;
			InOut: number;
		}
		static Bounce: {
			In: number;
			Out: number;
			InOut: number;
		}
	}

	export class Interpolation {
		static Linear(v: number, k: number): number;
		static Bezier(v: number, k: number): number;
		static CatmullRom(v: number, k: number): number;
		static Utils: {
			Linear(p0: number, p1: number, t: number): number;
			Bernstein(n: number, i: number): number;
			Factorial(): Function;
			CatmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number;
		}
	}

	export function add(tween: TWEEN.Tween);
	export function getAll(): Array<TWEEN.Tween>;
	export function remove(tween: TWEEN.Tween);
	export function removeAll(): void;
	export function update(time?: number, preserve?: any): boolean;
	export function nextId(): number;
}
