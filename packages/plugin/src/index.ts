import { type PluginOption } from 'vite'
import replaceAssignmentToSetState from './replaceAssignmentToSetState'

export default function (): PluginOption {
  return {
    name: 'vite-plugin-react-no-set-function',
    transform(code, id) {
      if (id.endsWith('.jsx') || id.endsWith('.js')) {
        return replaceAssignmentToSetState(code)
      }
      return { code, map: null }
    }
  }
}
