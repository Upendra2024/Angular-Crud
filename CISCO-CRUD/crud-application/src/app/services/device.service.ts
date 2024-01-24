import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceDetails } from '../models/device-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor( private http:HttpClient) {}

  addDevice(data:DeviceDetails):Observable<DeviceDetails>{
    return this.http.post<DeviceDetails>('http://localhost:3000/devicedetails',data)

  }
  updateDevice(id:number,data:DeviceDetails):Observable<any> {
    return this.http.put<DeviceDetails>(`http://localhost:3000/devicedetails/${id}`,data)
  }
  getdevicesList():Observable<DeviceDetails[]>{
    return this.http.get<DeviceDetails[]>('http://localhost:3000/devicedetails');
  }
  deleteDevice(id:number):Observable<DeviceDetails>{
    return this.http.delete<DeviceDetails>(`http://localhost:3000/devicedetails/${id}`);
  }
}
