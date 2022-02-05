exports.Frame = {
    frameNumber: 0,
    rolls: [],
    type: '',
    get getScore() {
        return (this.rolls[0] + this.rolls[1])
    },
}