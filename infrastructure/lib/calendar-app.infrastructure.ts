#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CalendarAppInfrastructureStack } from "./calendar-app.infrastructure-stack";
import { configuration } from "./configuration";

const app = new cdk.App();

const buildEnv = app.node.tryGetContext("env").trim().toLowerCase();

new CalendarAppInfrastructureStack(
  app,
  `acc-can-calendar-app-${buildEnv}`,
  configuration[buildEnv]
);
