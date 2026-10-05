class Population{
    constructor(mutationRate, length){
        this.length = length;
        this.mutationRate = mutationRate;

        this.population = [];
        this.generation = 0;

        for(let i = 0; i<this.length; i++){
            this.population[i] = new Flower(i*120 + 40, height-20, new DNA)
        }
    }

    calculateFitness(){
        for(let i = 0; i<this.length; i++){
            this.population[i].calculateFitness();
        }
    }

    selection(){
        let totalFitness = 0;
        for(let i = 0; i<this.length; i++){
            totalFitness += this.population[i].fitness;
        }

        for(let i = 0; i<this.length; i++){
            this.population[i].fitness = this.population[i].fitness/totalFitness;
        }
    }

    reproduction(){
        let newPopulation = [];
        for(let i = 0; i<this.length; i++){
            let parentA = this.weightedSelection();
            let parentB = this.weightedSelection();

            let child = parentA.crossOver(parentB);

            child.mutate(this.mutationRate);

            newPopulation[i] = new Flower(i*120 + 40, height-20, child);
        }
        this.generation ++;
        this.population = newPopulation;
    }

    weightedSelection(){
        let start = random(1);
        let index = 0;
        while(start>0){
            start = start - this.population[index].fitness;
            index++;
        }
        index--;
        return this.population[index];
    }

    display(){
        for(let i = 0; i<this.length; i++){
            this.population[i].show();
        }
    }
}