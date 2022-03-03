import * as cdk from 'aws-cdk-lib';

import { Stack, StackProps } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { CodePipeline as codepipeline } from 'aws-cdk-lib/pipelines';
import { CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

import { Construct } from 'constructs';
import { stringify } from 'querystring';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FarmHarvestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new codepipeline(this, 'MyFirstPipeline', {
      pipelineName: 'MyFirstPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('RoshyPlaha/farm-harvest', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    }
  }
}
