import { Component, EventEmitter, Input, OnDestroy, Output, input } from '@angular/core';
import { MockProductsService } from '../../services/mock-products.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnDestroy{

  @Input() labelButton1? : string
  @Input() labelButton2? : string

  @Output() onClicklButton1: EventEmitter<string> =  new EventEmitter<string>();
  @Output() onClicklButton2: EventEmitter<string> =  new EventEmitter<string>();
  

  products: any[] = [];
  
  constructor(private productService: MockProductsService) {
    // this.productService.getProducts().subscribe()
    

    this.productService.getProducts().subscribe({
      // Este código se ejecuta de forma asíncrona
      next: (data:any) =>{
          this.products = data
          console.log(data);
          
      },
      error: (error:any) =>{
          console.log(`Ocurrio el error:`,error);  
      },
      complete: () =>{
          console.log("Llamada al servicio completada con éxito");
          
      }
    })
  }

  clickButton1(){
    this.onClicklButton1.emit("Se pulsó el botón 1")
  }
  clickButton2(){
    this.onClicklButton2.emit("Se pulsó el botón 2")
  }



  ngOnDestroy():void{
     
  }
}
