'use strict'

module.exports = function transformLoopWithLimit (limit) {
  const loopNodeTypes = ['WhileStatement', 'ForStatement', 'DoWhileStatement']

  const isUnlabeledLoop = (node) =>
    loopNodeTypes.indexOf(node.type) > -1 && node.parent.type !== 'LabeledStatement'

  const isLabeledLoop = (node) =>
    loopNodeTypes.indexOf(node.type) > -1 && node.parent.type === 'LabeledStatement'

  const isBodyOfLoop = (node) =>
     node.type === 'BlockStatement' && loopNodeTypes.indexOf(node.parent.type) > -1

  const addVarDeclarationBeforeNode = (node, limit) =>
    node.update(`
      var __ITER = ${limit};
      ${node.source()}`
    )

  const addGuardsToLoopBody = (node) =>
    node.update(
      `{ if (__ITER <= 0) {
        throw new Error("Loop exceeded maximum allowed iterations");
      }
      __ITER--;
      ${node.source().substr(1)}`
    )

  return function transformLoop (node) {
    if (isUnlabeledLoop(node)) {
      addVarDeclarationBeforeNode(node, limit)
    }

    if (isLabeledLoop(node)) {
      addVarDeclarationBeforeNode(node.parent, limit)
    }

    if (isBodyOfLoop(node)) {
      addGuardsToLoopBody(node)
    }
  }
}
