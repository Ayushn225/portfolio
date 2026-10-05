class Rocket{
    constructor(x, y, dna){
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();

        this.r = 10;

        this.dna = dna;
        this.fitness = 0;
        this.geneCounter = 0;
        this.finishCounter = 0;

        this.hitBox = false;
        this.hitTarget = false;

        this.recordDistance = Infinity;

        this.fuelCost = 250;
    }

    run(obstacles){
        if(!this.hitBox && this.fuelCost){
            this.applyforce(this.dna.genes[this.geneCounter]);
            this.update();
            this.checkObstacles(obstacles);
            this.geneCounter++;
            if(this.geneCounter == lifeSpan) this.geneCounter = 0;
            this.fuelCost--;
        }
        this.show();
    }

    crossover(partner){
        let childDNA = new DNA();
        for(let i = 0; i<this.dna.genes.length; i++){
            if(random(1)<0.5){
                childDNA.genes[i] = partner.dna.genes[i];
            }else{
                childDNA.genes[i] = this.dna.genes[i];
            }
        }

        return childDNA;
    }

    applyforce(force){
        this.acceleration.add(force);
    }

    calculateFitness(target){
        let distance = p5.Vector.dist(this.position, target.position);
        if(distance>0) this.fitness = 1/(distance*distance);
        this.fitness = pow(this.fitness, 4);
        if (this.hitObstacle) {
            this.fitness *= 0.1;
        }
        if(this.hitTarget){
            this.fitness *=2;
        }
    }

    update(){
        
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show(){
        fill(255);
        noStroke();
        let angle = this.velocity.heading();
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        beginShape();
        vertex(this.r, 0);
        vertex(-this.r, this.r);
        vertex(-this.r/2, 0);
        vertex(-this.r, -this.r);
        endShape(CLOSE);
        pop();
    }

    checkObstacles(obstacles){

        for(let obstacle of obstacles){
            if(obstacle.contains(this)){
                this.hitBox = true;
                console.log("hit obstacle");
            }
        }
    }

    checkTarget(target){
        let distance = p5.Vector.dist(this.position, target.position);
        if(distance < this.recordDistance){
            this.recordDistance = distance;
        }

        if(target.contains(this)){
            this.hitTarget = true;
        }

        if (!this.hitTarget) {      
            this.finishCounter++;
        }
    }
}