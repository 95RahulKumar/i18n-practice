import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { ILanguageOption } from 'src/app/typings/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private langService: LanguageService) {}

  WelcomeMsg: string = 'home_welcome_msg';
  availableLanguages: string = 'home_avalable_languages';
  aboutTheApp: string = 'home_about_app';
  i18nDes: string = 'home_i18n_desc';

  get languageOptions(): ILanguageOption[] {
    return this.langService.languageOptions;
  }
}
