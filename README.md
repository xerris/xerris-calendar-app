# Getting Started with Create Single-SPA

This project was bootstrapped with [Create Single-SPA](https://single-spa.js.org/docs/create-single-spa/).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner.

### `yarn build`

Builds the app for production to the `build` folder.

# Architectural Overview

single-spa takes inspiration from modern framework component lifecycles by abstracting lifecycles for entire applications. Born out of Canopy's desire to use React + react-router instead of being forever stuck with our AngularJS + ui-router application, single-spa is now a mature library that enables frontend microservices architecture aka "microfrontends". Microfrontends enable many benefits such as independent deployments, migration and experimentation, and resilient applications.

## This is an application (calendar)

Applications which can be thought of as single-page applications packaged up into modules. Each application must know how to bootstrap, mount, and unmount itself from the DOM. The main difference between a traditional SPA and single-spa applications is that they must be able to coexist with other applications as they do not each have their own HTML page.

For example, your React or Angular SPAs are applications. When active, they can listen to url routing events and put content on the DOM. When inactive, they do not listen to url routing events and are totally removed from the DOM.

## Calendar

This application is responsible for the calendar UI.
