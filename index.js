#! /usr/bin/env node

import minimist from 'minimist'
import * as readline from 'readline'
import Animation from './lib/animation.js'

class App {
  // 実行引受クラス
  constructor () {
    this.options = minimist(process.argv.slice(2))
  }

  run () {
    const colorset = this.#getColorset()
    const animation = new Animation(colorset)

    const lines = []
    if (process.stdin.isTTY) {
      // $ my-npm Hello, World!
      lines.push(this.options._.join(' '))
      animation.show(lines)
    } else {
      const rl = readline.createInterface(process.stdin)
      // $ echo Hello, World! | my-npm
      rl.on('line', (line) => {
        lines.push(line)
      })
      rl.on('close', () => {
        // 同期処理化？
        animation.show(lines)
        // カーソルを表示させる
      })
    }
  }

  #getColorset () {
    // データ切り出し
    const anualColorArray = [
      [],
      [],
      [],
      [
        ['ebd6e4', 'dcaecb', 'c66d98', 'cdc782', 'b5b856'],
        ['868c80', 'e6e6dc', 'ecdfc2', 'ea9f97', 'ecc6c1'],
        ['eed9e7', 'd5b8b4', '7a6747', 'ffffff', '938e9d']
      ],
      [],
      [],
      [
        ['12BAD0', 'ED3A53', '5FCFE2', 'FDDA04', 'E7DEDD'],
        ['ffc51b', '05a9a8', 'f7df93', '9bdddf', '20d3d7']
      ],
      [
        ['12BAD0', 'ED3A53', '5FCFE2', 'FDDA04', 'E7DEDD'],
        ['ffc51b', '05a9a8', 'f7df93', '9bdddf', '20d3d7'],
        ['ffab40', 'ff7220', 'f44336', 'ff1744', 'a5014a']
      ],
      [],
      [
        ['5e32ba', 'e9804d', 'eb6123', '18181a', '96c457'],
        ['e4d299', 'e3c36e', 'b28656', 'e1ddc3', 'efd7a3']
      ],
      [],
      []
    ]
    const date = new Date()
    const colorsets = anualColorArray[date.getMonth()]
    const random = Math.floor(Math.random() * colorsets.length)
    return colorsets[random]
  }
}

new App().run()
