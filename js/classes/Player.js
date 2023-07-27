class Player extends Sprite {
    constructor({position, collisionsBlocks, imageSrc, frameRate = 1, scale = 0.5, type = 1}) {
        super({position, imageSrc, frameRate, type})
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }

        this.collisionsBlocks = collisionsBlocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 10,
            height: 10,
        }
    }

    update() {
        this.updateFrames()
        this.updateHitbox()
        c.fillStyle = 'rgba(0,255,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.draw()
        this.position.x += this.velocity.x
        this.comprobarColisionHorizontal()
        this.gravedad()
        this.comprobarColisionVertical()
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26
            },
            width: 14,
            height: 27,
        }
    }

    comprobarColisionHorizontal() {
        for (let i = 0; i < this.collisionsBlocks.length; i++) {
            const collisionsBlocks = this.collisionsBlocks[i]
            if (
                colision({
                    object1: this,
                    object2: collisionsBlocks,
                })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = collisionsBlocks.position.x - this.width - 0.1
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = collisionsBlocks.position.x + collisionsBlocks.width + 0.1
                }
            }
        }
    }

    gravedad() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }

    comprobarColisionVertical() {
        for (let i = 0; i < this.collisionsBlocks.length; i++) {
            const collisionsBlocks = this.collisionsBlocks[i]
            if (
                colision({
                    object1: this,
                    object2: collisionsBlocks,
                })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionsBlocks.position.y - this.height - 0.1
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collisionsBlocks.position.y + collisionsBlocks.height + 0.1
                }
            }
        }
    }

}