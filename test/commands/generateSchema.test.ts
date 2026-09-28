import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('generateSchema', () => {
  it('runs generateSchema cmd', async () => {
    const {stdout} = await runCommand('generateSchema')
    expect(stdout).to.contain('hello world')
  })

  it('runs generateSchema --name oclif', async () => {
    const {stdout} = await runCommand('generateSchema --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
