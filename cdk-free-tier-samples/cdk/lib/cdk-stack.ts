import * as cdk from "@aws-cdk/core";
import * as apigw from "@aws-cdk/aws-apigateway";
import { VpcStack } from "../lib/vpc-stack";
import { RDSStack } from "../lib/rds-stack";
import { LambdaStack } from "../lib/lambda-stack";
import { DatabaseSecret } from "@aws-cdk/aws-rds";
export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpcStackEntity = new VpcStack(this, "VpcStack");

    const rdsStack = new RDSStack(this, "RDSStack", {
      vpc: vpcStackEntity.vpc
    });

    // TODO - Export the secret identifier so it can be used here
    const rdsPassword = DatabaseSecret.fromSecretNameV2(
      this,
      "SecretFromName",
      `CdkStackRDSStackInstanceSec-nHYTrFwUv9w8`
    );

    const lambdaStack = new LambdaStack(this, "LambdaStack", {
      vpc: vpcStackEntity.vpc,
      outboundDbAccessSecurityGroup:
        vpcStackEntity.dbAccessSecurityGroup.securityGroupId,
      rdsEndpoint: rdsStack.postgreSQLInstance.dbInstanceEndpointAddress,
      rdsDbUser: rdsStack.creds.username?.toString(),
      rdsDb: "postgres",
      rdsPort: rdsStack.postgreSQLInstance.dbInstanceEndpointPort,
      rdsPassword: rdsPassword.secretValueFromJson("password").toString()
    });

    const api = new apigw.LambdaRestApi(this, "SeedDatabaseApiGateway", {
      handler: lambdaStack.seedDatabaseLambda,
      proxy: false,
      deployOptions: {
        dataTraceEnabled: true,
        tracingEnabled: true
      }
    });

    api.root.addResource("operations").addMethod(
      "POST",
      new apigw.LambdaIntegration(lambdaStack.seedDatabaseLambda, {
        proxy: true
      })
    );
  }
}
