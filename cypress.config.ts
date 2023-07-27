import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { defineConfig } from 'cypress';

const setupNodeEvents = async (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> => {
  await addCucumberPreprocessorPlugin(on, config);
  require('./cypress/plugins/index.ts').default(on, config);
  return config;
};

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 20000,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  waitForAnimations: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    specPattern: 'cypress/features/**/*.feature',
    setupNodeEvents,
    // specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'],
    // baseUrl: 'https://juice-shop.herokuapp.com/#/login/',
    // setupNodeEvents(on, config) {
    //   require('cypress-mochawesome-reporter/plugin')(on);
    // }
  },
})
