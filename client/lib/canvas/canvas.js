const canvas = document.getElementById('canvas');
const radius = 1;
const numberOfCircles = 250;

canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const c = canvas.getContext('2d');

// User defined class
// to store element and its priority
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  // functions to be implemented
  // enqueue function to add element
  // to the queue as per priority
  enqueue(element, priority) {
    // creating object from queue element
    var qElement = new QElement(element, priority);
    var contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }
  getQueue() {
    return this.items;
  }
}

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx * 2;
    this.dy = dy * 2;
    this.radius = radius;
    this.color = color;
  }

  drawCircle() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
  }

  drawLineToNearestCircle(newQueue) {
    c.beginPath();
    const queue = newQueue.getQueue();
    for (let i = 1; i < 3; i++) {
      c.moveTo(this.x, this.y);
      const [c1, c2] = queue[i].element.getCoord();
      c.lineTo(c1, c2);
    }
    c.stroke();
  }

  update(arr = null) {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.drawCircle();

    if (arr !== null) {
      const pq = new PriorityQueue();
      for (let i = 0; i < numberOfCircles; i++) {
        let [coordX, coordY] = arr[i].getCoord();
        let distance = distanceToOrigin(coordX, coordY, this.x, this.y);
        pq.enqueue(arr[i], distance);
      }

      this.drawLineToNearestCircle(pq);
    }
  }

  getCoord() {
    return [this.x, this.y];
  }
}

function getRndColor() {
  var r = (255 * Math.random()) | 0,
    g = (255 * Math.random()) | 0,
    b = (255 * Math.random()) | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

const circleArray = [];
for (let i = 0; i < numberOfCircles; i++) {
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = Math.random() - 0.5;
  let dy = Math.random() - 0.5;

  let color = getRndColor();

  const circle = new Circle(x, y, dx, dy, radius, color);
  circleArray.push(circle);
}

function distanceToOrigin(x, y, ox, oy) {
  return Math.sqrt((x - ox) ** 2 + (y - oy) ** 2);
}

function animatation() {
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < numberOfCircles; i++) {
    circleArray[i].update(circleArray);
    c.stroke();
  }

  requestAnimationFrame(animatation);
}

animatation();
