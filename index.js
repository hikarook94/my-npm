#! /usr/bin/env node

import chalk from 'chalk'
import minimist from 'minimist'
import * as readline from 'readline'

const options = minimist(process.argv.slice(2))
const colorset = getColorset()
if (process.stdin.isTTY) {
  // $ my-npm Hello, World!
  const line = [options._.join(' ')]
  show(line, colorset)
} else {
  const lines = []
  const rl = readline.createInterface(process.stdin)
  // $ echo Hello, World! | my-npm
  rl.on('line', (line) => {
    lines.push(line)
  })
  rl.on('close', () => {
    // 同期処理化？
    show(lines, colorset)
    // カーソルを表示させる
  })
}

// TODO カウントの使い方を考える
function show (texts, colorset, count = 0) {
  const textsSize = texts.length
  if (count === 0) {
    console.log(texts.map(text => effect(text, colorset)).join('\n'))
  } else {
    // TODO アニメーション中カーソルを消す
    console.log('\u001B[' + textsSize + 'F\u001B[G\u001B[2K' + texts.map(text => effect(text, colorset)).join('\n'))
  }
  setTimeout(() => {
    // TODO ループをいつまで繰り返すか決める
    if (count < 30) {
      count++
      show(texts, colorset, count)
    }
  }, 100)
}
// クラスorモジュールに切り出す

function effect (text, colorset) {
  const textArray = text.split('')
  return textArray.map(letter => chalk.hex(getRandomRGB(colorset))(letter)).join('')
}

function getRandomRGB (colorset) {
// もっとシンプルに書けない？
  const random = Math.floor(Math.random() * colorset.length)
  return colorset[random]
}

function getColorset () {
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
