const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerWidth*0.5

const portal1Map = []
for (let i = 0; i < portal1.length; i+= 130) {
    portal1Map.push(portal1.slice(i, 130 + i))
}

const portal01 = []

const collisionsMap = []
for (let i = 0; i < collisions.length; i+= 130) {
    collisionsMap.push(collisions.slice(i, 130 + i))
}

const boundaries = []
const offset = {
    x: 0,
    y: 20
}

portal1Map.forEach((row, i) => {
    row.forEach((symbol, j) =>{
        if (symbol === 94)
        portal01.push(
            new entrace1({
                position: {
                    x: j * entrace1.width + offset.x,
                    y: i * entrace1.height + offset.y
                }
            })
        )
    })
})
console.log(portal1Map)

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) =>{
        if (symbol === 94)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})
console.log(collisionsMap)

const image = new Image()
image.src = './Supra/img/mapasupra.png'

const foregroundImage = new Image()
foregroundImage.src = './Supra/img/SupraRenal.jpg'

const playerDownImage = new Image()
playerDownImage.src = './Supra/img/player.png'

const playerUpImage = new Image()
playerUpImage.src = './Supra/img/player.png'

const playerLeftImage = new Image()
playerLeftImage.src = './Supra/img/player.png'

const playerRightImage = new Image()
playerRightImage.src = './Supra/img/player.png'

const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/4/2,
        y: canvas.height/2 - 68/2,
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let portal = false

const movables = [background, ...boundaries, ...portal01]

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        )
}

function animate(){
    foreground.draw();
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(Boundary => {
        Boundary.draw();
    });
    portal01.forEach(entrace1 => {
        entrace1.draw();
    });
    player.draw();

    let moving = true
        player.moving = false

    let gravity = true
        player.gravity = false

    let timer = 0

        if( moving != false) {
            player.gravity = true

            for (let i = 0; i< boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }}
                    })
                    ) {
                    gravity = false
                    break
                }
            }
            for (let i = 0; i< portal01.length; i++) {
                const Entrace1 = portal01[i]
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {...Entrace1, position: {
                            x: Entrace1.position.x,
                            y: Entrace1.position.y - 3
                        }}
                    })
                    ) {
                    newWeb()
                    break
                }
            }
    
            if (gravity)
            movables.forEach((movable) => {
                movable.position.y -= 2
            })
        }

    
    if(keys.w.pressed && lastwkey == false && portal == false) {
        player.moving = true
        setTimeout(function() {
            lastwkey = true;
          }, 100);

        for (let i = 0; i< boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
                ) {
                moving = false
                break
            }
        }

        if (moving){
            movables.forEach((movable) => {
                movable.position.y += 8
            })
        }
        
    }
    else if (keys.a.pressed && portal == false) {
        player.moving = true
        player.image = player.sprites.left

        for (let i = 0; i< boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y 
                    }}
                })
                ) {
                moving = false
                break
            }
        }

        if (moving)
        movables.forEach((movable) => {
            movable.position.x += 5
        })
    }

    else if(keys.d.pressed && portal == false) {
        player.moving = true
        player.image = player.sprites.right

        for (let i = 0; i< boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y 
                    }}
                })
                ) {
                moving = false
                break
            }
        }

        if (moving)
        movables.forEach((movable) => {
            movable.position.x -= 5
        })
    }
}
animate()

window.addEventListener('keydown', (e) =>{
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            lastwkey = false
            break
        case 'd':
            keys.d.pressed = true
            lastwkey = false
            break
    }
})

window.addEventListener('keyup', (e) =>{
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break
    }
})