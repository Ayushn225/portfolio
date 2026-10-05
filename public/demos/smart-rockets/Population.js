class Population{
    constructor(mutation, length){
        this.mutationRate = mutation;
        this.population = [];
        this.generation = 0;

        for(let i = 0; i<length; i++){
            this.population.push(new Rocket(width/2, 340, new DNA()));
        }
    }

    fitness(){
        let i = 0;
        for(let rocket of this.population){
            rocket.calculateFitness(target);
            if(rocket.position.x > width || rocket.position.x < 0 ||
               rocket.position.y > height || rocket.position.y < 0)
            {
                rocket.fitness = 0;
                console.log("rocket "+ i+ " posX: " + rocket.position.x + " posY: " + rocket.position.y);
                i++;
            }

        }
    }

    selection(){
        let totalFitness = 0;
        for(let rocket of this.population){
            totalFitness += rocket.fitness;
        }

        for(let rocket of this.population){
            rocket.fitness /= totalFitness;
        }
    }

    reproduction(){
        let newPopulation = [];
        for(let i = 0; i<this.population.length; i++){
            let parentA = this.weightedSelection();
            let parentB = this.weightedSelection();

            let child = parentA.crossover(parentB);

            child.mutate(this.mutationRate);

            newPopulation[i] = new Rocket(width/2, 340, child);
        }
        this.population = newPopulation;
        this.generation++;
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

    live(obstacles){
        for(let rocket of this.population){
            rocket.run(obstacles);
        }
    }

    targetReached() {
        for (let i = 0; i < this.population.length; i++) {
          if (this.population[i].hitTarget) return true;
        }
        return false;
    }
}