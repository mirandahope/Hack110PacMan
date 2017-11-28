import "introcs";

import {
    SVG,
    Group,
    Rectangle,
    Circle,
    Stroke,
    Color,
} from "introcs/graphics";

import {
    Sprite,
    Application,
    Point,
    Graphics,
    Text,
    TextStyle
} from "pixi.js";



const app: Application = new Application(600, 600);
document.body.appendChild(app.view);

let background: Sprite = Sprite.fromImage("./black.png");
app.stage.addChild(background);

let waka: HTMLAudioElement = new Audio("./waka.mp3");

// pacman.texture = PIXI.Texture.fromImage("./pacman.png");
class Pellet {
    x: number = 0;
    y: number = 0;
    sprite: Sprite; 

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

let list: Pellet[] = [];

let points: number = 0;

for (let x: number = 0; x < 30; x++) {
    for (let y: number = 0; y < 30; y++) {
        let pelly: Pellet = new Pellet(x * 20, y * 20);
        let id: Sprite = Sprite.fromImage("./circle.png");
        id.scale.x = 0.01;
        id.scale.y = 0.01;
        pelly.sprite = id;
        id.x = pelly.x;
        id.y = pelly.y;
        list.push(pelly);
        app.stage.addChild(id);
    }
} 

let pacman: Sprite = Sprite.fromImage("./PacMan.png");
pacman.scale.x = 0.12;
pacman.scale.y = 0.12;
pacman.x = 50;
pacman.y = 50;
app.stage.addChild(pacman);
// export function drawPellets(): void {

// }

// let redPac: Sprite = Sprite.fromImage("./red.png");
// redPac.scale.x = 0.25;
// redPac.scale.y = 0.25;
// redPac.x = 35;
// redPac.y = 50;
// app.stage.addChild(redPac);


window.onkeydown = function(e: KeyboardEvent): void {
    pacman.pivot = new Point(pacman.width / 2, pacman.height / 2);
    const LEFT: number = 37;
    const UP: number = 38;
    const RIGHT: number = 39;
    const DOWN: number = 40;
    const STEP: number = 5;
    if (e.keyCode === LEFT) {
        pacman.texture = PIXI.Texture.fromImage("./PacMan.png");
        pacman.x -= STEP;
    } else if (e.keyCode === UP) {
        pacman.texture = PIXI.Texture.fromImage("./PacMan 3.png");
        pacman.y -= STEP;
    } else if (e.keyCode === RIGHT) {
        pacman.texture = PIXI.Texture.fromImage("./PacMan 2.png");
        pacman.x += STEP;
    } else if (e.keyCode === DOWN) {
        pacman.texture = PIXI.Texture.fromImage("./PacMan 4.png");
        pacman.y += STEP;
    }
    checkCollision();
};

export function checkCollision(): void {
    for (let i: number = 0; i < list.length; i++) {
        let pell: Pellet = list[i];
        let distance: number = Math.sqrt((Math.pow(pell.y - (pacman.y + 5), 2) + Math.pow(pell.x - (pacman.x + 5), 2)));
        let radiusSum: number = 4 + 10; // sum of radii 
        if (distance < radiusSum) { // this is where we eat
            score(pell);        
            pell.sprite.texture = PIXI.Texture.fromImage("./black.png");
            waka.play();
            
        }
        
    }
}

// let scoreText: Text = new PIXI.Text ("Score" + points);
// scoreText.x = 300;
// scoreText.y = 300; 

// let style: TextStyle = new PIXI.TextStyle({
//     fontFamily: "Arial",
//     fontSize: 36,
//     fill: "#ffffff"
// });
// app.stage.addChild(TextStyle);



let graphics: Graphics = new PIXI.Graphics();
graphics.lineStyle(3, 0x1a1aff);
graphics.beginFill(0x1a1aff);
graphics.drawRect(225, 250, 165, 50);
app.stage.addChild(graphics);

let text: Text = new PIXI.Text("Score: " + points, {fill:"white"});
text.x = 250; 
text.y = 260; 
app.stage.addChild(text);

export function score(pell: Pellet): number {
    if (ifEaten(pell) === false) {
        // let sound: Audio = new Audio("./waka.mp3");
        points = points + 10;
        text.text = "Score: " + points; 
    }
    return points;

}






export function ifEaten(pell: Pellet): boolean {
    if (pell.sprite.texture === PIXI.Texture.fromImage("./black.png")) {
            return true;
    } else if (pell.sprite.texture !== PIXI.Texture.fromImage("./black.png")) {
        return false;
    }
    return false;
}

// export function winning(pell: Pellet): boolean {

// }
// let wall: Wall = new Wall(new Color(0, 0, 1)


// export function edge(): void {
//     if (pacman.x === 600) {
//         pacman.x = pacman.x = 1;
//     }
// }

// export function pellet(): void {
//     for (let x: number = 0; x < 500; x++) {
//         for (let y: number = 0; y < 500; y++) {
//            let dot: Circle = new Circle(2, x, y); 
//            let dot2: Circle = new Circle(2, x + 5, y + 5);
//         }    
//     }
// }

// function isColliding(PacMan: Sprite, pellet: ): boolean {
//     const pacmanpellet: Circle = pellet.getBounds();
//     const pelletpacman: Circle = pacman.getBounds();
//     return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
// }

// for (let row: number = 0; row < 20; row++) {
//     let unlit: Color = new Color(1, 1, 1);
//     let lit: Color = new Color (0, 0, 0);
//     for (let column: number = 0; column < 20; column++) {
//         let pellet: Circle = new Circle(2, column * 10, row * 10);
//         pellet.fill = lit;
//         pellet.onclick = function(event: isColliding): void {
//             pellet.fill = unlit;
//         };
//     background.add(pellet);
//     }
// }



