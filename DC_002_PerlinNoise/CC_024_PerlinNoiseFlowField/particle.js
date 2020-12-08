class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.max_vel = 4;

        this.prev_pos = this.pos.copy();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.max_vel);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    addForce(force) {
        this.acc.add(force);
    }

    show() {
        stroke(255, 5);
        line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);
        this.updatePrevPos();
    }

    updatePrevPos() {
        this.prev_pos = this.pos.copy();
    }

    edge() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrevPos();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrevPos();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrevPos();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrevPos();
        }
    }

    follow(flowflied) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x * rows + y;

        let force = flowflied[index];
        this.addForce(force);
    }
}