import { Component } from '@angular/core';
import { LineBuilderComponent }
from './components/line-builder/line-builder';

@Component({
 selector:'app-root',
 standalone:true,
 imports:[
   LineBuilderComponent
 ],
 template:`<app-line-builder />`
})
export class App {}