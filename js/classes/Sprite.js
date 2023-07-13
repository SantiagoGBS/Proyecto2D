class Sprite {
    constructor({position, imageSrc}){
       this.position = position
       this.image = new Image()
        this.image.onload=()=>{
           this.width = this.image.width
            this.height = this.image.height
        }
       this.image.src = imageSrc
    }

    draw(){
       if(!this.image) return

        const frame ={
           position:{
               x:0,
               y:0
           },
            width:0,
            height:0,
        }

       c.drawImage(
           this.image,
           frame.position.x,
           frame.position.y,
           frame.width,
           frame.height,
           this.position.x,
           this.position.y,
           this.width,
           this.height
           )
    }

    update(){
       this.draw()
    }
}