const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 840
canvas.height = 480

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const gravity = 0.4

const colisionsuelo2d = []

for (let i = 0; i < colisionsuelo.length; i += 70) {
    colisionsuelo2d.push(colisionsuelo.slice(i, i + 70))
}

let collisionBlocks = []
colisionsuelo2d.forEach((row, y) => {
    row.forEach((symbol, x) => {

        if (symbol === 1) {
            collisionBlocks.push(new CollisionBlock({
                    position: {
                        "x": x * 12,
                        "y": y * 12
                    },
                })
            )
        }

    })
})

let plataformaColision2D = []
for (let i = 0; i < colisionplataforma.length; i += 70) {
    plataformaColision2D.push(colisionplataforma.slice(i, i + 70))
}

let plataformaColisionBloque = []
plataformaColision2D.forEach((row, y) => {
    row.forEach((symbol, x) => {

        if (symbol === 1) {
            plataformaColisionBloque.push(new CollisionBlock({
                    position: {
                        "x": x * 12,
                        "y": y * 12
                    },
                })
            )
        }

    })
})

const player = new Player({
        position: {
            x: 0,
            y: 0
        },
        collisionsBlocks: collisionBlocks,
        imageSrc: './assets/images/protagonista/muerte.png',
        frameRate: 15,
        animations: {
            Ataque:{
                imageSrc:'./assets/images/protagonista/ataque.png',
                frameRate: 5,
            },
            Caminar:{
                imageSrc:'./assets/images/protagonista/caminar.png',
                frameRate: 5,
            },
            Muerte:{
                imageSrc:'./assets/images/protagonista/muerte.png',
                frameRate: 15,
            },
        }
    })

const enemys = []
for (let i=0; i<2; i++){
    let x=Math.floor(Math.random()*canvas.width)

    enemys.push(new Enemy(({
        position: {
            x: x,
            y: 0
        },
        collisionsBlocks: collisionBlocks,
        imageSrc: './assets/images/protagonista/caminar.png',
        frameRate: 5,
        animations: {
            Ataque:{
                imageSrc:'./assets/images/protagonista/ataque.png',
                frameRate: 5,
            },
            Caminar:{
                imageSrc:'./assets/images/protagonista/caminar.png',
                frameRate: 5,
            },
            Muerte:{
                imageSrc:'./assets/images/protagonista/muerte.png',
                frameRate: 15,
            },
        }
    })))
}


let y = 100

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },


}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/images/background.png'
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    // c.scale(4, 4)
    background.update()
    c.restore()
    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()

    })
    plataformaColisionBloque.forEach((bloque) => {
        bloque.update()

    })
    player.update(enemys)
    for (const enemy of enemys) {
        enemy.update(player, enemys)
    }
    player.velocity.x = 0

    if (keys.d.pressed){
        player.changeSprite('Caminar')
        player.velocity.x = 3
    }else if (keys.a.pressed) player.velocity.x = -3
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break;
        case 'a':
            keys.a.pressed = true
            break;
        case 'w':
            player.velocity.y = -10
            break;
        case 'd':
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
    }
})