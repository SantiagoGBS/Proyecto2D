const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
//
canvas.width = 840
canvas.height = 480
// canvas.width = 1024
// canvas.height = 512
//sss
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}
// console.log(colisionsuelo)
const gravity = 0.5

const colisionsuelo2d = []
for (let i = 0; i < colisionsuelo.length; i += 70) {
    colisionsuelo2d.push(colisionsuelo.slice(i, i + 70))
}
console.log(colisionsuelo2d)
let collisionBlocks = []
//por cada bloque 2541 es una colision dentro de la matriz principal
// colisionsuelo.forEach((row, y) => {
//     row.forEach((symbol, x) => {
//         // console.log(symbol)
//         if (symbol === 1) {
//             collisionBlocks.push(new CollisionBlock({
//                 position: {
//                     "x": x*16 ,
//                     "y": y*16
//                     // "x": x * 16,
//                     // "y": y * 16
//                 },
//             })
//             )
//         }

//     })
// })
colisionsuelo2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        // console.log(symbol)
        if (symbol === 1) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    "x": x*12 ,
                    "y": y*12
                    // "x": x * 16,
                    // "y": y * 16
                },
            })
            )
        }

    })
})
console.log(collisionBlocks)
const player = new Player({
    x: 0,
    y: 0
}
)
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
        // player.update()
        player.velocity.x = 0
        if (keys.d.pressed) player.velocity.x = 4
        else if (keys.a.pressed) player.velocity.x = -4
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
            player.velocity.y = -15
            break;
        case 'd':
            console.log("me estoy moviendo a la derecha")
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