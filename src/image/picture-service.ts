import {inject} from 'aurelia-framework';
import {HttpService} from "../api/http/http-service";
import {Picture} from "../product/picture";
import {ApiParser} from "../api/api-service";

export class PictureParser implements ApiParser<Picture> {

  parseOne(response: any): Picture {
    return new Picture(
      response.id,
      response.name,
      response.key,
      response.url
    );
  }

  parseArray(array: any): Picture[] {
    console.error("Parse array not implemented for pictures!");
    return null;
  }
}

@inject(HttpService, PictureParser)
export class PictureService {

  constructor(private readonly httpService: HttpService,
              private readonly pictureParser: PictureParser){}

  upload(pictureFile: File): Promise<Picture> {
    let form = new FormData();
    form.append("file", pictureFile);
    let fileNameParts = pictureFile.name.split(".");
    form.append("name", fileNameParts[0]);
    form.append("formatName", fileNameParts[fileNameParts.length-1]);
    return this.uploadForm(form);
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpService.request("/pictures/" + id)
        .asDelete()
        .withTimeout(10000)
        .send()
        .then(success => {
          if (success.statusCode == 200) {
            resolve();
          } else {
            console.error(success);
            reject();
          }
        }, failure => {
          console.error(failure);
          reject();
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
          return this.pictureParser.parseOne(response);
        } else {
          throw new Error(`Invalid form response status [${success.statusCode}]`);
        }
      });
  }

}