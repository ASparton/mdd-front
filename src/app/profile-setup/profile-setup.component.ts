import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ApiAuthService } from '../services/apiAuth.service';
import { ApiUserService } from '../services/apiUser.service';
import { InputValidationService } from '../services/inputValidation.service';

// Types
import { UpdateUserQuery } from '../types';

@Component({
    selector: 'profile-setup',
    templateUrl: './profile-setup.component.html',
    styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent implements OnInit {
  // Inputs
  profilePicUrl: string | null = null;
  displayedName: string = '';
  bio: string = '';

  // Inputs validation
  invalidDisplayedName: boolean = false;
  profilePicTooLarge: boolean = false;

  constructor(private router: Router,
              private apiAuthService: ApiAuthService,
              private inputValidationService: InputValidationService,
              private apiUserService: ApiUserService) {}

  /**
   * Redirect user to needed pages if he does not have the required permissions.
   */
  ngOnInit(): void {
    this.apiAuthService.isFullyAuthenticated()
      .then(isFullyAuthenticated => isFullyAuthenticated && this.router.navigate(['app/feed']))
      .catch(_ => this.router.navigate(['/internal-server-error']));
  }

  // Input changes
  onDisplayedNameChange(newValue: string): void {
    this.displayedName = newValue;
    this.invalidDisplayedName = this.displayedName.length < 3 || this.displayedName.length > 35 ||
                                !this.inputValidationService.isDisplayedNameValid(this.displayedName);
  }
  onBioChange(newValue: string): void {
    this.bio = newValue;
  }

  /**
   * Set the profile picture url with the blob of the uploaded image.
   * @param event the upload event
   */
  onImageSelected(event: any): void {
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
    return !this.invalidDisplayedName && this.displayedName.length > 0 &&
           (this.profilePicUrl === null || this.inputValidationService.isImageBlob(this.profilePicUrl));
  }

  /**
   * If all needed inputs are valid, update the user profile and go on to (app/feed).
   */
  onContinueClick(): void {
    if (this.formIsValid()) {
      // Build updates object
      let updates: UpdateUserQuery = { displayedName: this.displayedName };
      if (this.profilePicUrl) updates.profilePicture = this.profilePicUrl;
      if (this.bio) updates.bio = this.bio;

      this.apiUserService.updateUser(updates)
        .then(_ => this.router.navigate(['app/feed']))
        .catch(_ => this.router.navigate(['/internal-server-error']));
    }
  }
}