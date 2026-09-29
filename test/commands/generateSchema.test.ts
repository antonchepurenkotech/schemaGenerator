import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import {describe, it} from 'mocha'

async function withTempDirectory(test: (directory: string) => Promise<void>): Promise<void> {
  const directory = await mkdtemp(path.join(tmpdir(), 'schema-command-test-'))

  try {
    await test(directory)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
}

const cliLoadOptions = { root: process.cwd() }

async function runBuiltCommand(args: string[]) {
  const previousNodeEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  try {
    return await runCommand(args, cliLoadOptions)
  } finally {
    if (previousNodeEnv === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = previousNodeEnv
    }
  }
}

describe('json command', () => {
  it('generates a schema from a JSON file and writes it to the requested path', async () => {
    await withTempDirectory(async (directory) => {
      const inputPath = path.join(directory, 'input.json')
      const outputPath = path.join(directory, 'result.json')
      await writeFile(inputPath, '{"name":"Ada"}')

      const { error, stdout } = await runBuiltCommand([
        'json',
        '--file',
        inputPath,
        '--out',
        outputPath,
      ])

      expect(error).to.be.undefined
      expect(stdout).to.contain(`Result saved to: ${outputPath}`)
      expect(await readFile(outputPath, 'utf-8')).to.contain('name')
    })
  })

  it('rejects invalid JSON text', async () => {
    const { error } = await runBuiltCommand(['json', '--text', 'not-json'])

    expect(error?.message).to.contain('Valid JSON must be provided')
  })
})

describe('xml command', () => {
  it('generates a schema from XML text and writes it to the requested path', async () => {
    await withTempDirectory(async (directory) => {
      const outputPath = path.join(directory, 'result.xsd')
      const { error, stdout } = await runBuiltCommand([
        'xml',
        '--text',
        '<root><name>Ada</name></root>',
        '--out',
        outputPath,
      ])

      expect(error).to.be.undefined
      expect(stdout).to.contain(`Result saved to: ${outputPath}`)
      expect(await readFile(outputPath, 'utf-8')).to.match(/<xs:schema\b/)
    })
  })
})
