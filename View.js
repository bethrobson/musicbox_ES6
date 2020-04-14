import { Audio } from "./Audio.js";

export class View {
	constructor(canvas) {
		this.canvas = canvas;
		this.clicks = [];
		this.frameRate = 1000 / 30;
		this.loopRate = 4000;
		this.maxRadius = 80;
	}

	handleClick(event) {
		const view = this;
		let x = event.offsetX;
		let y = event.offsetY;
		let pos = view.clicks.push({x: x, y: y, radius: 0});
		Audio.play(x%10);
		setInterval(() => {
			view.clicks[pos-1].radius = 0; 
			Audio.play(x%10); 
		}, view.loopRate);
	}

	updateDisplay() {
		const view = this;
		const context = view.canvas.getContext("2d");
		context.clearRect(0, 0, view.canvas.width, view.canvas.height);
		context.fillStyle = 'black';
		context.fillRect(0, 0, view.canvas.width, view.canvas.height);

		for (let i = 0; i < view.clicks.length; i++) {
			let circle = view.clicks[i];
			if (circle.radius > view.maxRadius) continue;
			circle.radius += 1;

			let alpha = .7;
			if (circle.radius > (view.maxRadius - 15)) {
				alpha = (view.maxRadius - circle.radius) / 10;
			}
			view.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
		}
	}

	drawCircle(context, x, y, radius, alpha) {
		context.beginPath();
		context.arc(x, y, radius, 0, 2*Math.PI);
		context.fillStyle = "rgba(" + x%256 + ", " + y%256  + ", " + (x * y % 256)+ " ," + alpha + ")";
		context.fill();
	}

}




