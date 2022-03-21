import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipelineSource, ShellStep, CodePipeline as codepipeline, ManualApprovalStep } from 'aws-cdk-lib/pipelines';

import { Construct } from 'constructs';
import { MyPipelineCustomStage, MyPipelineECSStage } from './stage';

export class FarmHarvestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new codepipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('RoshyPlaha/farm-harvest', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });
    
    const testingStage = pipeline.addStage(new MyPipelineCustomStage(this, 'InEnvironment'));
    const ecsStage = pipeline.addStage(new MyPipelineECSStage(this, 'ECSEnvironment'));


  }

}
