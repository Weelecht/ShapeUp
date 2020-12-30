let img;
let s;
let skip = 100;
let sizing = 50;
var cols;
var rows;
let xOff = 1;
var amount = 100;
var models = [];
let slider;

function preload() {

  img = loadImage("images/ShapeUp.png");
  s = loadModel("models/Vaccine.obj", true);

  
}

function setup() {
  createCanvas(1920, 1080, WEBGL);
  colorMode(HSB);
  noStroke();

  slider = createSlider(-1000,1000,10);
  slider.position(50,height - 200);
  slider.style("width", "200px");

 cols = height/amount;
 rows = width/amount;

  for (let x = 0; x < width + skip; x += skip) {
    for (let y = 0; y < height + skip; y += skip) {

      var  m = new Model(createVector(x,y),sizing);
      models.push(m);

    }
  }

}

function draw() {
 
  background(0);
  let val = slider.value();


  let waveC = int(sin(frameCount * 10));
  let noiseC = map(noise(xOff),0,1,0,255);

  directionalLight(255,255,255,1, -1, -1);
  directionalLight(255,255,255,-1,-1,-1);
  directionalLight(noiseC,100,100,1,waveC,-1);



  image(img, -width / 2, -550);
  
  for(let i = 0; i < models.length; i++) {
    let z = int(sin(frameCount * 0.03 + models[i].location.x, models[i].location.y * width) * 25);

    models[i].display(z,val);
    
  }

  xOff += 0.01;
}

class Model {

constructor(origin,tSize) {

  this.location = createVector(origin.x,origin.y,0);
  let xOff = random(0,100);
  this.size = tSize;
 
  

}

display(z,value) {
push();

let noiseA = map(noise(xOff),0,1,0,255);
let mouse = createVector(mouseX,mouseY);
let direction = p5.Vector.sub(mouse,this.location);

translate(this.location.x -width/2,this.location.y + -550, + z + 70);

  rotateY(direction.y / (width/-PI + value));
  rotateX(direction.x / (height/PI -8 + value));

scale(this.size/100);
fill(255,noiseA)
specularMaterial(255,noiseA);
model(s);
pop();


}



}
