"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api_service_1 = require("./api-service");
var DeleteAbleApiService = /** @class */ (function (_super) {
    __extends(DeleteAbleApiService, _super);
    function DeleteAbleApiService(httpService, entityPath, timeout) {
        return _super.call(this, httpService, entityPath, timeout) || this;
    }
    DeleteAbleApiService.prototype.remove = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.request(_this.entityPath + "/" + id)
                .asDelete()
                .withTimeout(_this.timeout)
                .send()
                .then(function (success) {
                if (success.statusCode == 200) {
                    resolve();
                }
                else {
                    reject(success);
                }
            }, function (failure) {
                console.error(failure);
                reject(failure);
            });
        });
    };
    return DeleteAbleApiService;
}(api_service_1.ApiService));
exports.DeleteAbleApiService = DeleteAbleApiService;
