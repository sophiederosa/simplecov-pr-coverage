import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';
import { context, getOctokit } from '@actions/github';

import { Constants } from './constants/Constants';
import { Files } from './models/Files';
import { ResultSet } from './models/ResultSet';

const { exec } = require("child_process");

function parseResults(resultSetPath: string): ResultSet {
  const content = fs.readFileSync(path.resolve(Constants.workspace, resultSetPath))
  return JSON.parse(content.toString()) as ResultSet
}

function getFiles(prNumber: number): Promise<Files> {
  const token = core.getInput('token');
  const octokit = getOctokit(token);
  
  let response = octokit.rest.pulls.listFiles({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: prNumber
  });

  return response
}

async function fetchPullRequest(): Promise<{ number: number; changed_files: number } | undefined> {
  const token = core.getInput('token');
  const octokit = getOctokit(token);

  return context.payload.pull_request
        ? {
              number: context.payload.pull_request.number,
              changed_files: context.payload.pull_request["changed_files"],
          }
        : undefined
}

async function run(): Promise<void> {
  try {
    const pr = await fetchPullRequest()

    if (!pr) {
      core.setFailed(`Could not get pull request from context, exiting`)
      return
    }

    const files = await getFiles(pr.number)
    console.log(files)

    exec("rspec", (error: { message: any; }, stdout: any, stderr: any) => {
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
