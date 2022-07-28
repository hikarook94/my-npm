#! /usr/bin/env node

import chalk from 'chalk'
import minimist from 'minimist'
import * as readline from 'readline'

const options = minimist(process.argv.slice(2))

if (process.stdin.isTTY) {
  // $ my-npm Hello, World!
  const line = [options._.join(' ')]
  show(line)
} else {
  const lines = []
  const rl = readline.createInterface(process.stdin)
  // $ echo Hello, World! | my-npm
  rl.on('line', (line) => {
    lines.push(line)
  })
  rl.on('close', () => {
    // 同期処理化？
    show(lines)
    // カーソルを表示させる
  })
}

// TODO カウントの使い方を考える
// TODO カラーセットを定義
function show (texts, count = 0) {
  const textsSize = texts.length
  if (count === 0) {
    console.log(texts.map(text => effect(text)).join('\n'))
  } else {
    // TODO アニメーション中カーソルを消す
    // 空欄で改行されてしまうのを修正
    console.log('\u001B[' + textsSize + 'F\u001B[G\u001B[2K' + texts.map(text => effect(text)).join('\n'))
  }
  setTimeout(() => {
    // TODO ループをいつまで繰り返すか決める
    if (count < 30) {
      count++
      show(texts, count)
    }
    // TODO 実行間隔をカラーセットから渡す
  }, 100)
}
// クラスorモジュールに切り出す

function effect (text) {
  const textArray = text.split('')
  return textArray.map(letter => chalk.rgb(...getRandomRGB())(letter)).join('')
  // rgbにカラーセットをランダムで渡す
}

function getRandomRGB () {
  // もっとシンプルに書けない？
  return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
}
