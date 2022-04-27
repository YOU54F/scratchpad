// ./lib/lambda-stack.ts
import { Duration, Stack, StackProps } from "@aws-cdk/core";
import { Vpc, SubnetType, SecurityGroup } from "@aws-cdk/aws-ec2";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as lambdaNode from "@aws-cdk/aws-lambda-nodejs";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

export interface LambdaStackProps extends StackProps {
  vpc: Vpc;
  inboundDbAccessSecurityGroup?: string;
  outboundDbAccessSecurityGroup?: string;
  rdsEndpoint?: string | undefined;
  rdsDbUser?: string | undefined;
  rdsDb?: string | undefined;
  rdsPort?: string | undefined;
  rdsPassword?: string | undefined;
}

export class LambdaStack extends Stack {
  readonly seedDatabaseLambda: NodejsFunction;

  constructor(scope: Stack, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const securityGroups = [];

    const inboundDbAccessSecurityGroup = props.inboundDbAccessSecurityGroup
      ? SecurityGroup.fromSecurityGroupId(
          scope,
          "inboundDbAccessSecurityGroup" + id,
          props.inboundDbAccessSecurityGroup
        )
      : undefined;

    const outboundDbAccessSecurityGroup = props.outboundDbAccessSecurityGroup
      ? SecurityGroup.fromSecurityGroupId(
          scope,
          "outboundDbAccessSecurityGroup" + id,
          props.outboundDbAccessSecurityGroup
        )
      : undefined;

    if (inboundDbAccessSecurityGroup) {
      securityGroups.push(inboundDbAccessSecurityGroup);
    }
    if (outboundDbAccessSecurityGroup) {
      securityGroups.push(outboundDbAccessSecurityGroup);
    }

    // Place your resource definitions here
    this.seedDatabaseLambda = new lambdaNode.NodejsFunction(
      this,
      "seedDatabase",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        entry: path.join(
          __dirname,
          "../../services/src/handlers/index/index.ts"
        ),
        bundling: {
          externalModules: ["pg-native"],
          loader: { ".sql": "file" }
        },
        handler: "seedDatabase",
        memorySize: 512,
        description: `Build time: ${new Date().toISOString()}`,
        tracing: lambda.Tracing.ACTIVE,
        timeout: Duration.seconds(15),
        vpc: props.vpc,
        vpcSubnets: { subnetType: SubnetType.ISOLATED },
        securityGroups: securityGroups,
        environment: {
          PGUSER: props.rdsDbUser ?? "",
          PGHOST: props.rdsEndpoint ?? "",
          PGDATABASE: props.rdsDb ?? "",
          PGPORT: props.rdsPort ?? "",
          PGPASSWORD: props.rdsPassword ?? ""
        }
      }
    );
  }
}
