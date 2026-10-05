class Obstacle{
    constructor(x, y, w, h, target = false){
        this.position = createVector(x, y);
        this.w = w;
        this.h = h;

        this.isTarget = target;
    }

    contains(spot){
        return (
            (spot.position.x > this.position.x) &&
            (spot.position.x < this.position.x + this.w) &&
            (spot.position.y > this.position.y) &&
            (spot.position.y < this.position.y + this.h)
        );
    }

    display(){
        if(this.isTarget) fill(255, 0, 0);
        
        else fill(125);
        
        rect(this.position.x, this.position.y, this.w, this.h);
    }
}