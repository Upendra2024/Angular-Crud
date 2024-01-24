import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceDetails } from 'src/app/models/device-details';
import { DeviceService } from 'src/app/services/device.service';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'devicename', 
    'ipAddress', 
    'macAddress', 
    'description', 
    'action',
  ];

  Details:DeviceDetails[] =[];
  dataSource!: MatTableDataSource<DeviceDetails>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _device: DeviceService, 
    // private toaster : ToastrService,
    ) {};

  
  ngOnInit(): void {
    this.getdevicesList();
  }

  openAddEditForm(){
    //  this._dialog.open(DeviceAddEditComponent);
    //  console.log(this._dialog);
    
    const dialogRef = this._dialog.open(EditPopupComponent,{data:{ipAddressDisable:false}});
    dialogRef.afterClosed()
    .subscribe({
      next: (val) => {
        if (val) {
          this.getdevicesList();
        }
      },
    });
  }

  getdevicesList() {
    this._device.getdevicesList().subscribe({
      next: (res:DeviceDetails[]) => {
        console.log(res)
        this.Details = res;
        //this.dataSource = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    
    });
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteDevice(id:number){
    const dialogRef = this._dialog.open(DeletePopupComponent,{data:{deleteId:id}});
    dialogRef.afterClosed().subscribe(()=>{
      this.getdevicesList();
    });
  }
  
  openEditForm(data:DeviceDetails){
    const dialogRef = this._dialog.open(EditPopupComponent, {
      data:{data,ipAddressDisable:true}
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getdevicesList();
        }
      },
    });
  };

  
  
  
}


