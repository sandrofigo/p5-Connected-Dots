let particles = [];
const particleCount = 150;
const maxDistance = 50;
const maxConnections = 3;
const minSpeed = 0.05;
const maxSpeed = 0.15;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(41, 47, 54);
    for (let i = 0; i < particleCount; i++) {
        let p = new Particle();
        particles.push(p);
    }
}



function draw() {
    background(41, 47, 54);
    //orange
    //const particleColor = color(242, 147, 24);
    const particleColor = color(127);
    const lineColor = color(255, 255, 255);
    

    for (let i = 0; i < particles.length; i++) {
        noStroke();
        fill(particleColor);
        particles[i].draw();
        particles[i].update();
    }

    for (let i = 0; i < particles.length - 1; i++) {

        let current = particles[i];
        let affected = [];

        for (let j = 0; j < particles.length; j++) {
            if (particles[j] != current) {
                let distance = current.position.dist(particles[j].position);
                if (distance <= maxDistance && affected.length <= maxConnections) {
                    affected.push({
                        'particle': particles[j],
                        'distance': distance
                    });
                }
            }
        }

        for (let a = 0; a < affected.length; a++) {
            stroke(red(lineColor), green(lineColor), blue(lineColor), map(affected[a].distance, 0, maxDistance, 255, 0));
            //smooth();
            line(current.position.x, current.position.y, affected[a].particle.position.x, affected[a].particle.position.y);
        }

        
    }
}

function Particle() {
    this.position = createVector(random(0, window.innerWidth), random(0, window.innerHeight));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.velocity.normalize();
    this.velocity.mult(random(minSpeed, maxSpeed));

    this.update = function () {
        this.position.add(this.velocity);
        if (this.position.x < 0) this.position.x = window.innerWidth;
        if (this.position.y < 0) this.position.y = window.innerHeight;
        if (this.position.x > window.innerWidth) this.position.x = 0;
        if (this.position.y > window.innerHeight) this.position.y = 0;
    };

    this.draw = function () {
        //point(this.position.x, this.position.y);
        
        ellipse(this.position.x, this.position.y, 2, 2);
    };
}