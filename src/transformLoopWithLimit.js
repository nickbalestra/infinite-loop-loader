'use strict'

module.exports = function transformLoopWithLimit (limit) {
  return function transformLoop (node) {
    const loopKeywords = ['WhileStatement', 'ForStatement', 'DoWhileStatement']

    if (loopKeywords.indexOf(node.type) > -1) {
      node.update(
        'var __ITER = ' + limit + ';' +
        node.source()
      )
    }

    if (!node.parent) {
      return
    }

    if (loopKeywords.indexOf(node.parent.type) > -1 && node.type === 'BlockStatement') {
      node.update(
        '{ if(__ITER <=0){ throw new Error("Loop exceeded maximum ' +
        'allowed iterations"); } ' +
        node.source().substr(1).slice(0, -1) +
        ' __ITER--; }'
      )
    }
  }
}
