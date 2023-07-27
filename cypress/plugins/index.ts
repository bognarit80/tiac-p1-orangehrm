/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// TODO: using the cucumber preprocessor breaks importing ts files. This will prevent us from
// Accessing application code if we choose do to so in the future.

import webpack from '@cypress/webpack-preprocessor';
import realWebpack from 'webpack';

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): void => {
  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
          fallback: {
            assert: false,
            https: require.resolve('https-browserify'),
            http: require.resolve('stream-http'),
            net: false,
            tls: false,
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
          },
        },
        module: {
          rules: [
            {
              test: /cypress\/(.*)\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'ts-loader',
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config,
                },
              ],
            },
          ],
        },
        plugins: [
          // Work around for Buffer is undefined:
          // https://github.com/webpack/changelog-v5/issues/10
          new realWebpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
          new realWebpack.ProvidePlugin({
            process: 'process/browser',
          }),
        ],
      },
    })
  );

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      // fullPage screenshot size is 1920x1080 on non-retina screens
      launchOptions.args.push('--window-size=1920,1080');

      // force screen to be non-retina
      launchOptions.args.push('--force-device-scale-factor=1');

      // force screen to be retina
      // launchOptions.args.push('--force-device-scale-factor=2')

      launchOptions.args.push('--disable-dev-shm-usage');
    }
    return launchOptions;
  });
};