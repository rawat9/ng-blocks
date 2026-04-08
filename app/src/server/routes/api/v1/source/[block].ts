import { defineEventHandler, getRouterParam } from 'h3'
import { getComponentSource } from '../../../../../lib/get-component-source'

export default defineEventHandler((event) => {
  const block = getRouterParam(event, 'block')

  if (!block) {
    return { files: [] }
  }

  const files = getComponentSource(block)
  return { files }
})
