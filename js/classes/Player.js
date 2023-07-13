class Player extends Sprite{
    constructor({position, collisionsBlocks, imageSrc}) {
        super({imageSrc})
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }

        this.collisionsBlocks = collisionsBlocks
    }

    update() {
        c.fillStyle='rgba(0,255,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.draw()
        this.position.x += this.velocity.x
        this.comprobarColisionHorizontal()
        this.gravedad()
        this.comprobarColisionVertical()
    }
    comprobarColisionHorizontal(){
        for(let i=0; i<this.collisionsBlocks.length; i++){
            const collisionsBlocks = this.collisionsBlocks[i]
            if(
                colision({
                    object1:this,
                    object2:collisionsBlocks,
                })){
                if(this.velocity.x>0){
                    this.velocity.x=0
                    this.position.x=collisionsBlocks.position.x - this.width -0.1
                }
                if(this.velocity.x<0){
                    this.velocity.x=0
                    this.position.x=collisionsBlocks.position.x + collisionsBlocks.width + 0.1
                }
            }
        }
    }
    gravedad(){
            this.position.y += this.velocity.y
            this.velocity.y += gravity
    }
    comprobarColisionVertical(){
        for(let i=0; i<this.collisionsBlocks.length; i++){
            const collisionsBlocks = this.collisionsBlocks[i]
            if(
                colision({
                    object1:this,
                    object2:collisionsBlocks,
                })){
                if(this.velocity.y>0){
                    this.velocity.y=0
                    this.position.y=collisionsBlocks.position.y - this.height -0.1
                }
                if(this.velocity.y<0){
                    this.velocity.y=0
                    this.position.y=collisionsBlocks.position.y + collisionsBlocks.height + 0.1
                }
            }
        }
    }

}