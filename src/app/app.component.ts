import { Component, inject, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe],
  template: ` <div>message: {{ res | json }}</div> `,
})
export class AppComponent implements OnInit {
  res: any;
  #http = inject(HttpClient);

  ngOnInit() {
    this.#http.get<any>('http://localhost:4001/hello').subscribe((data) => {
      this.res = data;
    });
  }
}
