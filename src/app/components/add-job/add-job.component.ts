import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent {
  job: Job = {
    Titolo: '',
    DescrizioneBreve: '',
    Azienda: '',
    Provincia: '',
    DataInserimento: '',
    SmartWorking: false,
    RetribuzioneLorda: 0,
    TipologiaContratto: '',
  };

  constructor(private jobService: JobService, private router: Router) {}

  addJob() {
    // Assicurati che SmartWorking sia booleano
    this.job.SmartWorking = !!this.job.SmartWorking; // Converti a booleano
    // Assicurati che RetribuzioneLorda sia un numero
    this.job.RetribuzioneLorda = parseFloat(this.job.RetribuzioneLorda as any);
    // Verifica che la DataInserimento sia nel formato corretto
    if (this.job.DataInserimento) {
      // Puoi aggiungere un controllo qui per validare la data, se necessario
      console.log('Data Inserimento:', this.job.DataInserimento);
    }
    // Ora invia il job al backend
    this.jobService.addJob(this.job).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error("Errore nell'aggiungere l'offerta di lavoro:", error);
      }
    );
  }
}
