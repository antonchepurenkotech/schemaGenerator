import { XMLParser } from 'fast-xml-parser'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { xml2xsd } = require('xsdlibrary') as {
  xml2xsd: (xmlString: string) => string
}

export default class XmlProcessor {
  public isValid(xml: string): boolean {
    try {
      const parser = new XMLParser()
      parser.parse(xml)
      return true
    } catch {
      return false
    }
  }

  public async generateSchema(xmlText: string): Promise<string> {
    try {
      return xml2xsd(xmlText)
    } catch {
      throw new Error('Failed to generate XML schema')
    }
  }
}