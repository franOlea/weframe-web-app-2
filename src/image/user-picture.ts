import {Picture} from "../product/picture";

export class UserPicture {
  id: number;
  picture: Picture;
  user: string;


  constructor(id: number, picture: Picture, user: string) {
    this.id = id;
    this.picture = picture;
    this.user = user;
  }

}