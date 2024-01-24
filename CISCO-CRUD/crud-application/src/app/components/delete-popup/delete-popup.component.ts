import { Component, Inject } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeviceService } from 'src/app/services/device.service';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
  

  constructor(public dialogRef:MatDialogRef<DashboardComponent>,
    
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private deviceService:DeviceService,private _coreServices: CoreService,){};

  ngOnInit(): void {
    
  }
  cancel(){
    this.dialogRef.close();
  }
  confirm(){
    //this.dialogRef.close('yes');
    this.deviceService.deleteDevice(this.dialogData.deleteId).subscribe({
      next: (res:any) => {
        // this.toaster.success('device deleted');
        this._coreServices.openSnackBar('device deleted sucessfully');
        this.dialogRef.close();
      },
      error: console.log,
    });

  }

}
