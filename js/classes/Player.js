class Player {
    constructor({position, collisionsBlocks}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height = 20
        this.width =20
        this.collisionsBlocks = collisionsBlocks
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 20, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.gravedad()
        this.comprobarColisionVertical()
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
                }
            }
        }
    }
}