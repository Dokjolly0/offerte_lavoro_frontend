import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];
  isLoading: boolean = true; // Per gestire il caricamento
  searchText: string = ''; // Testo di ricerca

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  // Funzione per caricare le offerte di lavoro iniziali
  private loadJobs(): void {
    this.isLoading = true;
    this.jobService.getJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
        console.log('Jobs loaded:', this.jobs);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.isLoading = false; // Nascondi il loader anche in caso di errore
      },
    });
  }

  // Funzione per eseguire la ricerca
  onSearch(): void {
    if (this.searchText.trim() === '') {
      this.loadJobs(); // Carica tutte le offerte se non c'è testo di ricerca
    } else {
      this.isLoading = true;
      this.jobService.searchJobs(this.searchText).subscribe({
        next: (data: Job[]) => {
          this.jobs = data;
          console.log('Filtered Jobs:', this.jobs);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error searching jobs:', err);
          this.isLoading = false;
        },
      });
    }
  }
}
