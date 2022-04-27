// ./lib/rds-stack.ts
import { Duration, Stack, StackProps } from "@aws-cdk/core";
import {
  DatabaseInstance,
  DatabaseInstanceEngine,
  StorageType,
  PostgresEngineVersion,
  Credentials
} from "@aws-cdk/aws-rds";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType,
  Vpc
} from "@aws-cdk/aws-ec2";
import * as cdk from "@aws-cdk/core";

export interface RDSStackProps extends StackProps {
  vpc: Vpc;
}

export class RDSStack extends Stack {
  readonly postgreSQLInstance: DatabaseInstance;
  readonly creds: Credentials;

  constructor(scope: Stack, id: string, props: RDSStackProps) {
    super(scope, id, props);

    this.creds = Credentials.fromGeneratedSecret("shibby");

    // Place your resource definitions here
    this.postgreSQLInstance = new DatabaseInstance(this, "Instance", {
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_12_5
      }),
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE2,
        InstanceSize.MICRO
      ),
      credentials: this.creds,
      port: 5432,
      storageType: StorageType.GP2,
      allocatedStorage: 20,
      multiAz: false,
      vpc: props.vpc,
      vpcPlacement: { subnetType: SubnetType.ISOLATED },
      backupRetention: Duration.days(0)
    });
  }
}
