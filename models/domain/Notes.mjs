const _id = Symbol("id");
const _header = Symbol("header");
const _content = Symbol("content");

export class Note {
  constructor(id, header, content) {
    this[_id] = id;
    this[_header] = header;
    this[_content] = content;
  }

  get id() {
    return this[_id];
  }

  get header() {
    this[_header];
  }

  get content() {
    this[_content];
  }

  set header(header) {
    this[_header] = header;
  }

  set content(content) {
    this[_content] = content;
  }
}

