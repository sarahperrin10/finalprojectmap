let map_img; // map image
let grey_img; // grey background
let old_tv; // old tv 
let remote; // cursor remote

let table;
let name;
let show;
let img = []; // image array
let x;
let y;

function preload(){
  for(let i=0; i<50; i++){
    img[i] = loadImage('images/' + i + '.jpg') //loads in all images of netlix shows numbered 0 to 49
  }
  table = loadTable ("data/netflixshowsbystate.csv", "header"); //loads CSV file into table object
  map_img = loadImage('images/map.png')
  grey_img = loadImage('images/tv.png')
  old_tv = loadImage('images/old_tv.png')
  remote = loadImage('images/remote.png')
}


function setup(){
  createCanvas(1225, 710);
  loadData(); //calls load table data function
  imageMode (CENTER);
}

function draw(){
  background (255);
  noCursor();

  //displays grey background image
  image(grey_img, 613, 355, grey_img.width/1.2, grey_img.height/1.2);

  //displays map
  push();
  image(map_img, 613, 355, map_img.width, map_img.height);
  pop();

  //displays remote control as cursor
  image(remote, mouseX, mouseY, remote.width/6, remote.height/6);
    
  //calls the functions under the state array
  for (var i = 0; i<states.length; i++){
    states[i].display();
    states[i].move();
  }
}


  //calls "clicked" if mouse is pressed
function mousePressed(){
    for (var i = 0; i<states.length; i++){
      states[i].clicked(mouseX,mouseY);
    }
  }


//loads data from csv file 
loadData = function(){
  states = []; //size of state array determined by number of rows in CSV file
  
  //iterates over all the rows in the table
  for (var i=0; i < table.getRowCount(); i++){
    var row = table.getRow(i); 

    //access each field via its column name
    x = row.get("x");
    y = row.get ("y");
    name = row.get("name");
    show = row.get ("show");

    //make new state abbreviation out of the data read
    states[i] = new State (x, y, name, show, img[i]);
  }
}



//creates a class of states
class State {
  constructor(x, y, n, s, im) {
      this.x = Number(x);
      this.y = Number(y);
      this.name = n;
      this.show = s;
      this.img = im;
      this.speed = 0.5;
      this.m = 555;
      this.l = 345;
      this.p = 555;
      this.q = 460;
  }
  
  
  //check to see if mouse is over abbreviation
  clicked (mx, my){
      var d = dist (mx, my, this.x, this.y);
      if (d < 7.5){ //half of text size
          this.isclicked = true;
      }
      else {
          this.isclicked = false;
      }
  }

//move the show name and image in a jitter
move(){
    this.m += random(-this.speed, this.speed);
    this.l += random(-this.speed, this.speed);
    this.p += random(-this.speed, this.speed);
    this.q += random(-this.speed, this.speed);
  }

  //displays the state abbreviations 
  display(){
     fill(0);
     textSize(15);
     textAlign(CENTER);
     push();
     text (this.name, this.x, this.y); //abbreviation
     pop();
     //if mouse is over the abbreviation then display show name and image
     if (this.isclicked) {
        push();
        fill (255, 0, 0);
        textSize(30);
        textFont('Bangers');
        image (old_tv, 613, 320, old_tv.width*1.5, old_tv.height*1.5); //displays old tv
        text(this.show, this.m, this.l) //displays show's name in TV
        image(this.img, this.p, this.q, this.img.width/4, this.img.height/4); //displays show's image
        pop();
      }
  }
}



