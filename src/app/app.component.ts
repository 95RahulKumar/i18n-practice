import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, interval, Subscription } from 'rxjs';
import { ILanguageOption } from './typings/interface';
import { LanguageService } from './services/language.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'i18n';
  users: any = [];
  intervalSource = interval(4 * 60 * 60 * 1000); // every 15 mins
  intervalSubscription!: Subscription;
  constructor(
    private translateService: TranslateService,
    private lang: LanguageService,
    private http: HttpClient,
    private update: SwUpdate,
    private zone: NgZone
  ) {
    this.updateClient();
  }

  ngOnInit(): void {
    this.translateService.addLangs(this.lang.availableLanguages);
    this.translateService.setDefaultLang('english');
    this.buildLanguageOptions();
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res) => {
        this.users = res;
      });
  }

  updateClient() {
    this.intervalSubscription?.unsubscribe();
    if (!this.update.isEnabled) {
      console.log('sw update not enabled...');
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.intervalSubscription = this.intervalSource.subscribe(async () => {
        const updateavailable = await this.update.checkForUpdate();
        if (updateavailable && confirm('new update available')) {
          this.update.activateUpdate().then(() => location.reload());
        } else {
          console.log('already new version available for app');
        }
      });
    });
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
