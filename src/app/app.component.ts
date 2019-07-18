import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Root componennt for angular app
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  /**
   * title of the app printend in template
   */
  public title = 'cobalt';
}
