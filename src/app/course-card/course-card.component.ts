import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  AfterContentInit,
  ContentChild

} from '@angular/core';

import { Course } from '../model/course';

import { CourseCardImageComponent } from '../course-card-image/course-card-image.component';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit, AfterContentInit {

  @Input('course')
  course: Course;

  @Input('courseIndex')
  index: number;

  @Output('selectedCourse')
  courseEmmiter: EventEmitter<Course>;

  @ContentChild(CourseCardImageComponent)
  private image: CourseCardImageComponent;

  constructor() { 
    this.courseEmmiter = new EventEmitter<Course>();
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    console.log(`====> ngAfterContentInit()`);
    console.log(`Images (CourseCardImageComponent): `, this.image);

    console.log(`====> ngAfterContentInit()`);
  }

  onViewCourse() {
    console.log(`onViewCourse event...`);
    this.courseEmmiter.emit(this.course);
  }

  cardClasses() {
    return { 'beginner': this.course.category === 'BEGINNER' };

    // return this.course.category === 'BEGINNER' ? 'beginner' : '';

    // return this.course.category === 'BEGINNER' ? ['beginner'] : [];
  }

  titleStyle() {
    return {
      'color': 'red',
      'font-weight': 'bold'
    };
  }
}
