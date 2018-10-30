"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseEntity = /** @class */ (function () {
    function ResponseEntity(entity) {
        this.entity = entity;
    }
    return ResponseEntity;
}());
exports.ResponseEntity = ResponseEntity;
var PagedResponseEntity = /** @class */ (function () {
    function PagedResponseEntity(page, entity) {
        this.page = page;
        this.entity = entity;
    }
    return PagedResponseEntity;
}());
exports.PagedResponseEntity = PagedResponseEntity;
var Page = /** @class */ (function () {
    function Page(size, totalElements, totalPages, pageNumber) {
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.pageNumber = pageNumber;
    }
    return Page;
}());
exports.Page = Page;
