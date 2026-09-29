import GenerateSchemaCommand from '../class/GenerateSchemaCommand.js'
import XmlProcessor from '../processors/xmlProcessor.js'

export default class Xml extends GenerateSchemaCommand {
  static override description = 'Generate an XML schema'

  static override examples = [
    '<%= config.bin %> xml --file response.xml',
    '<%= config.bin %> xml --text \'<root><name>Ada</name></root>\'',
  ]

  protected override readonly schemaType = 'xml'

  protected createProcessor(): XmlProcessor {
    return new XmlProcessor()
  }
}