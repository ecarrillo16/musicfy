import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../global';

@Injectable()
export class UploadService {

  public url: string;

  constructor (private _http: Http) {
    this.url = GLOBAL.url;
  }

  /**
   * makeFileRequest
   */
  public makeFileRequest (url: string, params: Array<string>, files: Array<File>, token: string, name: string) {

    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[ i ], files[ i ].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}
