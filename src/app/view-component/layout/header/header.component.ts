import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { ILanguageOption } from 'src/app/typings/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private langService: LanguageService,
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {}
  get languageOptions() {
    return this.langService.languageOptions;
  }

  changeLanguage(language: ILanguageOption) {
    this.cdRef.detectChanges();
    this.cdRef.markForCheck();
    this.translateService.use(language.value);
  }
  onLangSwitch(e: InputEvent) {
    // console.log('----------------',e.target. e?.target?.['value']);
  }
}
