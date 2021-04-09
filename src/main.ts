import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

import { Constants } from './constants/Constants';
import { ResultSet } from './models/ResultSet';

function parseResults(resultSetPath: string): ResultSet {
  const content = fs.readFileSync(path.resolve(Constants.workspace, resultSetPath))
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
