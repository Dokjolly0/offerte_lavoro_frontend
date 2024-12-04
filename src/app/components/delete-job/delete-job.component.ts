import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-job',
  templateUrl: './delete-job.component.html',
  styleUrls: ['./delete-job.component.scss'],
})
export class DeleteJobComponent implements OnInit {
  job: any;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.jobService.getJob(id).subscribe((data) => {
      this.job = data;
    });
  }

  deleteJob() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.jobService.deleteJob(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
