import chalk from 'chalk'

export default class Animation {
  constructor (colorset) {
    this.colorset = colorset
    this.MAX_FRAME = 30
    this.FRAME_RATE = 100
  }

  show (texts, frame = 0) {
    console.log('\x1B[?25l') // Hide cursor
    const textsSize = texts.length + 1 // 1 is for the hidden cursor
    if (frame === 0) {
      console.log(texts.map(text => this.#effect(text)).join('\n'))
    } else {
      console.log(this.#removePreviousFrame(textsSize) + texts.map(text => this.#effect(text)).join('\n'))
    }
    setTimeout(() => {
      if (frame < this.MAX_FRAME) {
        frame++
        this.show(texts, frame)
      } else {
        console.log('\x1B[?25h') // Show cursor
      }
    }, this.FRAME_RATE)
  }

  #effect (text) {
    const textArray = text.split('')
    return textArray.map(letter => chalk.hex(this.#getHex())(letter)).join('')
  }

  #getHex () {
    const random = Math.floor(Math.random() * this.colorset.length)
    return this.colorset[random]
  }

  #removePreviousFrame (textsSize) {
    return '\u001B[' + textsSize + 'F\u001B[G\u001B[2K'
  }
}
