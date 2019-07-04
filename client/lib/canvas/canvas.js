const canvas = document.getElementById("canvas");
const radius = 1;
const numberOfCircles = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// User defined class 
// to store element and its priority 
class QElement { 
    constructor(element, priority) 
    { 
        this.element = element; 
        this.priority = priority; 
    } 
} 
  
// PriorityQueue class 
class PriorityQueue { 
  
    // An array is used to implement priority 
    constructor() 
    { 
        this.items = []; 
    } 
  
    // functions to be implemented 
    // enqueue function to add element 
    // to the queue as per priority 
    enqueue(element, priority) 
    { 
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
    // dequeue method to remove 
    // element from the queue 
    dequeue() 
    { 
        // return the dequeued element 
        // and remove it. 
        // if the queue is empty 
        // returns Underflow 
        if (this.isEmpty()) 
            return "Underflow"; 
        return this.items.shift(); 
    }  
    // front function 
    front() 
    { 
        // returns the highest priority element 
        // in the Priority queue without removing it. 
        if (this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[0]; 
    }
    // isEmpty function 
    isEmpty() 
    { 
        // return true if the queue is empty. 
        return this.items.length == 0; 
    }
    getQueue() {
        return this.items;
    }
}

class Circle {
    constructor (x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx * 2;
	    this.dy = dy * 2;
        this.radius = radius;
    }

    drawCircle() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.stroke();
    }

    drawLineToNearestCircle(arr) {
        c.beginPath();
        for (let i = 0; i < arr.length; i++) {
            c.moveTo(this.x, this.y);
            const [c1, c2] = arr[i].element.getCoord();
            c.lineTo(c1, c2);
        }
        c.stroke();
    }


    update() {
        if ((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0) {
			this.dx = -this.dx;
		}

		if ((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0) {
			this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.drawCircle();
        // this.drawLineToNearestCircle(arr)
    }

    getCoord() {
        return [this.x, this.y];
    }
}

const pq = new PriorityQueue();
const circleArray = [];
for (let i = 0; i < numberOfCircles; i++) {
	let x	= Math.random() * (innerWidth - radius * 2) + radius;
	let y 	= Math.random() * (innerHeight - radius * 2) + radius;
	let dx 	= (Math.random() - 0.5);	
	let dy 	= (Math.random() - 0.5);
    
    let distance = distanceToOrigin(x, y)
    const circle = new Circle(x, y, dx, dy, radius);
    pq.enqueue(circle, distance);
	circleArray.push(circle);
}

function distanceToOrigin(x, y) {
    return Math.sqrt((x)**2 + (y)**2)
}

function closest(points, k, ox, oy) {
    const pq = new PriorityQueue();
    for (let i = 0; i < points.length; i++) {
        const [cx, cy] = points[i].getCoord();
        let distance = distanceToOrigin(ox, oy, cx, cy)
        console.log(distance)
        pq.enqueue(points[i], distance);
    }
    return pq.getKClosest(k);    
}

function animatation() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    const circleQueue = pq.getQueue();
    
    for (let i = 0; i < circleArray.length; i++) {
        if (i % 3 == 0) {
            console.log(circleQueue[i])
            console.log(circleQueue[i+1])
            console.log(circleQueue[i+2])
            const [coordX, coordY] = circleQueue[i].element.getCoord();
            const [coordX1, coordY1] = circleQueue[i+1].element.getCoord();
            const [coordX2, coordY2] = circleQueue[i+2].element.getCoord();

            c.beginPath();
            c.moveTo(coordX, coordY);
            c.lineTo(coordX1, coordY1);
            c.moveTo(coordX, coordY);
            c.lineTo(coordX2, coordY2);
        }

        circleArray[i].update();
        c.stroke();
    }

    requestAnimationFrame(animatation)
}

animatation();