import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { SearchJobComponent } from './components/search-job/search-job.component';
import { DeleteJobComponent } from './components/delete-job/delete-job.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
  { path: 'search-job', component: SearchJobComponent },
  { path: 'delete-job/:id', component: DeleteJobComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
