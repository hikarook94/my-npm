#! /usr/bin/env node

import chalk from 'chalk'
import minimist from 'minimist'
import * as readline from 'readline'

const options = minimist(process.argv.slice(2))

if (process.stdin.isTTY) {
  // $ my-npm Hello, World!
  show(options._)
} else {
  const lines = []
  const rl = readline.createInterface(process.stdin)
  // $ echo Hello, World! | my-npm
  rl.on('line', (line) => {
    lines.push(line)
  })
  rl.on('close', () => {
    show(lines)
  })
}
// TODO 受け取った配列のサイズを取得する
// TODO 1文字ずつ色を変える
// TODO 要素ごとに改行して表示する
// TODO カウントの使い方を考える
// TODO 最初は表示消去＆カーソル戻しをしない or 最初は要素数分改行する？
// TODO カラーセットを定義
// TODO アニメーション中カーソルを消す
function show (texts, count = 0) {
  if (count === 0) {
    console.log(texts.map(text => text).join('\n'))
  } else {
    console.log('\u001B[' + texts.length + 'F\u001B[G\u001B[2K' + texts.map(text => chalk.bgBlue(text)).join('\n'))
  }
  setTimeout(() => {
    // TODO いつまで繰り返す？
    if (count < texts.length) {
      count++
      show(texts, count)
    }
    // TODO 実行間隔をカラーセットから渡す
  }, 1000)
}

// クラスorモジュールに切り出す
