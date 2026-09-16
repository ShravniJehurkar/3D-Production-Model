import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VisibilityService {

    grid = new BehaviorSubject(true);

    fence = new BehaviorSubject(true);

    walkway = new BehaviorSubject(true);

    safety = new BehaviorSubject(true);

    conveyor = new BehaviorSubject(true);

    markings = new BehaviorSubject(true);

    energy = new BehaviorSubject(false);

}