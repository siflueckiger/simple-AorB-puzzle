input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    game_state = "running"
    timer_seconds = 0
    timer_rounds = 0
})
function wait_animation () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(1000)
}
function countdown_timer () {
    timer_seconds = 0
    for (let index = 0; index < 5; index++) {
        led.toggle(timer_seconds, 0)
        basic.pause(GAME_SPEED)
        timer_seconds += 1
    }
    led.toggle(timer_rounds, 1)
    timer_rounds += 1
    if (timer_rounds > MAX_ROUNDS) {
        game_state = "game_over"
    }
}
let MAX_ROUNDS = 0
let GAME_SPEED = 0
let timer_rounds = 0
let timer_seconds = 0
let game_state = ""
game_state = "wait_for_start"
timer_seconds = 0
timer_rounds = 0
GAME_SPEED = 750
MAX_ROUNDS = 5
control.inBackground(function () {
    while (true) {
        if (game_state == "wait_for_start") {
            wait_animation()
        } else if (game_state == "running") {
            countdown_timer()
        } else if (game_state == "game_over") {
            basic.showIcon(IconNames.Skull)
        } else {
        	
        }
    }
})
