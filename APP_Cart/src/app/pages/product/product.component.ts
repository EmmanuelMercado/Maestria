import { Component, OnDestroy } from '@angular/core';
import { MockProductsService } from '../../services/mock-products.service';
import { ItemListComponent } from '../../components/item-list/item-list.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  {
  products: any[] = [];
  
  constructor(private productService: MockProductsService) {
    // this.productService.getProducts().subscribe()
    

    // this.productService.getProducts().subscribe({
    //   // Este código se ejecuta de forma asíncrona
    //   next: (data:any) =>{
    //       this.products = data
    //       console.log(data);
          
    //   },
    //   error: (error:any) =>{
    //       console.log(`Ocurrio el error:`,error);  
    //   },
    //   complete: () =>{
    //       console.log("Llamada al servicio completada con éxito");
          
    //   }
    // })

    // ngOnDestroy():void{
     
    // }
  }

  
  
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

