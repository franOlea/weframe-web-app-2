import { PLATFORM } from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";

export class App {

  private router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {

    this.router = router;
    config.map([
      { route: 'canvas', name: 'canvas', moduleId: PLATFORM.moduleName('canvas/canvas'), nav: false },
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('home') },
      { route: 'callback', name: 'callback', moduleId: PLATFORM.moduleName('api/login-callback'), nav: false }
    ]);
    config.title = 'WeFrame';
  }

}
