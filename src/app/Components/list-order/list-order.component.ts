import { Component, Input, OnInit } from '@angular/core';
import { IOrderPop } from 'src/app/interfaces/iorder-pop';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor() { }
  @Input() item:IOrderPop = {} as IOrderPop;
  ngOnInit(): void {
    this.item.creatorId.name
  }

}
