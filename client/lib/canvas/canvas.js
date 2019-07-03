const canvas = document.getElementById("canvas");
const radius = 1;
const numberOfCircles = 1000;

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
    getKClosest(n) {
        return this.items.slice(0, n)
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
            console.log(arr[i].element)
            const [c1, c2] = arr[i].element.getCoord();
            c.lineTo(c1, c2);
        }
        c.stroke();
    }


    update(arr) {
        if ((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0) {
			this.dx = -this.dx;
		}

		if ((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0) {
			this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.drawCircle();
        this.drawLineToNearestCircle(arr)
    }

    getCoord() {
        return [this.x, this.y];
    }
}

const circleArray = [];
for (let i = 0; i < numberOfCircles; i++) {
	let x	= Math.random() * (innerWidth - radius * 2) + radius;
	let y 	= Math.random() * (innerHeight - radius * 2) + radius;
	let dx 	= (Math.random() - 0.5);	
	let dy 	= (Math.random() - 0.5);
	
	circleArray.push(new Circle(x, y, dx, dy, radius));
}

// let points = [[-2,-4], [0,-2], [-1, 0], [3,-5], [-2,-3], [3,2]]
// let points = [[3,3],[5,-1],[-2,4]]

function distanceToOrigin(cx, cy, x, y) {
    return Math.sqrt((x - cx)**2 + (y - cy)**2)
}

function closest(points, k, ox, oy) {
    // returns point [x, y, distance to origin]
    // for (let i of points) {
    //     let distance = distanceToOrigin(cx, cy, i[0], i[1]);
    //     i.push(distance);
    // }

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

    for (let i = 0; i < circleArray.length; i++) {
        const [ox, oy] = circleArray[i].getCoord();
        const closestCircle = closest(circleArray, 3, ox, oy);
        console.log(closestCircle)
        circleArray[i].update(closestCircle);
        c.stroke();
    }

    requestAnimationFrame(animatation)
}

animatation();