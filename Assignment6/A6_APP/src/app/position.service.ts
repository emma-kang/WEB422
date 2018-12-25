import { Position } from './data/position';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PositionService {

  constructor(private http: HttpClient) { }
  
  getPositions() : Observable<Position[]>{
    return this.http.get<Position[]>("https://shielded-tundra-29086.herokuapp.com/positions");
  }

  savePosition(position : Position){
    return this.http.put<any>("https://shielded-tundra-29086.herokuapp.com/position/"+position._id, position);
  }

  getPosition(id : string) : Observable<Position[]>{
   return this.http.get<Position[]>("https://shielded-tundra-29086.herokuapp.com/position/"+id);
  }
}
