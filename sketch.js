let particles = [];
let pointCount = 50;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(41, 47, 54);
    for (let i = 0; i < pointCount; i++) {
        let p = new Particle();
        particles.push(p);
    }
}



function draw() {
    background(41, 47, 54);
    stroke(242, 147, 24);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
    }

    for (let i = 0; i < particles.length-1; i++) {
        let d = particles[i].position.dist(particles[i+1].position);
        stroke(255,255,255, map(d, 0, 100, 255, 0));
        line(particles[i].position.x, particles[i].position.y, particles[i+1].position.x, particles[i+1].position.y);
    }
}

function Particle() {
    this.position = createVector(random(0, window.innerWidth), random(0, window.innerHeight));
    this.velocity = createVector(random(-1,1), random(-1,1));
    this.velocity.normalize();
    this.velocity.mult(random());

    this.update = function(){
        this.position.add(this.velocity);
    };

    this.draw = function(){
        point(this.position.x, this.position.y);
    };
}