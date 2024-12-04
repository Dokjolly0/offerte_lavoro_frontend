import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:5000/jobs'; // Modifica questo URL con l'URL del tuo backend
  private apiSingleJobUrl = 'http://localhost:5000/job'; // Modifica questo URL con l'URL del tuo backend

  constructor(private http: HttpClient) {}

  private formatDate(date: string): string {
    if (!date) return 'N/A'; // Restituisci un valore di fallback
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? 'N/A'
      : parsedDate.toISOString().slice(0, 10);
  }

  // Ottieni tutte le offerte di lavoro
  getJobs(): Observable<Job[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((item) => ({
          OffertaLavoroID: item[0],
          Titolo: item[1],
          DescrizioneBreve: item[2],
          Azienda: item[3],
          Provincia: item[4],
          DataInserimento: this.formatDate(item[5]),
          SmartWorking: item[6] === 'si',
          RetribuzioneLorda: item[7],
          TipologiaContratto: item[8],
        }))
      )
    );
  }

  // Ottieni una singola offerta di lavoro per ID
  getJob(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/job?id=${id}`);
  }

  // Aggiungi una nuova offerta di lavoro
  addJob(job: Job) {
    // Aggiungi l'header di autorizzazione con il token
    const headers = new HttpHeaders();
    // Prepara l'oggetto job da inviare, facendo le eventuali trasformazioni necessarie
    const newJob = {
      ...job,
      // Se "SmartWorking" è booleano, puoi lasciarlo così
      // Ma se il backend si aspetta una stringa tipo "si"/"no", dovresti fare una conversione
      SmartWorking: job.SmartWorking ? 'si' : 'no', // Esempio di conversione
      // Se ci sono campi come assignedTo o altri oggetti annidati, estrai solo gli ID o altri attributi necessari
      // Esegui eventuali trasformazioni sui dati (ad esempio, per la DataInserimento)
      DataInserimento: job.DataInserimento, // Assicurati che la data sia nel formato corretto
      // Potresti voler trasformare RetribuzioneLorda come numero se non è già un numero
      RetribuzioneLorda: parseFloat(job.RetribuzioneLorda.toString()), // Conversione in numero
    };
    // Esegui la chiamata HTTP POST per inviare i dati al backend
    return this.http.post(`${this.apiUrl}`, newJob, { headers });
  }

  // Modifica un'offerta di lavoro
  updateJob(id: number, job: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, job);
  }

  // Elimina un'offerta di lavoro
  deleteJob(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Ricerca offerte di lavoro per titolo
  searchJobs(searchText: string): Observable<Job[]> {
    const params = new HttpParams()
      .set('search_text', searchText)
      .set('max_results', '10');
    return this.http.get<Job[]>(`${this.apiUrl}/search`, { params });
  }
}
