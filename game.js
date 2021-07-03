let bird, bird2; 

let gravity = 0.01

let cameraVel = -2

let score = 0;

let pillars = []

let pillarDimentions = {width: 110, spaceBetweenTwoPillars: 230, color: "#8EC44E"}

let flappyFont; 
let music;

function preload() 
{
    flappyFont = loadFont('flappyBird.ttf');
    soundFormats('mp3');
    music = loadSound("happynes.mp3")
    music.setVolume(0.5);

}

function setup()
{
    createCanvas(900, innerHeight)
    
    bird = {index: 0, dead: false, pos: createVector(width/3, height/2), vel: createVector(0, 0), acc: createVector(0, 0.05), radius: 35} // this is the RK4 bird
    bird2 ={index: 1, dead: false, pos: createVector(width/3, height/2), vel: createVector(0, 0), acc: createVector(0, 0.05), radius: 35} 
    
    createNewPillars()

    textFont(flappyFont);

    // music.loop();
    
}

function draw()
{
    background("rgb(113,197,207)")

    displayBackground()

    pillars.forEach((pillar, x) => {
        pillar.display()
        pillar.x += cameraVel

        if (pillar.x < -150) 
        {
            pillars.splice(x, 1)
        } 
    })

    pillars.forEach((pillar, x) => {
        

        if (pillar.x == 550 && pillar.pos == "top") 
        {
            createNewPillars()
            // pillars.push(new Pillar({x: 600, y: randY + 300, pos: "bottom"}))
            // pillars.push(new Pillar({x: 600 , y: -randY, pos: "top"}))
        }

        if (bird.pos.x > pillar.x &&
            bird.pos.x < pillar.x + pillarDimentions.width && 
            bird.pos.y > pillar.y &&
            bird.pos.y < pillar.y + 500) 
        {
            die(bird) 
        }
        if (bird2.pos.x > pillar.x &&
            bird2.pos.x < pillar.x + pillarDimentions.width && 
            bird2.pos.y > pillar.y &&
            bird2.pos.y < pillar.y + 500) 
        {
            die(bird2) 
        }
    })

    push()
        fill("rgb(101,78,86)")
        stroke(0)
        strokeWeight(5)
        rect(0,height - bird.radius,width,100)
    pop()

    displayBird(bird)
    displayBird(bird2)

    

    if (!bird.dead) 
    {
        let k0 = bird.vel.y; 
        let k1 = bird.vel.y + (1/2)*(k0); 
        let k2 = bird.vel.y + (1/2)*(k1); 
        let k3 = bird.vel.y + (k2); 
        let k = createVector(0, (1/6)*(k0 + (2 * k1) + (2 * k2) + k3)); 

        bird.acc.y += gravity;
        bird.vel.add(bird.acc);
        bird.pos.add(k);

        // for (let i = 0; i < 4; i++) 
        // {

        //     let newGravity = gravity / 4;
        //     bird.acc.y += (newGravity)

        //     let newBirdAcc = createVector(0, bird.acc.y / 4); 
        //     bird.vel.add(newBirdAcc)

        //     let newBirdPos = createVector(0, bird.vel.y / 4); 
        //     bird.pos.add(newBirdPos)
        // }
    }
    else
    {
        bird.pos.add(bird.vel)
    }

    if (!bird2.dead) 
    {
        
        
        bird2.acc.y += gravity; 
        bird2.vel.add(bird2.acc); 
        bird2.pos.add(bird2.vel); 
    }
    else
    {
        bird2.pos.add(bird2.vel)
    }
    

    //bird.pos.y += rungeKutta(0, bird.pos.y, 0.1, 0.1)

    if (bird.pos.y > height - 50) 
    {
        die(bird)
    }
    if (bird2.pos.y > height - 50) 
    {
        die(bird2)
    }

    

    // console.log(bird.vel.y);

    push()
        textSize(80)
        fill(255)
        stroke(0)
        strokeWeight(3)
        text(Math.round(score), width/2, 100)
    pop()
}

function displayBird(birdObject)
{
    push()
        let y = birdObject.pos.y;
        let x = birdObject.pos.x;
        let radius = birdObject.radius
        strokeWeight(2)

        if (birdObject.index == 0) {
            fill("#D99C2B")
        }
        else
        {
            fill("red")
        }
        stroke(0)
        ellipseMode(CENTER);
        ellipse(x, y, birdObject.radius, birdObject.radius)

        x = birdObject.pos.x + (radius/4)
        y = birdObject.pos.y - (radius/4)

        fill(255)
        ellipse(x, y, birdObject.radius / 1.5, birdObject.radius / 2)
        fill(0)
        ellipse(x, y, birdObject.radius / 8, birdObject.radius / 8)

        // x = bird.pos.x
        // y = bird.pos.y + (radius/3)

        // fill("#E46519")
        // ellipse(x, y, bird.radius, bird.radius / 4)

        x = birdObject.pos.x - (radius/3)
        y = birdObject.pos.y + (radius/3)

        if (birdObject.vel.y < 0) 
        {
            fill("#EEF8E1")
            ellipse(x, y, birdObject.radius/3, birdObject.radius / 1.5)
        }
        else
        {
            fill("#EEF8E1")
            ellipse(x, y, birdObject.radius/1.5, birdObject.radius / 3)
        }
        

        x = birdObject.pos.x + (radius/2)
        y = birdObject.pos.y + (radius/4)

        fill("#BF495E")
        ellipse(x, y, birdObject.radius / 3, birdObject.radius / 3)
    pop()
    
}

function displayBackground()
{
    push()
        noStroke()
        fill(255)
        for (let x = 0; x < 15; x++) 
        {
            ellipse(100 * x, height - 40, 200, 200)
            
        }

        fill("#D7E4CA")
        stroke("#95BFB0")
        strokeWeight(2)
        for (let x = 0; x < 15; x++) 
        {
            rect(100 * x, height - 80, 30, 100)
            rect(100 * x + 30, height - 70, 30, 100)
            rect(100 * x - 25, height - 70, 30, 100)
            rect(100 * x + 15, height - 100, 30, 100)
            // rect(100 * x, height - 100, 30, 100)
            // rect(100 * x, height - 100, 30, 100)
            
        }

        noStroke()
        fill("#63A668")
        for (let x = 0; x < 15; x++) 
        {
            ellipse(100 * x, height - 10, 200, 100)
        }
    pop()
}

function createNewPillars()
{
    let newPillar2
    let newPillar1

    let randY = Math.round((Math.random() * -200)) - 00

   // randY = -100

    let randY1 = randY;
    let randY2 = randY + 700;

    
    if (pillars.length != 0) 
    {
        newPillar2 = new Pillar({x: pillars[pillars.length - 1].x + 400, y: randY1, pos: "top"})
        newPillar1 = new Pillar({x: pillars[pillars.length - 1].x + 400, y: randY2, pos: "bottom"})
    }
    else
    {
        newPillar1 = new Pillar({x: 600, y: randY1, pos: "top"})
        newPillar2 = new Pillar({x: 600, y: randY2, pos: "bottom"})
        console.log("first");
    }

    pillars.push(newPillar1)
    pillars.push(newPillar2)  

    // console.log(pillars);
}











function die(birdObject)
{

    // birdObject.vel = createVector(0, 2)
    birdObject.dead = true

    if (bird.dead && bird2.dead) 
    {
        cameraVel = 0;    
    }
    else if (bird.dead) 
    {
        bird.vel = createVector(cameraVel, 5);
    }
    else if (bird2.dead) 
    {
        bird2.vel = createVector(cameraVel, 5);
    }

}


function mouseClicked() 
{
    if(!bird.dead)
    {
        if (bird.vel.y > 0) 
        {
            bird.vel = createVector(0, 0)
        }
        
        bird.acc = createVector(0, -0.25)
    }
    

    if(!bird2.dead)
    {
        if (bird2.vel.y > 0) 
        {
            bird2.vel = createVector(0, 0)
        }
        
        bird2.acc = createVector(0, -0.25)
    }
}


class Pillar
{
    constructor(props)
    {
        this.x = props.x;
        this.y = props.y;
        this.pos = props.pos;
    }

    display = function()
    {
        if (bird.pos.x == this.x || bird2.pos.x == this.x && this.x > 100 && this.x < width) 
        {
         score+=(1)    
        }
        let x1 = this.x + (pillarDimentions.width / 4) + 1;
        let x2 = this.x + (5*pillarDimentions.width / 6);
        let x3 = this.x + (3 * pillarDimentions.width / 4);
        let x4 = this.x + (pillarDimentions.width / 10);
        let x5 = this.x + (pillarDimentions.width / 3);
        //let x6 = ;
        push()
            fill(pillarDimentions.color)
            noStroke()
            rect(this.x, this.y, pillarDimentions.width, 500)
            
            noStroke()
            fill("#5F8C3F")
            rect(x1, this.y, 3 * pillarDimentions.width / 4, 500)

            fill("#42592A")
            rect(x2, this.y, pillarDimentions.width / 6, 500)
            rect(x3, this.y, pillarDimentions.width / 20, 500)

            fill("#CED979")
            rect(x4, this.y, pillarDimentions.width / 20, 500)

            fill(pillarDimentions.color)
            rect(x5, this.y, pillarDimentions.width / 20, 500)

            stroke(0)
            strokeWeight(5)
            noFill()
            rect(this.x, this.y, pillarDimentions.width, 500)

            noStroke()
            fill(pillarDimentions.color)   
            if (this.pos == "top") 
            {
                rect(this.x - (pillarDimentions.width * 0.1), this.y + 450, pillarDimentions.width * 1.2, 50)
                fill("#5F8C3F")
                rect(this.x - (pillarDimentions.width * 0.1) + (pillarDimentions.width / 4) + 1, this.y + 450, (3 * pillarDimentions.width / 4) * 1.2, 50)

                fill("#42592A")
                rect(this.x - (pillarDimentions.width * 0.1) + (5*pillarDimentions.width / 6), this.y + 450, (pillarDimentions.width / 6) * 1.2, 50)
                rect(this.x - (pillarDimentions.width * 0.1) + (3 * pillarDimentions.width / 4), this.y + 450, (pillarDimentions.width / 20) * 1.2, 50)

                fill("#CED979")
                rect(this.x - (pillarDimentions.width * 0.1) + (pillarDimentions.width / 10), this.y + 450, (pillarDimentions.width / 20) * 1.2, 50)

                fill(pillarDimentions.color)
                rect(this.x - (pillarDimentions.width * 0.1) + (pillarDimentions.width / 3), this.y + 450, (pillarDimentions.width / 20) * 1.2, 50)

                stroke(0)
                strokeWeight(5)
                noFill()
                rect(this.x - (pillarDimentions.width * 0.1), this.y + 450, pillarDimentions.width * 1.2, 50)
            }
            else
            {
                rect(this.x - (pillarDimentions.width * 0.1), this.y, pillarDimentions.width * 1.2, 50)


                fill("#5F8C3F")
                rect(this.x - (pillarDimentions.width * 0.1) + (pillarDimentions.width / 4) + 1, this.y, (3 * pillarDimentions.width / 4) * 1.2, 50)

                fill("#42592A")
                rect(this.x - (pillarDimentions.width * 0.1) + (5*pillarDimentions.width / 6), this.y, (pillarDimentions.width / 6) * 1.2, 50)
                rect(this.x - (pillarDimentions.width * 0.1) + (3 * pillarDimentions.width / 4), this.y, (pillarDimentions.width / 20) * 1.2, 50)

                fill("#CED979")
                rect(this.x - (pillarDimentions.width * 0.1) + (pillarDimentions.width / 10), this.y, (pillarDimentions.width / 20) * 1.2, 50)

                fill(pillarDimentions.color)
                rect(this.x - (pillarDimentions.width * 0.1) + (pillarDimentions.width / 3), this.y, (pillarDimentions.width / 20) * 1.2, 50)
                
                stroke(0)
                strokeWeight(5)
                noFill()
                rect(this.x - (pillarDimentions.width * 0.1), this.y, pillarDimentions.width * 1.2, 50)
            }

        pop()
    }
}
