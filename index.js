#! /usr/bin/env node

import minimist from 'minimist'
import * as readline from 'readline'
import Animation from './lib/animation.js'
import colorsets from './lib/colorsets.js'

class App {
  constructor () {
    this.colorset = this.#getColorset(colorsets)
  }

  run () {
    const animation = new Animation(this.colorset)
    const lines = []
    if (process.stdin.isTTY) { // execute like this: $ seasonify Hello, World!
      lines.push(minimist(process.argv.slice(2))._.join(' '))
      animation.show(lines)
    } else { // execute like this: $ echo Hello, World! | seasonify
      const rl = readline.createInterface(process.stdin)
      rl.on('line', (line) => {
        lines.push(line)
      })
      rl.on('close', () => {
        animation.show(lines)
      })
    }
  }

  #getColorset (annualColorsets) {
    const date = new Date()
    const currentMonthColorsets = annualColorsets[date.getMonth()]
    const random = Math.floor(Math.random() * currentMonthColorsets.length)
    return currentMonthColorsets[random]
  }
}

new App().run()
