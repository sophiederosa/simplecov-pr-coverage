import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

import { Constants } from './constants/Constants';
import { ResultSet } from './models/ResultSet';

const { exec } = require("child_process");

function parseResults(resultSetPath: string): ResultSet {
  const content = fs.readFileSync(path.resolve(Constants.workspace, resultSetPath))
  return JSON.parse(content.toString()) as ResultSet
}

async function run(): Promise<void> {
  try {
    exec("bin/rspec", (error: { message: any; }, stdout: any, stderr: any) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
