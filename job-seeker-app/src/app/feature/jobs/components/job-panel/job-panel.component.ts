import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AppliedJobListComponent } from '../applied-job-list/applied-job-list.component';
import { JobService } from '../../../../core/services/job.service';
import { WorkType } from '../../models/job.model';
import { ButtonComponent } from '../../../../shared/buttons/button.component';

@Component({
  selector: 'app-job-panel',
  standalone: true,
  imports: [CommonModule, AppliedJobListComponent, ButtonComponent],
  templateUrl: './job-panel.component.html',
  styleUrl: './job-panel.component.scss',
})
export class JobPanelComponent implements OnInit {
  private jobService = inject(JobService);

  totsJobsLength: number;

  workTypeStatus = WorkType;

  ngOnInit(): void {
    this.totsJobsLength = this.jobService.totalAvailableJobs();
  }

  totalAppliedJobs = this.jobService.totalAppliedJobs;
}
