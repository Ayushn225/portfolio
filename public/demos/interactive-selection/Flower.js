class Flower{
    constructor(x, y, dna){
        this.position = createVector(x, y);
        this.dna = dna;
        this.fitness = 0;
        this.counter = 0;
    }

    calculateFitness(){
        this.fitness = this.counter + 5;
    }


    crossOver(partner){
        let childDNA = new DNA();
        for(let i = 0; i<14; i++){
            if(random(1)<0.5){
                childDNA.genes[i] = this.dna.genes[i];
            }else{
                childDNA.genes[i] = partner.dna.genes[i];
            }
        }

        return childDNA;
    }

    show(){
        let genes = this.dna.genes;
        let boxHeight = 200;
        let boxWidth = 100;
        let stemWidth = 10;

        let petalColor  = color(genes[0]*255, genes[1]*255, genes[2]*255, genes[3]*255);
        let petalSize   = map(genes[4], 0, 1, 4, 24); 
        let petalCount  = floor(map(genes[5], 0, 1, 2, 16)); 
        let centerColor = color(genes[6]*255, genes[7]*255, genes[8]*255); 
        let centerSize  = map(genes[9], 0, 1, 24, 48);
        let stemColor   = color(genes[10]*255, genes[11]*255, genes[12]*255); 
        let stemLength  = map(genes[13], 0, 1, 50, 100); 

        if(mouseX>this.position.x && ((this.position.x+boxWidth)>mouseX) && 
        mouseY<this.position.y && ((this.position.y-boxHeight)<mouseY)){
            this.counter++;
        }

        fill(255);
        stroke(0);
        strokeWeight(2);
        rect(this.position.x, this.position.y - boxHeight, boxWidth, boxHeight);

        noStroke();
        let center = this.position.x + boxWidth/2;
        fill(stemColor);
        rect(center - stemWidth/2, this.position.y - stemLength, stemWidth, stemLength);
        
        let stemCenter = this.position.y - stemLength - centerSize/2;


        fill(petalColor);
        let deltaAngle = TWO_PI/petalCount;
        for(let i = 0; i<petalCount; i++){
            push();
            translate(center, stemCenter);
            rotate(i*deltaAngle);
            ellipse(centerSize/2, 0, petalSize, petalSize);
            pop();
        }

        fill(centerColor);
        ellipse(center, stemCenter, centerSize, centerSize);

        fill(255);
        textSize(24);
        text(this.counter, center, this.position.y - boxHeight - 20);
    }
}