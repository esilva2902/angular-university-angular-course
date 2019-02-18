import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation,
    Optional,
    Self,
    SkipSelf,
    Inject
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../services/courses.service';

import { COURSES_SERVICE } from 'src/app/app.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    providers: [
        CoursesService
    ]
})
/**
 * Service decorators:
 * 
 * 1. @Optional(). When we are not sure if the service instance is going to be available
 *                 we can mark our reference as @Optional but we must control the absence
 *                 of the corresponding instance.
 * 
 * 2. @SkipSelf(). When we want to take the parent's instance we can use @SkipSelf(). Thus 
 *                 current component ask for the instance in an upper level of the
 *                 component tree.
 * 
 * 3. @Self(). @Self is going to take the instance from its providers array.
 * 
 * 4. @Host(). @Host decorator is applied to directives. Therefore, when a directive needs to
 *             have access to the component's service instance use @Host decorator to the
 *             injected instance to the directive. 
 *  
 */
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    // constructor(@SkipSelf() @Inject(COURSES_SERVICE) private courseService: CoursesService) { }

    constructor(@Self() private courseService: CoursesService) { }

    ngOnInit() {

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}
