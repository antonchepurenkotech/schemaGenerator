import fs from 'node:fs/promises'
import path from 'node:path'

export async function readInput(file?: string, text?: string): Promise<string> {
  if (file) {
    try {
      return await fs.readFile(file, 'utf-8')
    } catch {
      throw new Error(`Unable to read file: ${file}`)
    }
  }

  if (text !== undefined) return text

  throw new Error('Either --file or --text must be provided')
}

export async function writeOutput(
  output: string | undefined,
  type: 'json' | 'xml',
  content: string,
): Promise<string> {
  const outputPath = output ? path.resolve(output) : path.join('output', `result.${type}`)

  try {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, content, 'utf-8')
  } catch {
    throw new Error(`Unable to save to file: ${outputPath}`)
  }

  return outputPath
}