// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
 * As of Angular 22 the TestBed defaults to zoneless change detection, while the
 * application still bootstraps with provideZoneChangeDetection(). Match the
 * application so specs exercise the same change detection behaviour.
 */
@NgModule({ providers: [provideZoneChangeDetection()] })
export class ZoneChangeDetectionTestModule { }

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ZoneChangeDetectionTestModule],
  platformBrowserDynamicTesting(),
);
