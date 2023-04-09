input.onButtonPressed(Button.A, function () {
    user_input = 0
})
function loesche_raetsel () {
    for (let Index = 0; Index <= 4; Index++) {
        led.unplot(Index, 3)
        led.unplot(Index, 4)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (game_state == "game_over" || game_state == "win") {
        game_state = "wait_for_start"
    } else {
        basic.clearScreen()
        basic.pause(200)
        user_input = 99
        game_state = "running"
        timer_seconds = 0
        timer_rounds = 0
        level = 0
        raetsel_nummer = randint(0, 5)
    }
})
input.onButtonPressed(Button.B, function () {
    user_input = 1
})
function wait_animation () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
}
function countdown_timer () {
    timer_seconds = 0
    for (let index = 0; index < 5; index++) {
        led.toggle(timer_seconds, 0)
        if (level == 0) {
            music.playMelody("C5 - - - - - - - ", 800)
        } else if (level == 1) {
            music.playMelody("C5 - C5 - - - - - ", 800)
        } else if (level == 2) {
            music.playMelody("C5 - C5 - C5 - - - ", 800)
        } else {
        	
        }
        basic.pause(GAME_SPEED)
        timer_seconds += 1
    }
    led.toggle(timer_rounds, 1)
    timer_rounds += 1
    if (timer_rounds > MAX_ROUNDS) {
        game_state = "game_over"
    }
}
function zeige_raetsel () {
    if (raetsel_nummer == 0) {
        led.plot(0, 3)
        led.plot(3, 3)
        led.plot(0, 4)
        led.plot(1, 4)
        led.plot(4, 4)
    } else if (raetsel_nummer == 1) {
        led.plot(0, 3)
        led.plot(1, 3)
        led.plot(2, 3)
        led.plot(4, 3)
        led.plot(3, 4)
        led.plot(4, 4)
    } else if (raetsel_nummer == 2) {
        led.plot(0, 3)
        led.plot(2, 3)
        led.plot(3, 3)
        led.plot(4, 3)
        led.plot(0, 4)
        led.plot(1, 4)
        led.plot(3, 4)
        led.plot(4, 4)
    } else if (raetsel_nummer == 3) {
        led.plot(0, 3)
        led.plot(3, 3)
        led.plot(0, 4)
        led.plot(2, 4)
        led.plot(4, 4)
    } else if (raetsel_nummer == 4) {
        led.plot(1, 3)
        led.plot(0, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    } else if (raetsel_nummer == 5) {
        led.plot(0, 3)
        led.plot(2, 3)
        led.plot(3, 3)
        led.plot(3, 4)
    } else {
    	
    }
}
let raetsel_nummer = 0
let level = 0
let timer_rounds = 0
let timer_seconds = 0
let user_input = 0
let MAX_ROUNDS = 0
let GAME_SPEED = 0
let game_state = ""
game_state = "wait_for_start"
GAME_SPEED = 1000
MAX_ROUNDS = 5
let MAX_LEVELS = 3
let LOESUNG = [
1,
0,
0,
0,
1,
0
]
basic.forever(function () {
    serial.writeString(game_state)
    if (level == MAX_LEVELS) {
        game_state = "win"
    } else {
        if (game_state == "running") {
            zeige_raetsel()
            if (user_input == 0) {
                if (LOESUNG[raetsel_nummer] == 0) {
                    music.playTone(988, music.beat(BeatFraction.Half))
                    level += 1
                    loesche_raetsel()
                    raetsel_nummer = randint(0, 5)
                } else {
                    music.playTone(131, music.beat(BeatFraction.Half))
                    loesche_raetsel()
                    raetsel_nummer = randint(0, 5)
                }
                user_input = 99
            } else if (user_input == 1) {
                if (LOESUNG[raetsel_nummer] == 1) {
                    music.playTone(988, music.beat(BeatFraction.Half))
                    level += 1
                    loesche_raetsel()
                    raetsel_nummer = randint(0, 5)
                } else {
                    music.playTone(131, music.beat(BeatFraction.Half))
                    loesche_raetsel()
                    raetsel_nummer = randint(0, 5)
                }
                user_input = 99
            }
        }
    }
})
control.inBackground(function () {
    while (true) {
        if (game_state == "wait_for_start") {
            wait_animation()
        } else if (game_state == "running") {
            countdown_timer()
        } else if (game_state == "game_over") {
            basic.showIcon(IconNames.Skull)
            music.setTempo(120)
            music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
            game_state = "wait_for_start"
            basic.pause(5000)
        } else if (game_state == "win") {
            basic.clearScreen()
            basic.showIcon(IconNames.Happy)
            music.setTempo(120)
            music.playSoundEffect(music.builtinSoundEffect(soundExpression.happy), SoundExpressionPlayMode.UntilDone)
            basic.pause(5000)
        } else {
        	
        }
    }
})
