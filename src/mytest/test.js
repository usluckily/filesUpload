/**
 * Created by Administrator on 2017/11/6.
 */
let a  = params => params*2

let set = new Set()

for(var i=0;i<10;i++){
  set.add(i)
}

function animals(type){
  this.type = type
}

animals.prototype.say = function(){
  console.log(this.type+' say '+this.sound)
}
animals.prototype.active = function(){
  console.log(this.type+' active in '+this.place)
}

//dogs
function dog(type){
  this.type = type
  this.sound = 'awu------e'
  this.place = 'land'
  this.run = function(){
    console.log('Im running')
  }
}

//birds
function bird(type){
  this.birdType = type
  this.sound = 'jiujiu'
  this.place = 'sky'
  this.fly = function(){
    if(this.type == 'bird'){
      console.log('Im flying')
    }else{
      console.log('Im '+this.type+',not a bird , but im still flying!')
    }

  }
}

//haski
dog.prototype = new animals('dogs')
dog.prototype.constructor = dog
var haski = new dog('haski')

//swallow
bird.prototype = new animals('birds')
bird.prototype.constructor = bird
var swallow = new bird('swallow')

haski.sound = 'ooooo-----wu'
haski.say()
swallow.fly.call(haski)

console.log(haski.__proto__)




