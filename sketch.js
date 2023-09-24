class GraphPlotter {
	constructor() {
		this.xList = [];
		this.zoom = 15;
		this.initXList();
	}

	initXList() {
		for (let x = -40; x <= 40; x++) {
			this.xList.push(x);
		}
	}

	f(x) {
		return 4 * cos(x / 4);
	}

	setupCanvas() {
		createCanvas(windowWidth, windowHeight);
		translate(width / 2, height / 2);
		scale(this.zoom, -this.zoom);
		setTimeout(() => {
			this.drawAxis();
			strokeWeight(2 / this.zoom);
			for (let x of this.xList) {
				point(x, 0);
			}
		}, 0);
	}

	drawAxis() {
		background(0);
		stroke(255);
		strokeWeight(0.2 / this.zoom);
		line(-width, 0, width, 0);
		line(0, -height, 0, height);
		for (let x = -width; x <= width; x++) {
			if (x !== 0) {
				line(x, -0.1, x, 0.1);
			}
		}
		for (let y = -height; y <= height; y++) {
			if (y !== 0) {
				line(-0.1, y, 0.1, y);
			}
		}
	}

	avg(values) {
		if (values.length === 0) return 0;
		const sum = values.reduce((acc, value) => acc + value, 0);
		return sum / values.length;
	}

	plotPoints(xValues, mappingFunction) {
		const yValues = [];
		for (let x of xValues) {
			let y = mappingFunction(x);
			yValues.push(y);
			point(x, y);
		}
		p.html(`Avg Y: ${this.avg(yValues).toFixed(2)}`);
	}

	plotGraph() {
		this.setupCanvas();

		var newXList = this.xList;

		for (let i = 0; i < 1000; i++) {
			setTimeout(() => {
				this.drawAxis();
				strokeWeight(2 / this.zoom);
				this.plotPoints(newXList, x => this.f(x));
				newXList = newXList.map(x => this.f(x));
			}, 1000 + i * 1000);
		}
	}
}

let graph, p;

function setup() {
	graph = new GraphPlotter();
	graph.plotGraph();
	p = createP('Avg Y:');
	p.position(10, 10);
	p.style("color", "white");
}
