import { 
  Component, 
  ViewChildren, 
  AfterViewInit, 
  QueryList, 
  ElementRef

} from '@angular/core';

import { COURSES } from '../db-data';
import { Course } from './model/course';

import { CourseCardComponent } from './course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private courses: Course[] = COURSES;

  private startDate = new Date();
  private price: number = 9.99;

  @ViewChildren(CourseCardComponent)
  private cards: QueryList<CourseCardComponent>;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  private cardsRef: QueryList<ElementRef>;

  onSelectedCourse(value: Course) {
    console.log(`AppComponent - Course: ${JSON.stringify(value, undefined, 2)}`);
  }

  ngAfterViewInit() {
    console.log(`====> ngAfterViewInit()`);
    console.log(`cards (CourseCardComponent): `, this.cards);
    console.log(`cardsRef: `, this.cardsRef);
    
    this.cards.changes.subscribe(set => {
      console.log(`cards.changes (CourseCardComponent): `, set);
    });

    this.cardsRef.changes.subscribe(set => {
      console.log(`cardsRef.changes: `, set);
    });

    console.log(`====> ngAfterViewInit()`);
  }

  protected onAddCourse() {
    this.courses.push({
      id: 11,
      description: "RxJs In Practice Course (Duplicate)",
      iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
      longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
      category: 'BEGINNER',
      lessonsCount: 10
    });
  }

}
