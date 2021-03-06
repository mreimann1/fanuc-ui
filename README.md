# fanuc-ui

![fanuc ui](./img/fanuc_ui.png)

_Screenshot of the FANUC UI welcome page_

## Description

Electron application which uses a REST API to collect readings from a FANUC robot at [NextFlex](https://www.nextflex.us/).\
To learn more about Electron applications, [Click Here.](https://www.electronjs.org/)

## Initializing Project

Due to Githubs 100MB size limit, the node_modules folder for this project has been ommitted.
As a result, it must be initialized with npm before use.

To initialize it using npm, run the following command:

`npm install --save-dev electron`

## Installing Dependencies

This project uses [bootstrap](https://getbootstrap.com/), [jquery](https://jquery.com/), and [popper.js](https://popper.js.org/). Installing these dependencies requires the following commands:

`npm install bootstrap`

`npm install jquery`

`npm install @popperjs/core`

## Usage

This project is meant to be run with node.js using `npm install` then `npm start` in package directory

## API Structure

`/validatelotnum?lot_num="{lot_num}"` \
**POST**: Check if a lot number is valid. Valid lot numbers are integers greater than zero and correspond to the FANUCs database.

`/startjob?lot_num=1&job_str="{lot_num}"` \
**POST**: Start a job. Pass this request a string of lot numbers separated by commas.

`/getstate` \
**GET**: Receive a JSON with state and data. System has 3 states - Waiting, running, and complete. The data portion of the response contains the readings.

`/resetresults` \
**GET**: Resets the saved readings.

`/abortjob` \
**GET**: Ends a job early.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a532935c49c0154e6b0b)
