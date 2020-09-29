# fanuc-ui

![fanuc ui](./img/fanuc_ui.PNG)

_Screenshot of FANUC UI_

## Description

Electron application which uses a REST API to collect readings from a FANUC robot.


## Initializing Project

Due to Githubs 100MB size limit, the node_modules folder for this project has been ommitted.
As a result, it must be initialized with npm before use.

To initialize it using npm, run the following command:

```npm install --save-dev electron```

## Installing Dependencies

This project uses bootstrap, jquery, and poppers. Installing these dependencies requires the following commands:

```npm install bootstrap```

```npm install jquery```

```npm install @popperjs/core```

## Usage

This project is meant to be run with node.js using ```npm install``` then ```npm start``` in package directory

## API Structure

```/validatelotnum?lot_num="{lot_num}"``` Post: Check if a lot number is valid. Valid lot numbers are integers greater than zero and correspond to the FANUCs database.

```/startjob?lot_num=1&job_str="{lot_num}"``` Post: Start a job. Pass this request a string of lot numbers separated by commas.

```/getstate``` Get: Receive a JSON with state and data. System has 3 states - Waiting, running, and complete. The data portion of the response contains the readings.

```/resetresults``` Get: Resets the saved readings.

```/abortjob``` Get: Ends a job early.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a532935c49c0154e6b0b)
