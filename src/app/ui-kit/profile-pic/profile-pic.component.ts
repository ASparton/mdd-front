import { Component, Input } from "@angular/core";

@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent {
  @Input() imgSrc: string | null = null;
  @Input() username: string = '';
  @Input() withBorder: boolean = true;
}