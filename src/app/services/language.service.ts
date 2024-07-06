import { Injectable } from '@angular/core';
import { ILanguageOption } from '../typings/interface';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor() {}
  //available languages
  readonly availableLanguages = ['english', 'hindi'];
  languageOptions: ILanguageOption[] = [];
}
