import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { MyLambdaStack } from './lambda-stack';
import { ECSFargateStack } from './ecs-stack';

export class MyPipelineCustomStage extends cdk.Stage {
    
    constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
      super(scope, stageName, props);
  
       new MyLambdaStack(this, 'LambdaStack', stageName);      
    }
}

export class MyPipelineECSStage extends cdk.Stage {
    
    constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
      super(scope, stageName, props);
  
       new ECSFargateStack(this, 'ECSFargateStack', stageName);      
    }
}