/* eslint-disable tsdoc/syntax,
                  @typescript-eslint/no-var-requires,
                  @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-member-access */

/**
 * Generate Typescript definition from weather.gov OpenAPI schema
 */

/* eslint-disable import/no-extraneous-dependencies */
const { default: dtsgenerator, readSchemaFromUrl } = require('dtsgenerator');
const fs = require('fs');
const path = require('path');
const {EOL} = require('os');

// ########################################################################

const OPENAPI_YAML = 'https://raw.githubusercontent.com/weather-gov/api/master/assets/openapi.yaml';
const DTS_OUTFILE = path.resolve(__dirname, '../src/types/nws.d.ts');

// ########################################################################

/**
 * Throw error
 *
 * @param {string} err Error string
 */
function throwError(err) {
  throw new Error(err);
}

/**
 * Write d.ts file
 *
 * @param {string} content type def
 */
function writeDTS(content) {
  content = '/* eslint-disable */' + EOL + content;

  fs.writeFileSync(DTS_OUTFILE, content);
}

/**
 * Convert schema to d.ts syntax
 *
 * @param {object} data Parsed schema JSON
 */
function schemaToDTS(data) {
  dtsgenerator({ contents: [data] })
    .then(writeDTS)
    .catch(throwError);
}

readSchemaFromUrl(OPENAPI_YAML)
  .then(schemaToDTS)
  .catch(throwError);
