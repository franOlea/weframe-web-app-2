export class Picture {
  name: string;
  key: string;
  url: string;

  constructor(name: string, key: string, url: string = null) {
    this.name = name;
    this.key = key;
    this.url = url;
  }
}
