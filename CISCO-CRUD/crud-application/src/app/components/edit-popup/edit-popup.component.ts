import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss']
})
export class EditPopupComponent {

  detailsForm!: FormGroup;
  isDisable: boolean = false;
  ipAddress: any;
  ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  macRegex = /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/;
  nameaRegex = /[^\s\\]/;
  isDisabledButton: boolean = true;
  isButtonVisible: boolean = true;
  edited: boolean = false;
  resetButton: boolean = false;
  isUpdatedclick:boolean=false

  constructor(private fb: FormBuilder,
    private devicedetails: DeviceService,
    private dialogref: MatDialogRef<EditPopupComponent>,
    private _coreServices: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initializeForm()
  }

  private initializeForm() {
    this.detailsForm = this.fb.group({
      id: this.fb.control(''),
      devicename: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(10),Validators.pattern(this.nameaRegex)]),
      ipAddress: this.fb.control('', [Validators.required, Validators.pattern(this.ipRegex)]),
      macAddress: this.fb.control('', [Validators.required, Validators.pattern(this.macRegex)]),
      description: this.fb.control('', []),
    });
  }
  ngOnInit(): void {
    this.detailsForm.patchValue(this.data.data);
    this.isDisable = this.data.ipAddressDisable;
  }
  onFormSubmit() {

    if (this.detailsForm.valid) {
      if (this.data.data) {
        this.devicedetails
          .updateDevice(this.data.data.id, this.detailsForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreServices.openSnackBar('device updated sucessfully');
              this.dialogref.close(true);
              console.log(this.detailsForm.value);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
      else {
        this.devicedetails.addDevice(this.detailsForm.value).subscribe({
          next: (val: any) => {
            this._coreServices.openSnackBar('device added sucessfully')
            this.dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
  resetForm() {
    this.detailsForm.reset()
  }

}
