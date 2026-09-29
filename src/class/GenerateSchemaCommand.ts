import { Command, Flags, ux } from '@oclif/core'
import { readInput, writeOutput } from '../helpers/commandIO.js'

type SchemaType = 'json' | 'xml'

interface SchemaProcessor {
  isValid(content: string): boolean
  generateSchema(content: string): Promise<string>
}

export default abstract class GenerateSchemaCommand extends Command {
  static override flags = {
    file: Flags.string({
      description: 'Path to input file',
      exclusive: ['text'],
    }),
    text: Flags.string({
      description: 'Input text',
      exclusive: ['file'],
    }),
    out: Flags.string({
      char: 'o',
      description: 'Output file',
    }),
  }

  protected abstract readonly schemaType: SchemaType

  protected abstract createProcessor(): SchemaProcessor

  public async run(): Promise<void> {
    ux.action.start('Processing')

    try {
      const { flags } = await this.parse(this.ctor)
      const content = await readInput(flags.file, flags.text)
      const processor = this.createProcessor()

      if (!processor.isValid(content)) {
        this.error(`Valid ${this.schemaType.toUpperCase()} must be provided`)
      }

      const schema = await processor.generateSchema(content)
      const outputPath = await writeOutput(flags.out, this.schemaType, schema)
      this.log(`Result saved to: ${outputPath}`)
    } catch (error) {
      this.error(error instanceof Error ? error.message : 'Unexpected error occurred')
    } finally {
      ux.action.stop('Finished')
    }
  }
}