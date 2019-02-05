import {
  AfterViewInit, 
  Component, 
  ElementRef, 
  QueryList, 
  ViewChild, 
  ViewChildren

} from '@angular/core';

import { COURSES } from '../db-data';
import { Course } from './model/course';

import { CourseCardComponent } from './course-card/course-card.component';
import { HighlightedDirective } from './directives/highlighted.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    courses = COURSES;

    /**
     * Read the directive directly:
     */
    @ViewChild(HighlightedDirective)
    highligh: HighlightedDirective

    /**
     * Or read the directive via its host element.
     * 
     * This is very useful when multiple directives are applied
     * and we want to get directives separately:
     */
    @ViewChild(CourseCardComponent, { read: HighlightedDirective })
    highlighSeparate: HighlightedDirective

    @ViewChildren(CourseCardComponent, {read: ElementRef})
    cards : QueryList<ElementRef>;


    constructor() {

    }

    ngAfterViewInit() {

      console.log(`HighlightedDirective (read directly) `, this.highligh);
      console.log(`HighlightedDirective (read via its host element)`, this.highlighSeparate);
    }

    onCourseSelected(course:Course) {

    }

    onToggleHighlight(isHighlighted: boolean) {
      console.log(`onToggleHighlight() event value: ${isHighlighted}`);
    }
}
