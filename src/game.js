const obj = require('./frame');
const prompt = require("prompt-sync")({ sigint: true });

let currentFrame = 0
let score = 0
let frames = []


exports.start = function () {
    while (currentFrame < 10) {
        getInput()
        calculateScore()
        results()
        currentFrame++
    }
}

getInput = function () {
    let object = Object.create(obj.Frame)
    frames[currentFrame] = object

    console.log('Lets Bowl! Frame - ' + (currentFrame+1))
    let roll1 = parseInt(prompt("Roll 1: "))
    let roll2 = 0
    if (roll1 !== 10) {
        roll2 = parseInt(prompt("Roll 2: "))
    }

    frames[currentFrame].rolls = [roll1, roll2]
}

calculateScore = function () {
    //strike
    if (frames[currentFrame].rolls[0] === 10) {
        frames[currentFrame].type = 'strike'
        console.log('- - Strike! - -')
        if (currentFrame === 9) {
            handleFrameTen('strike')
        }
    }
    //spare
    else if ((frames[currentFrame].rolls[0] + frames[currentFrame].rolls[1]) === 10) {
        frames[currentFrame].type = 'spare'
        console.log('- - Spare! - -')
        if (currentFrame === 9) {
            handleFrameTen('spare')
        }
    }
    //normal
    else {
        checkPrevStrike()
        checkPrevSpare()
        frames[currentFrame].type = 'normal'
        score += frames[currentFrame].getScore
    }
}

handleFrameTen = function(type) {
    if (type === 'spare') {
        console.log('- - Bonus Roll! - -')
        let roll1 = parseInt(prompt("Roll 1: "))
        score += roll1
    }
    else if (type === 'strike') {
        console.log('- - Bonus Rolls! - -')
        let roll1 = parseInt(prompt("Roll 1: "))
        let roll2 = parseInt(prompt("Roll 2: "))
        score += (roll1 + roll2)
    }

    checkPrevStrike()
    checkPrevSpare()
    score += frames[currentFrame].getScore
}

checkPrevSpare = function () {
    if (currentFrame !== 0 && frames[currentFrame-1].type === 'spare') {
        for (let i = currentFrame-1; i >= 0; i--) {
            if (frames[i].type === 'spare') {
                score += frames[i].getScore
                score += frames[currentFrame].rolls[0]
            }
            else if (frames[i].type !== 'spare') {
                break;
            }
        }
    }
}

checkPrevStrike = function () {
    if (currentFrame !== 0 && frames[currentFrame-1].type === 'strike') {
        for (let i = (currentFrame-1); i >= 0; i--) {
            if (frames[i].type === 'strike') {
                score += frames[i].getScore
                score += frames[currentFrame].getScore
            }
            else if (frames[i].type !== 'strike') {
                break;
            }
        }
    }
}

results = function () {
    if (currentFrame === 9) {
        console.log('- - Game Over! - - ')
        console.log('You final score is '+ score + '!')
    }
    else {
        console.log('You score after Frame ' + (currentFrame+1) + ' = ' + score + '!')
    }
}