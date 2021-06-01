const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const template = require('@babel/template').default
const types = require('@babel/types')

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(
  item => `console.${item}`
)

traverse(ast, {
  // first
  // CallExpression(path, state) {
  //   if (
  //     types.isMemberExpression(path.node.callee) &&
  //     path.node.callee.object.name === 'console' &&
  //     ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)
  //   ) {
  //     const { line, column } = path.node.loc.start
  //     path.node.arguments.unshift(
  //       types.stringLiteral(`filename: (${line}, ${column})`)
  //     )
  //   }
  // }
  // second
  // CallExpression(path, state) {
  //   // 直接生成字符串
  //   const calleeName = generate(path.node.callee).code
  //   console.log('calleeName:', calleeName)
  //   if (targetCalleeName.includes(calleeName)) {
  //     const { line, column } = path.node.loc.start
  //     path.node.arguments.unshift(
  //       types.stringLiteral(`filename: (${line}, ${column})`)
  //     )
  //   }
  // }
  // three 实现新的需求，在 console.xx 之前打印信息
  CallExpression(path, state) {
    if (path.node.isNew) {
      // 新的节点直接跳过
      return
    }
    const calleeName = generate(path.node.callee).code
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start
      const newNode = template.expression(
        `console.log("filename: (${line}, ${column})")`
      )()
      newNode.isNew = true

      if (path.findParent(path => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]))
        path.skip()
      } else {
        path.insertBefore(newNode)
      }
    }
  }
})

const { code, map } = generate(ast)
console.log(code)

/**
 * console.log("filename: (2, 4)", 1);

function func() {
  console.info("filename: (5, 8)", 2);
}

export default class Clazz {
  say() {
    console.debug("filename: (10, 12)", 3);
  }

  render() {
    return <div>{console.error("filename: (13, 25)", 4)}</div>;
  }

}
 */
