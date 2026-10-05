class DNA{
    constructor(){
        this.genes = [];
        this.maxForce = 0.1;
        for(let i = 0; i<lifeSpan; i++){
            let turn = int(random(1, 5));
            switch(turn){
                case 1:
                    this.genes[i] = createVector(0, -1); // Up
                    break;
                case 2:
                    this.genes[i] = createVector(1, 0); // Right
                    break;
                case 3:
                    this.genes[i] = createVector(0, 1); // Down
                    break;
                case 4:
                    this.genes[i] = createVector(-1, 0); // Left
                    break;
            }
            this.genes[i].mult(random(0, this.maxForce));
        }
    }

    mutate(mutationRate){
        for(let i = 0; i<this.genes.length; i++){
            if(random(1)<mutationRate){
                this.genes[i] = p5.Vector.random2D();
                let turn = int(random(1, 5));
                switch(turn){
                    case 1:
                        this.genes[i] = createVector(0, -1); // Up
                        break;
                    case 2:
                        this.genes[i] = createVector(1, 0); // Right
                        break;
                    case 3:
                        this.genes[i] = createVector(0, 1); // Down
                        break;
                    case 4:
                        this.genes[i] = createVector(-1, 0); // Left
                        break;
                }
                this.genes[i].mult(random(0, this.maxForce));
            }
        }
    }
}