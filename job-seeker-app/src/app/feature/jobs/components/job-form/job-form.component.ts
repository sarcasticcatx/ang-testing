import { Component, effect, inject, input, output, signal } from '@angular/core';
import {
  JobApplication,
  JobFormValue,
  WorkType,
} from '../../models/job.model';
import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../../core/services/job.service';
import { ButtonComponent } from '../../../../shared/buttons/button.component';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss',
})
export class JobFormComponent {
  editJobData = input<JobApplication>();

  submitOutput = output<JobFormValue>();

  jobsForm = this.generateForm();

  workTypes = WorkType;

  jobSubmitted = signal(false);

  constructor() {
    effect(() => {
      if (this.editJobData()) this.populateForm(this.editJobData());

    });
    console.log('hello')
  }

  generateForm() {
    return new FormGroup({
      company: new FormGroup({
        companyName: new FormControl('', Validators.required),
        owners: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        companyAdress: new FormControl('', Validators.required),
        companyWebsite: new FormControl('', Validators.required),
      }),
      expires: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      startingSalary: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1),
      ]),
      workType: new FormControl<WorkType>(null, Validators.required),

      location: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      qualifications: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isApplied: new FormControl<boolean>(false, Validators.requiredTrue),
    });
  }

  populateForm(jobs: JobApplication) {
    this.jobsForm.setValue({
      company: {
        companyName: jobs.company.companyName,
        owners: jobs.company.owners,
        email: jobs.company.email,
        companyAdress: jobs.company.companyAdress,
        companyWebsite: jobs.company.companyWebsite,
      },
      expires: jobs.expires,
      position: jobs.position,
      startingSalary: jobs.startingSalary,
      workType: jobs.workType,
      location: jobs.location,
      country: jobs.country,
      qualifications: jobs.qualifications,
      description: jobs.description,
      isApplied: jobs.isApplied,
    });
  }

  onFormSubmit() {
    this.jobSubmitted.set(true);
    this.jobsForm.markAllAsTouched();

    //bez ova ja isprakja formata, so ova ne ja isprakja, a i bez ova prakja prazna forma
    // if (this.jobsForm.invalid) return;


    console.log('form submitted');

    console.log(this.jobsForm.value);

   this.submitOutput.emit(this.jobsForm.value as JobFormValue);

  }

}
