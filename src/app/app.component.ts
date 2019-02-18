import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, InjectionToken, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { COURSES } from '../db-data';
import { Course } from './model/course';
import { CoursesService } from './services/courses.service';

import { CourseCardComponent } from './course-card/course-card.component';
import { HighlightedDirective } from './directives/highlighted.directive';

import { CONFIG_TOKEN, APP_CONFIG } from './config';

/**
 * 1. Define a factory fuction which is going to create the 
 *    needed instance. If the desirable instance has 
 *    dependencies they must be provided by deps property
 *    in the configuration object passed to the providers array.
 */
function coursesServiceProvider(http: HttpClient): CoursesService {
  return new CoursesService(http);
}

/**
 * 2. Every dependency has it own unique identifier called 
 *    Injection Token. Define it in order to identify our CoursesService 
 *    service class.
 */
const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /**
   * 3. Once we have our function and our Injection Token we have to pass them as a provider 
   *    but we need a configuration object to wrap them.
   * 
   * 4. Remeber to pass the dependencies our service has in deps property.
   * 
   * ===> IMPORTANT: Angular uses the class name itself to identify it as a provider. Therefore,
   *                 the class name is used as the Injection Token. That is the reason that
   *                 we can provide a service like this:
   * 
   *                    providers: [
   *                      CoursesService 
   *                    ]
   */
  providers: [
    { 
      provide: COURSES_SERVICE, 
      useFactory: coursesServiceProvider,
      deps: [HttpClient]
    },
    {
      provide: CONFIG_TOKEN,
      useFactory: () => APP_CONFIG
    }
  ]
})
export class AppComponent implements OnInit {

  private courses$: Observable<Course[]>;

  /**
   * 5. When a component claims for the instance we have to tell Angular
   *    how to ask for it. In order to do that ask for the instance in 
   *    a proper way so we have to decorate the instance with
   *    @Inject(COURSES_SERVICE)
   */
  constructor(
    @Inject(COURSES_SERVICE) private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private appConfig) {

      console.log(`APP_CONFIG: `, appConfig);
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourse(course)
      .subscribe((c) => {
        console.log(`Course saved: ${JSON.stringify(c, undefined, 2)}`);
      });
  }

}
