import { PLATFORM } from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";

export class App {

  private router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      { route: 'canvas', name: 'canvas', moduleId: PLATFORM.moduleName('canvas/canvas'), nav: false },
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('home') },
      { route: 'callback', name: 'callback', moduleId: PLATFORM.moduleName('api/login-callback'), nav: false },
      { route: 'image-upload', name: 'image-upload', moduleId: PLATFORM.moduleName('image/image-upload-form'), nav: false }
    ]);
    config.title = 'WeFrame';
    config.mapUnknownRoutes('api/login-callback');
  }

}
