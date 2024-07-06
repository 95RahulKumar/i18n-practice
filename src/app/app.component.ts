import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ILanguageOption } from './typings/interface';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'i18n';

  constructor(
    private translateService: TranslateService,
    private lang: LanguageService
  ) {}

  ngOnInit(): void {
    this.translateService.addLangs(this.lang.availableLanguages);
    this.translateService.setDefaultLang('english');
    this.buildLanguageOptions();
  }

  private buildLanguageOptions() {
    const ENGLISH = this.translateService.get('ENGLISH');
    const HINDI = this.translateService.get('HINDI');

    forkJoin([ENGLISH, HINDI]).subscribe((_response) => {
      this.lang.languageOptions = [
        {
          value: this.lang.availableLanguages[0],
          label: _response[0].toUpperCase(),
        },
        {
          value: this.lang.availableLanguages[1],
          label: _response[1].toUpperCase(),
        },
      ];
    });
  }
}
