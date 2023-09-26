import * as cdk from "aws-cdk-lib";
import {
  aws_s3 as s3,
  aws_cloudfront as cloudFront,
  aws_s3_deployment as s3deploy,
  aws_certificatemanager as acm,
} from "aws-cdk-lib";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { Configuration } from "./configuration";

const ACCOLITE_RESOURCE_NAME = "acc-can-calendar-app";

export class CalendarAppInfrastructureStack extends cdk.Stack {
  config: Configuration;

  constructor(scope: Construct, id: string, config: Configuration) {
    super(scope, id, { env: config.env });
    this.config = config;

    // make s3 bucket
    const s3Site = new s3.Bucket(
      this,
      `${ACCOLITE_RESOURCE_NAME}-s3site-${this.config.stageName}`,
      {
        bucketName: `${ACCOLITE_RESOURCE_NAME}-${this.config.stageName}`,
        publicReadAccess: true,
        websiteIndexDocument: "xerris-calendar-app.js",
        websiteErrorDocument: "xerris-calendar-app.js",
      }
    );

    // NOTE: Commented out till we get a domain
    // const certificate = acm.Certificate.fromCertificateArn(
    //   this,
    //   "Certificate",
    //   this.config.certificateArn
    // );

    const distribution = new cloudFront.Distribution(
      this,
      `${ACCOLITE_RESOURCE_NAME}-cf-distribution-${this.config.stageName}`,
      {
        defaultBehavior: {
          origin: new S3Origin(s3Site),
          viewerProtocolPolicy:
            cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        // NOTE: Commented out till we add a domain
        // certificate: certificate,
        comment: `${this.config.stageName}-acc-can-calendar - CloudFront Distribution`,
      }
    );

    // Setup Bucket Deployment to automatically deploy new assets and invalidate cache
    new s3deploy.BucketDeployment(
      this,
      `${ACCOLITE_RESOURCE_NAME}-bucket-deployment-${this.config.stageName}`,
      {
        sources: [s3deploy.Source.asset("../dist")],
        destinationBucket: s3Site,
        distribution: distribution,
        distributionPaths: ["/*"],
      }
    );

    // Final CloudFront URL
    new cdk.CfnOutput(this, "CloudFront URL", {
      value: distribution.distributionDomainName,
    });
  }
}