class Sprite {
    constructor({position, imageSrc, frameRate = 1, frameBuffer = 29, scale = 1, type = null}) {
        this.position = position
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = frameBuffer
        this.elapsedFrames = 0
        this.type = type
    }

    draw() {
        if (!this.image) return
        // c.drawImage(this.image, this.position.x, this.position.y)
        if (this.type != null) {
            const frame = {
                position: {
                    x: this.currentFrame * (this.image.width / this.frameRate),
                    y: 0,
                },
                width: 50,
                height: 50,
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

        } else {
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
        }
    }

    update() {
        this.draw()
        this.updateFrames()
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = 0
        }

    }
}