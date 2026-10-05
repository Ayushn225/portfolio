
let target;
let obstacles = [];
let recordTime;

let size = 50;
const mutationRate = 0.01;
let lifeSpan = 250;
let lifeCounter = 0;
let population;

function setup() {
  createCanvas(640, 600);
  target = new Obstacle(width/2-50, 150, 20, 20, target = true);
  population = new Population(mutationRate, size);
  obstacles = [];

  recordTime = lifeSpan;

  obstacles.push(new Obstacle(width/2-40, height/2-100, 80, 20));
  obstacles.push(new Obstacle(width/2+40, 90, 20, 100));
  obstacles.push(new Obstacle(width/2-80, 90, 100, 20));
  obstacles.push(new Obstacle(width/2-100, 90, 20, 200));
  obstacles.push(new Obstacle(width/2-80, height/2, 100, 20));
}


function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordTime = lifeSpan;
}

function draw() {
  background(0);

  if(lifeCounter<lifeSpan){
    population.live(obstacles);
    if (population.targetReached() && lifeCounter < recordTime) {
      recordTime = lifeCounter;
    } else {
      lifeCounter++;
    }
  }else{
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

  for(let obstacle of obstacles){
    obstacle.display();
  }

  target.display();

  //draw
  fill(255);
  textSize(16);
  text("Generation: " + population.generation, 10, 20);
  text("LifeSpan: " + lifeSpan, 10, 40);
  text("Life Counter: " + lifeCounter, 10, 80);
  text("Population Size: " + population.population.length, 10, 60);
  text("Mutation Rate: " + mutationRate, 10, 100);
  fill(0, 255, 0);
  text("Record Time: " + recordTime, 10, 120);
}


