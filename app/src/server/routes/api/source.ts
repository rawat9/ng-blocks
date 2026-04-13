import { createError, defineEventHandler, getQuery } from 'h3'
import { getComponentSource } from '../../../lib/get-component-source'

interface QueryParam {
  path: string
}

export default defineEventHandler((event) => {
  const { path } = getQuery<QueryParam>(event)

  if (!path) {
    throw createError({
      statusCode: 400,
      message: 'Missing required query parameter: path',
    })
  }

  return getComponentSource(path)
})
