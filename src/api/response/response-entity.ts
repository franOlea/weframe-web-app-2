export class ResponseEntity<T> {

  entity : T;

  constructor(entity: T) {
    this.entity = entity;
  }

}

export class PagedResponseEntity<T> {

  page : Page;
  entity : T;


  constructor(page: Page, entity: T) {
    this.page = page;
    this.entity = entity;
  }

}

export class Page {

  size : number;
  totalElements : number;
  totalPages : number;
  pageNumber : number;


  constructor(size: number, totalElements: number, totalPages: number, pageNumber: number) {
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.pageNumber = pageNumber;
  }

}
