class GraphPlotter {
	constructor() {
		this.xList = [];
		this.zoom = 20;
		this.initXList();
	}

	initXList() {
		for (let x = -40; x <= 40; x++) {
			this.xList.push(x);
		}
	}

	f(x) {
		return 4 * Math.cos(x / 4);
	}

	setupCanvas() {
		createCanvas(windowWidth, windowHeight);
		translate(width / 2, height / 2);
		scale(this.zoom, -this.zoom);
	}

	drawAxis() {
		background(0);
		stroke(255);
		strokeWeight(0.2 / this.zoom);
		line(-width, 0, width, 0);
		line(0, -height, 0, height);
	}

	plotPoints(mappingFunction) {
		for (let x of this.xList) {
			point(x, mappingFunction(x));
		}
	}

	plotGraph() {
		this.setupCanvas();

		setTimeout(() => {
			this.drawAxis();
			strokeWeight(2 / this.zoom);
			this.plotPoints(x => 0);
		}, 0);

		setTimeout(() => {
			this.drawAxis();
			strokeWeight(2 / this.zoom);
			this.plotPoints(this.f);
		}, 2000);

		setTimeout(() => {
			this.drawAxis();
			strokeWeight(2 / this.zoom);
			for (let x of this.xList) {
				let u = this.f(x);
				point(u, this.f(u));
			}
		}, 4000);

		setTimeout(() => {
			this.drawAxis();
			strokeWeight(2 / this.zoom);
			for (let x of this.xList) {
				let u = this.f(this.f(x));
				point(u, this.f(u));
			}
		}, 6000);
	}
}

function setup() {
	const graph = new GraphPlotter();
	graph.plotGraph();
}
