let population;
let mutationRate = 0.01;
let length = 6;

let button;


function setup() {
  createCanvas(1000, 400);
  button = createButton('Next Generation');
  button.position(10, 50);
  button.mousePressed(nextGeneration)
  population = new Population(mutationRate, length);
}

function draw() {
  background(71, 140, 252);
  noStroke();
  fill(12, 110, 38);
  rect(0, height-20, width, 20);

  population.display();

  textSize(24);
  text("Generation: "+ population.generation, 10, 30);
}

function nextGeneration(){
  population.calculateFitness();
  population.selection();
  population.reproduction();
}
