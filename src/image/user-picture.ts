import {Picture} from "../product/picture";

export class UserPicture {
  picture: Picture;
  user: string;


  constructor(picture: Picture, user: string) {
    this.picture = picture;
    this.user = user;
  }

}