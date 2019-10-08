import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private fieldList: ElementRef[];
  private onFocusField: ElementRef;
  private ctr: boolean;
  @ViewChild('field1', { static: true }) field1: ElementRef;
  @ViewChild('field2', { static: true }) field2: ElementRef;
  @ViewChild('field3', { static: true }) field3: ElementRef;
  @ViewChild('field4', { static: true }) field4: ElementRef;
  @ViewChild('field5', { static: true }) field5: ElementRef;
  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
    }
  }

  ngOnInit(): void {
    this.fieldList = [
      this.field1,
      this.field2,
      this.field3,
      this.field4,
      this.field5
    ];
  }

  public setFocusField(field): void {
    this.onFocusField = this.fieldList.find(el => el.nativeElement === field.target);
  }

  public prev(): void {
    const currentFocusIndex = this.fieldList.findIndex(el => el === this.onFocusField);
    if (currentFocusIndex > 0) {
      this.fieldList[currentFocusIndex - 1].nativeElement.focus();
    } else {
      this.fieldList[currentFocusIndex].nativeElement.focus();
    }
  }

  public next(): void {
    const currentFocusIndex = this.fieldList.findIndex(el => el === this.onFocusField);
    if (currentFocusIndex < this.fieldList.length - 1) {
      this.fieldList[currentFocusIndex + 1].nativeElement.focus();
    } else {
      this.fieldList[currentFocusIndex].nativeElement.focus();
    }
  }

  public onPaste(event: ClipboardEvent) {
    const data = event.clipboardData.getData('text');
    // TODO paste event
  }

  public onkeyup({ keyCode }) {
    this.ctr = keyCode === 17 ? false : true;
  }

  public onkeydown(event) {
    if (this.ctr) {
      return;
    }

    const { keyCode, charCode } = event;
    const { value } = this.onFocusField.nativeElement;

    if (keyCode === 8 || keyCode === 46 || charCode === 8 || charCode === 46) {
      this.validate(value, false);
    } else if (((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)) ||
      ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106))) {
      this.validate(value, true);
    } else if (keyCode === 17) {
      this.ctr = true;
    } else {
      return false;
    }
  }

  private validate(data: number, step: boolean): void {
    const currentFocusIndex = this.fieldList.findIndex(el => el === this.onFocusField);
    if (currentFocusIndex === this.fieldList.length) {
      // TODO port
      return;
    }
    const value = parseInt(data.toString(), 10) || data;
    this.onFocusField.nativeElement.value = value > 255 ? 255 : value;
    if (this.onFocusField.nativeElement.value.length === 3 && step) {
      this.next();
    }
  }
}
