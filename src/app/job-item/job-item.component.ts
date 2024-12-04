import { Component, Input } from '@angular/core';
import { Job } from '../interfaces/job.interface';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent {
  @Input() job!: Job; // Usa il decoratore @Input per ricevere l'offerta di lavoro
}
