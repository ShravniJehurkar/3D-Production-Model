import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ProductionState {

    Idle,

    Initiation,

    Ready,

    Filling,

    Paused,

    Closure,

    Completed

}

@Injectable({
    providedIn: 'root'
})
export class ProductionService {

    private stateSubject = new BehaviorSubject<ProductionState>(
        ProductionState.Idle
    );

    state$ = this.stateSubject.asObservable();

    get state() {

        return this.stateSubject.value;

    }

    setState(state: ProductionState) {

        this.stateSubject.next(state);

    }

}