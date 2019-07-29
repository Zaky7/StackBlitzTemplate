import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() options = [];
  @Input() model;
  originalOptions = [];
  searchControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.originalOptions = [...this.options];

    if (this.model !== undefined) {
      this.model = this.options.find(currentOption =>
        currentOption[this.idKey] === this.model);
    }

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(term => this.search(term));
  }

  search(value: string) {
    this.options = this.originalOptions.filter(
      option => option[this.labelKey].includes(value)
    );
  }

  get label() {
    return this.model ? this.model[this.labelKey] : 'Select ...';
  }

}
