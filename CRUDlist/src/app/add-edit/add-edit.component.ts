import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../models/products';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formName: string;
  formPrice: string;
  formInstock: string;
  formDescription: string;
  id!: number;
  errorMessage: any;
  existingProduct!: Product;

  constructor(private productService:ProductService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router){
    const idParam='id';
    this.actionType='Add';
    this.formName='name';
    this.formPrice='price';
    this.formInstock='instock';
    this.formDescription='description';

    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form=this.formBuilder.group({
      id: [1, [Validators.required]],
      name:['', [Validators.required]],
      price:[0, [Validators.required]],
      instock:[0, [Validators.required]],
      description:['', ],
    })
  }

  ngOnInit() {
    if(this.id>0){
      this.actionType='Edit';
      this.productService.getProduct(this.id)
      .subscribe(data=>(
        this.existingProduct=data,
        this.form.controls[this.formName].setValue(data.name),
        this.form.controls[this.formPrice].setValue(data.price),
        this.form.controls[this.formInstock].setValue(data.inStock),
        this.form.controls[this.formDescription].setValue(data.description)
      ));
    }
  }

  async save(){
    if(!this.form.valid){
      return;
    }

    if(this.actionType=='Add'){
      let product: Product={
        name: this.form.get(this.formName)?.value,
        price: this.form.get(this.formPrice)?.value,
        inStock: this.form.get(this.formInstock)?.value,
        description: this.form.get(this.formDescription)?.value
      };

       this.productService.saveProduct(product).subscribe((data)=>{
        this.router.navigate(['/']);
      });
    }

    if(this.actionType=='Edit'){
      let product: Product={
        id:this.existingProduct.id,
        name: this.form.get(this.formName)?.value,
        price: this.form.get(this.formPrice)?.value,
        inStock: this.form.get(this.formInstock)?.value,
        description: this.form.get(this.formDescription)?.value
      };
      this.productService.updateProduct(product.id!, product)
      .subscribe((data)=>{
        this.router.navigate(['/']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/']);
  }

  get name(){return this.form.get(this.formName)}
  get price(){return this.form.get(this.formPrice)}
  get instock(){return this.form.get(this.formInstock)}
  get description(){return this.form.get(this.formDescription)}
}
