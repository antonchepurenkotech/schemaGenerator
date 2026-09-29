import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core'

export default class JsonProcessor {
  public isValid(text: string): boolean {
    try {
      JSON.parse(text)
      return true
    } catch {
      return false
    }
  }

  public async generateSchema(jsonText: string): Promise<string> {
    try {
      const jsonInput = jsonInputForTargetLanguage('schema')

      await jsonInput.addSource({
        name: 'Response',
        samples: [jsonText],
      })

      const inputData = new InputData()
      inputData.addInput(jsonInput)

      const result = await quicktype({
        inputData,
        lang: 'schema',
      })

      return result.lines.join('\n')
    } catch {
      throw new Error('Failed to generate JSON schema')
    }
  }
}