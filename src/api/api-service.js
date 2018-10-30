"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response_entity_1 = require("./response/response-entity");
var ApiService = /** @class */ (function () {
    function ApiService(httpService, entityPath, timeout) {
        this.httpService = httpService;
        this.entityPath = entityPath;
        this.timeout = timeout;
    }
    ApiService.prototype.get = function (page, size) {
        var _this = this;
        if (page === void 0) { page = 0; }
        if (size === void 0) { size = 10; }
        return new Promise(function (resolve, reject) {
            _this.httpService.request(_this.entityPath)
                .asGet()
                .withTimeout(_this.timeout)
                .withParams({ page: page, size: size })
                .send()
                .then(function (success) {
                if (success.statusCode == 200) {
                    var response = JSON.parse(success.response);
                    var entities = _this.parseArray(response);
                    var page_1 = _this.parsePage(response);
                    resolve(new response_entity_1.PagedResponseEntity(page_1, entities));
                }
                else {
                    console.error(success);
                    reject(success);
                }
            }, function (failure) {
                console.error(failure);
                reject(failure);
            });
        });
    };
    ApiService.prototype.getById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.request(_this.entityPath + "/" + id)
                .asGet()
                .withTimeout(_this.timeout)
                .send()
                .then(function (success) {
                if (success.statusCode == 200) {
                    resolve(_this.parseOne(JSON.parse(success.response)));
                }
                else {
                    console.error(success);
                    reject(success);
                }
            }, function (failure) {
                console.error(failure);
                reject(failure);
            });
        });
    };
    ApiService.prototype.post = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.request("" + _this.entityPath)
                .asPost()
                .withTimeout(_this.timeout)
                .withContent(entity)
                .send()
                .then(function (success) {
                if (success.statusCode == 200) {
                    resolve();
                }
                else {
                    console.error(success);
                    reject(success);
                }
            }, function (failure) {
                console.error(failure);
                reject(failure);
            });
        });
    };
    ApiService.prototype.parsePage = function (response) {
        return new response_entity_1.Page(response.page.size, response.page.totalElements, response.page.totalPages, response.page.number);
    };
    return ApiService;
}());
exports.ApiService = ApiService;
