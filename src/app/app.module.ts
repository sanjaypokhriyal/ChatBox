import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {EmojiModule} from 'angular-emoji/dist';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { MessagingService } from './messaging.service';
import { LoginComponent } from './login/login.component';
import { ConversationComponent } from './conversation/conversation.component';
import { KeysPipe,SearchConvoPipe,filerUsersPipe,filerMembersPipe } from './keys.pipe';
import { RouterModule, Routes } from '@angular/router';
import {ReactiveFormsModule } from '@angular/forms';
import { SelectMemberDirective } from './dir.directive';
import { AddConvoComponent } from './Convo/add-convo/add-convo.component';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ReactiveFormComponent } from './shared/reactive-form/reactive-form.component';
 
const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
  },
  {
    path: 'conversation',
    component: ConversationComponent,
},
{
  path: 'rf',
  component: ReactiveFormComponent,
}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConversationComponent,
    KeysPipe,
    SearchConvoPipe,
    filerUsersPipe,
    filerMembersPipe,
    SelectMemberDirective,
    AddConvoComponent,
    MemberListComponent,
    HeaderComponent,
    FooterComponent,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule ,
    MatChipsModule,
    MatCheckboxModule,
    EmojiModule,
  ],
  providers: [MessagingService],
  bootstrap: [AppComponent],
  
  entryComponents: [
    AddConvoComponent
  ]
})
export class AppModule { }
