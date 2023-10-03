import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';

  showHeaderAndFooter = true;

  toggleHeaderAndFooter(value: boolean) {
    this.showHeaderAndFooter = value;
  }
  
}
