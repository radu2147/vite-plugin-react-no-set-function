import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'

const replaceAssignmentToSetState = (code: string) => {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  })
  const componentState: Record<string, unknown> = {}
  traverse(ast, {
    AssignmentExpression(path) {
      const node = path.node
      if (node.left.type === 'Identifier' && componentState[node.left.name]) {
        path.replaceWith({
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: `set${node.left.name}`
          },
          arguments: [
            {
              type: 'ArrowFunctionExpression',
              id: null,
              expression: true,
              body: node.right,
              async: false,
              params: [
                {
                  type: 'Identifier',
                  name: node.left.name
                }
              ]
            }
          ]
        })
      }
    },
    VariableDeclaration(path) {
      const node = path.node
      node.declarations.forEach((declaration) => {
        if (
          declaration.init?.type === 'CallExpression' &&
          declaration.init.callee.type === 'Identifier' &&
          declaration.init.callee.name === 'useState' &&
          declaration.id.type === 'Identifier'
        ) {
          componentState[declaration.id.name] = true
          declaration.id = {
            start: declaration.id.start,
            end: declaration.id.end,
            type: 'ArrayPattern',
            elements: [
              {
                type: 'Identifier',
                name: declaration.id.name
              },
              {
                type: 'Identifier',
                name: `set${declaration.id.name}`
              }
            ]
          }
        }
      })
    }
  })
  return generate(ast, {}, code)
}

export default replaceAssignmentToSetState
