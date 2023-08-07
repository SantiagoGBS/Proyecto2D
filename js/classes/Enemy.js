class Enemy extends Player{
    update(player,enemys) {
        this.updateFrames()
        this.updateHitbox()
        c.fillStyle = 'rgba(0,255,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.draw()
        if(this.position.x +55 < player.position.x){
            this.image = new Image()
            this.image.src = "./assets/images/protagonista/caminar.png"
            this.frameRate = 5
            this.position.x += 1
        }else if (this.position.x -55 > player.position.x){
            this.image = new Image()
            this.image.src = "./assets/images/protagonista/caminar.png"
            this.frameRate = 5
            this.position.x -= 1
        } else {
            this.image = new Image()
            this.image.src = "./assets/images/protagonista/ataque.png"
            this.frameRate = 5
        }
        if(this.position.y > player.position.y){
            console.log(this.velocity.x)
            this.position.y -= 10
        }
        this.updateHitbox()
        this.comprobarColisionHorizontal()
        this.gravedad()
        this.updateHitbox()
        this.comprobarColisionVertical()
    }
}

