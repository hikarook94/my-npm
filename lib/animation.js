import chalk from 'chalk'

export default class Animation {
  // アニメーション生成・表示クラス
  constructor (colorset) {
    this.colorset = colorset
  }

  // 命名考える
  show (texts, frame = 0) {
    const textsSize = texts.length
    if (frame === 0) {
      // メソッド切り出し
      console.log(texts.map(text => this.#effect(text)).join('\n'))
    } else {
      // TODO アニメーション中カーソルを消す
      // メソッド切り出し
      // 表示を消す処理に切り出し
      console.log('\u001B[' + textsSize + 'F\u001B[G\u001B[2K' + texts.map(text => this.#effect(text)).join('\n'))
    }
    setTimeout(() => {
      // TODO ループをいつまで繰り返すか決める
      if (frame < 30) {
        frame++
        this.show(texts, frame)
      }
    }, 100)
  }

  #effect (text) {
    const textArray = text.split('')
    return textArray.map(letter => chalk.hex(this.#getHex())(letter)).join('')
  }

  #getHex () {
    const random = Math.floor(Math.random() * this.colorset.length)
    return this.colorset[random]
  }
}
