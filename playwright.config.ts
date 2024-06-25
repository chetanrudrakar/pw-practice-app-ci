import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';
import { TestOptions } from './test-options';
import Chromedriver from 'appium-chromedriver';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  timeout : 120000,
  //globalTimeout : 60000,
  expect : {
  timeout : 5000,
  toMatchSnapshot : ({maxDiffPixels : 100})
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', {outputFile : 'test-results/jsonReport.json'}],
    ['junit',{outputFile : 'test-results/junitReport.xml'}],
    // ['allure-playwright'],
    ['html'],


  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'http://localhost:4200/',
     globalQaURL : 'https://www.globalsqa.com/demo-site/draganddrop/',
    //  baseURL : process.env.Dev=='1' ? 'http://localhost:4200/'
    //          : process.env.Staging =='1' ? 'http://localhost:4201/'
    //          : 'http://localhost:4202/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    navigationTimeout : 10000,
    video : 'off',
    
    
    //For high quality video
    // video : {
    //   mode : 'on',
    //   size : {width : 1920 , height : 1080}
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'QA',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4201/', 
      globalQaURL : 'https://www.globalsqa.com/demo-site/draganddrop/',
      channel: 'chrome' },
      
     
      // or 'chrome-beta'
    },
    {
      name : "runPageObjectProjectinFullScreen",
      testMatch : "usePageObjects.spec.ts",
      use : {
       viewport : {width : 1522,height:696},
       browserName : 'chromium',
        channel : 'chrome'
        // launchOptions: {
        //   args: ["--start-fullscreen"], 
        // }
      }
    },

    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // or 'chrome-beta'
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'mobile',
      testMatch :'mobileDevices.spec.ts',
      use: { ...devices['Moto G4'] },
    },

    
    
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  webServer : {
    command : 'npm run start',
    url : 'http://localhost:4200',
    reuseExistingServer : true,
    
  }
});
