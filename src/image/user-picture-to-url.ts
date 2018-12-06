import {UserPicture} from "./user-picture";

export class UserPictureToUrlValueConverter {
  toView(userPicture: UserPicture) {
    return userPicture.picture.url;
  }
}