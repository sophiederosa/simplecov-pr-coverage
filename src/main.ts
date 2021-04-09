import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'
import {
  ResultSet
} from './models/ResultSet'

const WORKSPACE: string = process.env.GITHUB_WORKSPACE!

function parseResults(resultSetPath: string): ResultSet {
  const content = fs.readFileSync(path.resolve(WORKSPACE, resultSetPath))
  return JSON.parse(content.toString()) as ResultSet
}

async function run(): Promise<void> {
  try {
    core.debug(new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
