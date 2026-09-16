import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMachines(designId: string) {
    return this.http.get<Machine[]>(
      `${this.api}/designs/${designId}/machines`
    );
  }

  addMachine(designId: string, machine: Machine) {
    return this.http.post(
      `${this.api}/designs/${designId}/machines`,
      machine
    );
  }
  // saveMachine(machine: Machine, designId: string) {
  //   return this.http.post(`${this.api}/designs/${designId}/machines`, machine);
  // }
  getDesigns(): Observable<any> {
    return this.http.get(`${this.api}/designs`);
  }
  deleteMachine(designId: string, id: string) {
    return this.http.delete(
      `${this.api}/designs/${designId}/machines/${id}`
    );
  }

  deleteAllMachines() {
    return this.http.delete(
      `${this.api}/machines`
    );
  }
  deleteDesign(id: string) {
    return this.http.delete(
      `${this.api}/designs/${id}`
    );
  }
  saveDesign(design: any) {
    return this.http.post(
      `${this.api}/designs`,
      design
    );
  }

  resetMachines(designId: string) {
    return this.http.post(
      `${this.api}/designs/${designId}/reset`,
      {}
    );
  }
}