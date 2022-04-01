import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { CountryCodes } from '../constants/country-codes'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy {

  sub: Subscriber<any> | undefined;
  formGroup: FormGroup;
  queryLabel: string = '';
  countryCodesSouthAmerica = CountryCodes.southAmerica;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.formGroup = this.formBuilder.group({
      countryCode: new FormControl('co'),
    });
    this.activatedRoute.queryParams.subscribe(data => {
      this.countryCode.setValue(data.code ? data.code : 'co')
    });
  }

  ngOnInit(): void {
  }

  get countryCode() {
    return this.formGroup.controls['countryCode'] as FormControl;
  }

  onFormSubmit() {
    this.router.navigate(['/search'],
      { queryParams: { code: this.countryCode.value } });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
