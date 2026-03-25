import fs from 'fs'
import path from 'path'

const EXAMPLES_DIR = path.join(process.cwd(), 'app/src/blocks')

export interface File {
  filename: string
  contents: string
  fileType: string
}

export function getComponentSource(directory: string): File[] {
  const dirPath = path.join(EXAMPLES_DIR, directory)
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const filePath = path.join(dirPath, entry.name)
      const raw = fs.readFileSync(filePath, 'utf8')
      const contents = raw.replace(/@\/registry\/map/g, '@/components/ui/map')
      const ext = path.extname(entry.name).replace('.', '')

      return {
        filename: entry.name,
        contents,
        fileType: ext,
      }
    })
}
