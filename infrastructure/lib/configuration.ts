import { Environment } from "aws-cdk-lib";

export interface Configuration {
  readonly stageName: string;
  readonly certificateArn?: string;
  readonly env: Environment;
}

// NOTE THIS IS NOT USED RIGHT NOW
const commonConfig = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

export const configuration: { [key: string]: Configuration } = {
  ["production"]: {
    ...commonConfig,
    stageName: "production",
  },
};
