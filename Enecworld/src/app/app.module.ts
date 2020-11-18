import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AvisosPanelComponent } from './avisos/common/avisos-panel/avisos-panel.component';

//Graphql imports
import {ApolloModule, Apollo} from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import {InMemoryCache} from 'apollo-cache-inmemory';

// Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material';
import { MatCardModule } from '@angular/material';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    HttpLinkModule,
    ApolloModule,
    HttpClientModule,
    FormsModule, 
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule, 
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  providers: [ HttpLink ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink, ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3200/api' }),
      cache: new InMemoryCache(),
    });
  }
}
