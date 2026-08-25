import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TitleWrapperComponent } from './components/title-wrapper/title-wrapper.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GlobalMessagesComponent } from './components/global-messages/global-messages.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TitleWrapperComponent, NavigationComponent, RouterOutlet, GlobalMessagesComponent, RouterLink]
})
export class AppComponent {
}
