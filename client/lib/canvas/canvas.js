const canvas = document.getElementById("canvas");
const radius = 5;
const numberOfCircles = 10;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// class Circle {
//     constructor (x, y, dx, dy, radius) {
//         this.x = x;
//         this.y = y;
//         this.dx = dx;
// 	    this.dy = dy;
//         this.radius = radius;
//     }

//     drawCircle() {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
//         c.stroke();
//     }

//     update() {
//         if ((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0) {
// 			this.dx = -this.dx;
// 		}

// 		if ((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0) {
// 			this.dy = -this.dy;
//         }
        
//         this.x += this.dx;
//         this.y += this.dy;
        
//         this.drawCircle();
//     }
// }

// const circleArray = [];
// for (let i = 0; i < numberOfCircles; i++) {
// 	let x	= Math.random() * (innerWidth - radius * 2) + radius;
// 	let y 	= Math.random() * (innerHeight - radius * 2) + radius;
// 	let dx 	= (Math.random() - 0.5);	
// 	let dy 	= (Math.random() - 0.5);
	
// 	circleArray.push(new Circle(x, y, dx, dy, radius));
// }

// function animatation() {
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     for (let i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//         c.stroke();
//     }

//     requestAnimationFrame(animatation)
// }

// animatation();

class Node {
    constructor(val, priority) {
        this.value = val;
        this.priority = priority;
        this.next = null;
    }
}

class PriorityQueue {
    constructor() {
        this.heap = [null]
    }

    insert(value, priority) {
        const newNode = new Node(value, priority);
        this.heap.push(newNode);
        let currentNodeIdx = this.heap.length - 1;
        let currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
        while (
            this.heap[currentNodeParentIdx] &&
            newNode.priority > this.heap[currentNodeParentIdx].priority
        ) {
            const parent = this.heap[currentNodeParentIdx];
            this.heap[currentNodeParentIdx] = newNode;
            this.heap[currentNodeIdx] = parent;
            currentNodeIdx = currentNodeParentIdx;
            currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
        }
    }

    remove() {
        if (this.heap.length < 3) {
          const toReturn = this.heap.pop();
          this.heap[0] = null;
          return toReturn;
        }
        const toRemove = this.heap[1];
        this.heap[1] = this.heap.pop();
        let currentIdx = 1;
        let [left, right] = [2*currentIdx, 2*currentIdx + 1];
        let currentChildIdx = this.heap[right] && this.heap[right].priority >= this.heap[left].priority ? right : left;
        while (this.heap[currentChildIdx] && this.heap[currentIdx].priority <= this.heap[currentChildIdx].priority) {
          let currentNode = this.heap[currentIdx]
          let currentChildNode = this.heap[currentChildIdx];
          this.heap[currentChildIdx] = currentNode;
          this.heap[currentIdx] = currentChildNode;
        }
        return toRemove;
      }

    front() {
        if (this.isEmpty()) {
            return "No element in Queue"
        }
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }


    getKClosest(n) {
        return this.heap.slice(0, n);
    }
}

// let points = [[-2,-4], [0,-2], [-1, 0], [3,-5], [-2,-3], [3,2]]
let points = [[3,3],[5,-1],[-2,4]]

function distanceToOrigin(x, y) {
    return Math.sqrt((x)**2 + (y)**2)
}

function closest(points, k) {
    // returns point [x, y, distance to origin]
    for (let i of points) {
        let distance = distanceToOrigin(i[0], i[1]);
        i.push(distance);
    }

    const pq = new PriorityQueue();
    for (let i = 0; i < points.length; i++) {
        pq.insert(points[i], points[i][2]);
    }
    return pq.getKClosest(k);    
}

console.log(closest(points, 2))