import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image:
        'https://www.thesprucepets.com/thmb/aAEE1D_mgBmYgvGw61sjhS6BqVM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-puppy-in-grass-923135452-5c887d4146e0fb00013365ba.jpg',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId++;

    const newProduct = { id: this.counterId, ...payload };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) return null;

    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = { ...product, ...payload };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException(`Product #${id} not found`);

    this.products.splice(index, 1);
    return true;
  }
}
