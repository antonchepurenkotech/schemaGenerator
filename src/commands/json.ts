import GenerateSchemaCommand from '../class/GenerateSchemaCommand.js'
import JsonProcessor from '../processors/jsonProcessor.js'

export default class Json extends GenerateSchemaCommand {
  static override description = 'Generate a JSON schema'

  static override examples = [
    '<%= config.bin %> json --file response.json',
    '<%= config.bin %> json --text \'{"name":"Ada"}\'',
  ]

  protected override readonly schemaType = 'json'

  protected createProcessor(): JsonProcessor {
    return new JsonProcessor()
  }
}