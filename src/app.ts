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
      { route: 'about-us', name: 'about-us', moduleId: PLATFORM.moduleName('about-us') },
      { route: 'callback', name: 'callback', moduleId: PLATFORM.moduleName('api/login-callback'), nav: false },
      { route: 'image-upload', name: 'image-upload', moduleId: PLATFORM.moduleName('image/user-picture-management'), nav: false },
      { route: 'user-purchase-list', name: 'user-purchase-list', moduleId: PLATFORM.moduleName('purchase/list/user-purchase-list'), nav: false },
      { route: 'admin-purchase-list', name: 'admin-purchase-list', moduleId: PLATFORM.moduleName('purchase/list/admin-purchase-list'), nav: false },
      { route: 'frame-admin-panel', name: 'frame-admin-panel', moduleId: PLATFORM.moduleName('product/frame/frame-admin-panel'), nav: false },
      { route: 'backboard-admin-panel', name: 'backboard-admin-panel', moduleId: PLATFORM.moduleName('product/backboard/backboard-admin-panel'), nav: false },
      { route: 'mat-type-admin-panel', name: 'mat-type-admin-panel', moduleId: PLATFORM.moduleName('product/mat-type/mat-type-admin-panel'), nav: false },
      { route: 'frame-glass-admin-panel', name: 'frame-glass-admin-panel', moduleId: PLATFORM.moduleName('product/frame-glass/frame-glass-admin-panel'), nav: false }
    ]);
    config.title = 'WeFrame';
    config.mapUnknownRoutes('api/login-callback');
  }

}
