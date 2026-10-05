class DNA{
    constructor(){
        this.genes = [];
        for(let i = 0; i<14; i++){
            this.genes[i] = random(0, 1);
        }
    }

    mutate(mutationRate){
        for(let i = 0; i<14; i++){
            if(random(1)<mutationRate){
                this.genes[i] = random(0, 1);
            }
        }
    }
}