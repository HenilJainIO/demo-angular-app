import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule,DragAndDropModule],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input('config') config:any;

  dragEnd(event : any){
    if (this.config.position) {
      this.config.position.x += event.y; // $event.y: Diff in start & end Y values
      this.config.position.y += event.x; // $event.x: Diff in start & end X values
    } else {
      this.config["position"] = {
        x: 0,
        y: 0,
      };
      this.config.position.x = event.y;
      this.config.position.y = event.x;
    }
  }

}
