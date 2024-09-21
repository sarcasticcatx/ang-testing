import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../../core/services/job.service';
import { JobApplication, JobFormValue } from '../../models/job.model';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [JobFormComponent],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent {
  private router = inject(ActivatedRoute)
  private route = inject(Router)
  private jobsService = inject(JobService)

  jobSelect = this.jobsService.jobSelection

  ngOnInit(): void {
    const id: string = this.router.snapshot.params['id'];

    this.jobsService.getJobById(Number(id));
  }

 //for the edit job form

  jobEdit(jobs: JobApplication) {
    this.jobsService.editJob(jobs);
      console.log('edited job');
  
      this.route.navigate(['jobs']);
  }
   

    };


