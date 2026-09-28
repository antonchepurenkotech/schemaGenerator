import { Args, Command, Flags } from '@oclif/core'
import { ux } from '@oclif/core'
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core';
import { XMLParser } from 'fast-xml-parser';
import { xml2xsd } from "xsdlibrary";
import fs from 'node:fs/promises';
import path from 'node:path'

export default class GenerateSchema extends Command {

  static override args = {
    file: Args.string({ description: 'file to read' }),
  }

  static override description = 'Generate XML or JSON schema'

  static override examples = [
    '<%= config.bin %> generateSchema --file response.json --type json',
    '<%= config.bin %> generateSchema --file response.xml --type xml',
    '<%= config.bin %> generateSchema --text {jsonRequest} --type json',
  ];

  static override flags = {
    file: Flags.string({
      description: 'Path to input file',
      exclusive: ['text'],
    }),

    text: Flags.string({
      description: 'Input text',
      exclusive: ['file'],
    }),

    type: Flags.string({
      options: ['json', 'xml'],
      required: true,
      description: 'Output format',
    }),

    out: Flags.string({
      char: 'o',
      description: 'Output file',
    }),
  }

  private isValidJson(text: string): boolean {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }

  private isValidXml(xml: string): boolean {
    try {
      const parser = new XMLParser();
      parser.parse(xml);
      return true;
    } catch {
      return false;
    }
  }

  private async generateXMLSchema(xmlText: string): Promise<string> {
    try {
      return xml2xsd(xmlText);
    } catch {
      throw new Error(`Failed to generate JSON schema`);
    }
  }

  private async generateJsonSchema(jsonText: string): Promise<string> {
    try {
      const jsonInput = jsonInputForTargetLanguage('schema');

      await jsonInput.addSource({
        name: 'Response',
        samples: [jsonText],
      });

      const inputData = new InputData();
      inputData.addInput(jsonInput);

      const result = await quicktype({
        inputData,
        lang: 'schema',
      });

      return result.lines.join('\n');
    } catch {
      throw new Error(`Failed to generate JSON schema`);
    }
  }

  private async readFile(inputPath: string): Promise<string> {
    try {
      return await fs.readFile(inputPath, 'utf-8');
    } catch {
      throw new Error(`Unable to read file: ${inputPath}`);
    }
  }

  private async writeToFile(outputPath: string, content: string): Promise<void> {
    try {
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(
        outputPath,
        content,
        'utf-8',
      );
    } catch {
      throw new Error(`Unable to save to file: ${outputPath}`);
    }
  }

  public async run(): Promise<void> {

    ux.action.start('Processing')

    try {

      const { flags } = await this.parse(GenerateSchema)

      let content: string = '';
      const type: string = flags.type.trim().toLowerCase();

      if (flags.file) {
        content = await this.readFile(flags.file);
      } else if (flags.text) {
        content = flags.text;
      } else {
        this.error('Either --file or --text must be provided');
      }

      if (type == "json" && !this.isValidJson(content)) this.error('Valid JSON must be provided');
      if (type == "xml" && !this.isValidXml(content)) this.error('Valid XML must be provided');

      if (type == "xml") {
        content = await this.generateXMLSchema(content);
      } else {
        content = await this.generateJsonSchema(content);
      }

      let outputPath: string = '';

      if (!flags.out) {
        outputPath = 'output/result.' + type;
      } else {
        outputPath = path.resolve(flags.out);
      }

      await this.writeToFile(outputPath, content);

      this.log(`Result saved to: ${outputPath}`);

    } catch (error) {
      if (error instanceof Error) {
        this.error(error.message);
      }

      this.error('Unexpected error occurred');
    } finally {
      ux.action.stop('Finished');
    }

  }
}
