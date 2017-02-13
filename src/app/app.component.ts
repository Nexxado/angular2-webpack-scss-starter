/**
 * Created by ndrai on 13/02/2017.
 */
import { Component } from '@angular/core';

require('../sass/styles.scss');

@Component({
    selector: 'app-root',
    template: '<b class="test">Bootstrapping an Angular Application</b>',
    // styles: [ require('./app.component.scss') ],
    styleUrls: ['./app.component.scss']
})
export class AppComponent { }
