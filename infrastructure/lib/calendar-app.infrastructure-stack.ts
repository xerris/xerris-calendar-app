import * as cdk from "aws-cdk-lib";
import {
  aws_s3 as s3,
  aws_cloudfront as cloudFront,
  aws_s3_deployment as s3deploy,
  aws_iam as iam,
  RemovalPolicy,
} from "aws-cdk-lib";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { Configuration } from "./configuration";
import { CorsRule } from "aws-cdk-lib/aws-s3";

const ACCOLITE_RESOURCE_NAME = "acc-can-calendar-app";
const CORS_RULE: CorsRule = {
  allowedOrigins: ["*"],
  allowedMethods: [...Object.values(s3.HttpMethods)],
  allowedHeaders: ["*"],
};

export class CalendarAppInfrastructureStack extends cdk.Stack {
  config: Configuration;

  constructor(scope: Construct, id: string, config: Configuration) {
    super(scope, id, { env: config.env });
    this.config = config;

    const calendarAppBucket = new s3.Bucket(
      this,
      `${ACCOLITE_RESOURCE_NAME}-s3-bucket-${this.config.stageName}`,
      {
        versioned: true,
        bucketName: `${ACCOLITE_RESOURCE_NAME}-${this.config.stageName}`,
        publicReadAccess: false,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    calendarAppBucket.addCorsRule(CORS_RULE);

    const cloudFrontOAI = new cloudFront.OriginAccessIdentity(
      this,
      `${ACCOLITE_RESOURCE_NAME}-cloudfront-OAI-${this.config.stageName}`
    );

    calendarAppBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [calendarAppBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const calendarAppCDN = new cloudFront.Distribution(
      this,
      `${ACCOLITE_RESOURCE_NAME}-cf-distribution-${this.config.stageName}`,
      {
        defaultRootObject: "xerris-calendar-app.js",
        defaultBehavior: {
          origin: new S3Origin(calendarAppBucket, {
            // give cloudfront permission to access s3 bucket
            originAccessIdentity: cloudFrontOAI,
          }),
          viewerProtocolPolicy:
            cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          // configure to send CORS headers to S3: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html#header-caching-web-cors
          originRequestPolicy: cloudFront.OriginRequestPolicy.CORS_S3_ORIGIN,
        },
        comment: `${this.config.stageName}-acc-can-calendar - CloudFront Distribution`,
      }
    );

    new s3deploy.BucketDeployment(
      this,
      `${ACCOLITE_RESOURCE_NAME}-bucket-deployment-${this.config.stageName}`,
      {
        sources: [s3deploy.Source.asset("../dist")],
        destinationBucket: calendarAppBucket,
        distribution: calendarAppCDN,
        distributionPaths: ["/*"],
      }
    );

    new cdk.CfnOutput(this, "CloudFront URL", {
      value: calendarAppCDN.distributionDomainName,
    });
  }
}
