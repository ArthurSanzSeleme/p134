
img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(380, 380);//alterar tamanho do canvas
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380)
  video.hide();
}
function start(){
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
  console.log("Modelo Carregado!")
  status = true;
  objectDetector.detect(img, gotResult);//trocar img para video, recortar e colar na função draw
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);// trocar img para video e atualizar tamanho

      if(status != "")
      {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);//trocar img para video, recortar e colar na função draw

        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status: Objeto Detectado";
          document.getElementById("numberOfObjects").innerHTML = 'quantidade de objetos detectados:'

          fill(r,g,b);// trocar por rgb
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);//trocar por rgb
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}