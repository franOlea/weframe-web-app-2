import {inject} from 'aurelia-framework';
import {HttpService} from "../api/http/http-service";
import {Picture} from "../product/picture";
import {UserPicture} from "./user-picture";
import {Page, PagedResponseEntity} from "../api/response/response-entity";
import {ApiParser} from "../api/api-service";

export class UserPictureParser implements ApiParser<UserPicture> {

  parseOne(response: any): UserPicture {
    return new UserPicture(
      response.id,
      this.parsePicture(response.picture),
      response.user
    );
  }

  parseArray(array: {_embedded: {userPictures: object[]}}): UserPicture[] {
    return array._embedded.userPictures
      .map(object => this.parseOne(object));
  }

  parsePicture(response: any): Picture {
    return new Picture(
      response.id,
      response.name,
      response.key,
      response.url
    );
  }

}

@inject(HttpService, UserPictureParser)
export class UserPictureService {

  constructor(private readonly httpService: HttpService,
              private readonly userPictureParser: UserPictureParser){}

  get(page: number = 0, size: number = 10) : Promise<PagedResponseEntity<UserPicture[]>> {
    return new Promise((resolve, reject) => {
      this.httpService.request("/user-pictures")
        .asGet()
        .withTimeout(3000)
        .withParams({page: page, size: size})
        .send()
        .then(success => {
          if (success.statusCode == 200) {
            let response = JSON.parse(success.response);
            let entities = this.userPictureParser.parseArray(response);
            let page = this.parsePage(response);
            resolve(new PagedResponseEntity(page, entities));
          } else {
            console.error(success);
            reject(success);
          }
        }, failure => {
          console.error(failure);
          reject(failure);
        });
    });
  }

  upload(pictureFile: File): Promise<UserPicture> {
    let form = new FormData();
    form.append("file", pictureFile);
    let fileNameParts = pictureFile.name.split(".");
    form.append("name", fileNameParts[0]);
    form.append("formatName", fileNameParts[fileNameParts.length-1]);
    return this.uploadForm(form).then(picture => {
      console.log(picture);
      return this.httpService.request("/user-pictures")
          .asPost()
          .withContent(picture)
          .send()
          .then(success => {
            console.log(success);
            if(success.statusCode == 201 || success.statusCode == 200) {
              let response = JSON.parse(success.response);
              return this.userPictureParser.parseOne(response);
            } else {
              throw new Error(`Invalid user picture response status [${success.statusCode}]`);
            }
          });
    });
  }

  private uploadForm(form: FormData): Promise<Picture> {
    return this.httpService.request("/pictures")
      .asPost()
      .withContent(form)
      .send()
      .then(success => {
        if (success.statusCode == 201 || success.statusCode == 200) {
          let response = JSON.parse(success.response);
          return this.userPictureParser.parsePicture(response);
        } else {
          throw new Error(`Invalid form response status [${success.statusCode}]`);
        }
      });
  }

  private parsePage(response: any) {
    return new Page(
      response.page.size,
      response.page.totalElements,
      response.page.totalPages,
      response.page.number);
  }

}