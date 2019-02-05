import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'course-card-image',
  templateUrl: './course-card-image.component.html',
  styleUrls: ['./course-card-image.component.css']
})
export class CourseCardImageComponent implements OnInit {

  @Input('course-name') courseName: string;
  @Input('src') imgUrl: string;

  @Input('no-image-tpl') noImageTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
