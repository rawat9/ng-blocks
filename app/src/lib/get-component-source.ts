import fs from 'fs'
import { join, extname } from 'path'

const EXAMPLES_DIR = join(process.cwd(), 'app/src/blocks')

export interface File {
  filename: string
  contents: string
  fileType: string
}

export function getComponentSource(path: string): File | File[] {
  const isFile = extname(path) !== ''

  if (isFile) {
    const filePath = join(EXAMPLES_DIR, path)
    const raw = fs.readFileSync(filePath, 'utf8')
    const ext = extname(path).replace('.', '')

    return {
      filename: path.split('/').pop() || '',
      contents: raw,
      fileType: ext
    }
  }

  const dirPath = join(EXAMPLES_DIR, path)
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const filePath = join(dirPath, entry.name)
      const raw = fs.readFileSync(filePath, 'utf8')
      const ext = extname(entry.name).replace('.', '')

      return {
        filename: entry.name,
        contents: raw,
        fileType: ext
      }
    })
}
