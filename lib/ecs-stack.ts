import * as cdk from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as path from 'path';

import { Construct } from 'constructs';

export class ECSFargateStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const vpc = new Vpc(this, "MyVPC", {
        maxAzs: 2,
        natGateways: 1,
      })

      const cluster = new ecs.Cluster(this, "MyCluster", {
        vpc: vpc
      })

      const backendService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "BackendService", {
        cluster: cluster,
        memoryLimitMiB: 1024,
        cpu: 512,
        desiredCount: 2,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, 'backendapi/')),
          environment: {
            myVar: "somevariable"
          }
        }
      });

      backendService.targetGroup.configureHealthCheck({path: "/health"})

      new cdk.CfnOutput(this, "albUrl", {
        value: backendService.loadBalancer.loadBalancerDnsName,
        exportName: "albUrl" 
      });
    }
}