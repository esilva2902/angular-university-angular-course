import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Course } from '../model/course';

/**
 * There are two types of injecting services:
 *    (a). Via providers property @Component. Use this form of providing your services
 *         if your services guard variables states per components.
 * 
 *    (b). Via Tree-Shakeable providers. Use this way of providing your services if you need a 
 *         Singleton instance. It resolves in smaller application bundles and better
 *         runtime performance because if the app does not inject the services anywhere the app will not
 *         include in the final bundle.
 */


/**
 * When you add to your service class the @Injectable decorator
 * with providedIn: 'root' property is called Tree-Shakeable provider:
 * 
 * @Injectable({ providedIn: 'root' })
 * export class CourseService { ... }
 * 
 */

let courseNumberInstance = 0;

@Injectable()
export class CoursesService {

  private instance: number;

  constructor(
    private http: HttpClient) { 
      this.instance = courseNumberInstance++;

      console.log(`==> A new CoursesService instance was created (${this.instance})...`);
  }

  public get InstanceNumber(): number {
    return this.instance;
  }

  public loadCourses(): Observable<Course[]> {
    const params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '10');

    return this.http.get<Course[]>('http://localhost:9000/api/courses', { params } );
  }

  public saveCourse(course: Course) {
    const headers = new HttpHeaders()
      .set('X-Auth', 'userId');
    
    return this.http.put(`/api/courses/${course.id}`, course, { headers });
  }
}
