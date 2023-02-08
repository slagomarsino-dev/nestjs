import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: limit = ${limit} - offset = ${offset} - brand = ${brand}`,
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return {
      message: `product ${productId}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Creation action',
      payload,
    };
  }

  @Put(':productId')
  update(@Param('productId') productId: string, @Body() payload: any) {
    return {
      id: productId,
      message: 'Update action',
      payload,
    };
  }

  @Delete(':productId')
  delete(@Param('productId') productId: string) {
    return {
      id: productId,
      message: 'Delete action',
    };
  }
}
