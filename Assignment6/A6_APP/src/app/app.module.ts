import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { ContentComponent } from './content.component';
import { FooterComponent } from './footer.component';
import { HomeComponent } from './home.component';
import { EmployeesComponent } from './employees.component';
import { PositionsComponent } from './positions.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PositionService } from './position.service';
import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee.component';
import { PositionComponent } from './position.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    EmployeesComponent,
    PositionsComponent,
    PageNotFoundComponent,
    EmployeeComponent,
    PositionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PositionService, // important
    EmployeeService // important
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
