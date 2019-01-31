import { PLATFORM } from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";

export class App {

  private router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      { route: 'purchase-menu', name: 'purchase-menu', moduleId: PLATFORM.moduleName('canvas/purchase-menu'), nav: false },
      { route: 'purchase-success', name: 'purchase-success', moduleId: PLATFORM.moduleName('purchase/purchase-success'), nav: false },
      { route: 'purchase-failure', name: 'purchase-failure', moduleId: PLATFORM.moduleName('purchase/purchase-failure'), nav: false },
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('home') },
      { route: 'callback', name: 'callback', moduleId: PLATFORM.moduleName('api/login-callback'), nav: false },
      { route: 'image-upload', name: 'image-upload', moduleId: PLATFORM.moduleName('image/image-upload-form'), nav: false },
      { route: 'user-purchase-list', name: 'user-purchase-list', moduleId: PLATFORM.moduleName('purchase/list/user-purchase-list'), nav: false }
    ]);
    config.title = 'WeFrame';
    config.mapUnknownRoutes('api/login-callback');
  }

}
