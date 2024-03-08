import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../service/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
 products$!: Observable<Product[]>;

 constructor(private productService:ProductService){

 }

 ngOnInit() {
  this.loadProducts();
 }

 loadProducts(){
  this.products$=this.productService.getProducts();
 }
 delete(id: any){
  const ans = confirm('Do you want to delete product with id of '+ id);
  if(ans){
    this.productService.deleteProduct(id).subscribe((data)=>{this.loadProducts});
  }

  location.reload();
 }
}
