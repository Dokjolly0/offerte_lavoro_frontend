import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit {
  job: Partial<Job> = {}; // Può contenere solo i campi che modifichiamo
  isLoading: boolean = true; // Aggiungi il flag di caricamento

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.jobService.getJob(id).subscribe({
      next: (data: Job) => {
        this.job = { ...data }; // Mantiene SmartWorking come boolean
        this.isLoading = false; // I dati sono stati caricati
        console.log('Dati del job recuperati:', this.job); // Log dei dati
      },
      error: (err) => {
        console.error('Errore durante il recupero dei dati:', err);
        this.isLoading = false; // In caso di errore, termina il caricamento
      },
    });
  }

  editJob(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.jobService.updateJob(id, this.job).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error("Errore durante l'aggiornamento:", err),
    });
  }
}
