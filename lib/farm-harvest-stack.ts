import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipelineSource, ShellStep, CodePipeline as codepipeline } from 'aws-cdk-lib/pipelines';

import { Construct } from 'constructs';

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
    })
  }
}
