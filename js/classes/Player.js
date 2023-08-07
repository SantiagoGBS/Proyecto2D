class Player extends Sprite {
    constructor({position, collisionsBlocks, imageSrc, frameRate = 1, scale = 0.5, animations, type = 1}) {
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
        this.animations = animations
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image=image
        }
    }

    changeSprite(key) {
        if (this.image===this.animations[key].image) return
            this.image = this.animations[key].image
            this.frameRate=this.animations[key].frameRate
    }

    update(enemys) {
        this.updateFrames()
        this.updateHitbox()
        c.fillStyle = 'rgba(0,255,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.draw()
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.comprobarColisionHorizontal()
        this.gravedad()
        this.updateHitbox()
        this.comprobarColisionVertical()
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 10,
                y: this.position.y + 10
            },
            width: 30,
            height: 35,
        }
    }

    comprobarColisionHorizontal() {
        for (let i = 0; i < this.collisionsBlocks.length; i++) {
            const collisionsBlocks = this.collisionsBlocks[i]
            if (
                colision({
                    object1: this.hitbox,
                    object2: collisionsBlocks,
                })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionsBlocks.position.x - offset - 0.1
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionsBlocks.position.x + collisionsBlocks.width - offset + 0.1
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
                    object1: this.hitbox,
                    object2: collisionsBlocks,
                })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionsBlocks.position.y - offset - 0.1

                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionsBlocks.position.y + collisionsBlocks.height - offset - 0.1

                }
            }
        }
    }

}