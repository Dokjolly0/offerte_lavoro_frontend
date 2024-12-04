import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchJobComponent } from './components/search-job/search-job.component';
import { DeleteJobComponent } from './components/delete-job/delete-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { JobItemComponent } from './job-item/job-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchJobComponent,
    DeleteJobComponent,
    EditJobComponent,
    AddJobComponent,
    HomeComponent,
    JobItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
