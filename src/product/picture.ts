export class Picture {
  id: number;
  name: string;
  key: string;
  url: string;

  constructor(id: number, name: string, key: string, url: string = null) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.url = url;
  }
}
