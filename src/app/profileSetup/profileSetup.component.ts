import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// Services
import { ApiAuthService } from '../services/apiAuth.service';
import { InputValidationService } from '../services/inputValidation.service';

@Component({
    selector: 'profile-setup',
    templateUrl: './profileSetup.component.html',
    styleUrls: ['./profileSetup.component.css']
})
export class ProfileSetupComponent implements OnInit {
  // Inputs
  profilePicUrl: string | null = null;
  displayedName: string = '';
  bio: string = '';

  // Inputs validation
  displayedNameWrong: boolean = false;
  profilePicTooLarge: boolean = false;

  constructor(private router: Router,
              private apiAuthService: ApiAuthService,
              private inputValidationService: InputValidationService) {}

  /**
   * Redirect user to needed pages if he does not have the required permissions.
   */
  ngOnInit(): void {
    this.apiAuthService.isFullyAuthenticated()
      .then(isFullyAuthenticated => isFullyAuthenticated && this.router.navigate(['/feed']))
      .catch(_ => this.router.navigate(['/internal-server-error']));
  }

  // Input changes
  onDisplayedNameChange(newValue: string): void {
    this.displayedName = newValue;
    this.displayedNameWrong = this.displayedName.length === 0;
  }
  onBioChange(newValue: string): void {
    this.bio = newValue;
  }

  /**
   * Set the profile picture url with the blob of the uploaded image.
   * @param event the upload event
   */
  onImageSelected(event: any): void {
    console.log(event.target.files[0].size);

    if (event.target.files[0].size <= 200000) {
      this.profilePicTooLarge = false;

      let reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result)
          this.profilePicUrl = reader.result as string;
        else
          this.router.navigate(['/internal-server-error']);
      }
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.profilePicTooLarge = true;
    }
  }
  
  // Input verification

  /**
   * @returns true if displayed name not empty + profile pic is an image blob or null
   */
  formIsValid(): boolean {
    return this.displayedName.length > 0 && 
           (this.profilePicUrl === null || this.inputValidationService.isImageBlob(this.profilePicUrl));
  }

  /**
   * If all needed inputs are valid, update the user profile and go on to the app (/feed).
   */
  onContinueClick(): void {
    if (this.formIsValid()) {
      // DO UPDATE
      console.log(this.profilePicUrl);
      console.log(this.displayedName);
      console.log(this.bio);
    }
  }
}