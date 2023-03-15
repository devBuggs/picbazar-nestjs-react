import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
  Int,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { DigitalFile, Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GetProductsArgs, ProductPaginator } from './dto/get-products.args';
import { GetProductArgs } from './dto/get-product.args';
import { GetPopularProductsArgs } from './dto/get-popular-products.args';
import { GetWishlistProductsArgs } from './dto/get-wishlist-products.args';
import { CreateWishlistInput } from './dto/create-wishlist.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(@Args('input') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => ProductPaginator, { name: 'products' })
  async getProducts(
    @Args() getProductsArgs: GetProductsArgs,
  ): Promise<ProductPaginator> {
    return this.productsService.getProducts(getProductsArgs);
  }

  @ResolveField(() => DigitalFile, { nullable: true })
  async digital_file(@Parent() digital_file: DigitalFile) {
    return null;
  }

  @Query(() => Product, { name: 'product' })
  async getProduct(@Args() getProductArgs: GetProductArgs): Promise<Product> {
    return this.productsService.getProduct(getProductArgs);
  }

  @Query(() => [Product], { name: 'popularProducts' })
  async getPopularProducts(
    @Args() getPopularProductsArgs: GetPopularProductsArgs,
  ): Promise<Product[]> {
    return this.productsService.getPopularProducts(getPopularProductsArgs);
  }

  @Mutation(() => Product)
  updateProduct(@Args('input') updateProductInput: UpdateProductInput) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  deleteProduct(@Args('id', { type: () => ID }) id: number) {
    return this.productsService.remove(+id);
  }

  @ResolveField(() => [Product])
  async related_products(
    @Parent() product: Product,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    const { type } = product;
    return this.productsService.getRelatedProducts({ slug: type.slug });
  }

  @Query(() => ProductPaginator, { name: 'wishlists' })
  async getWishlists(
    @Args() getWishlistProductsArgs: GetWishlistProductsArgs,
  ): Promise<ProductPaginator> {
    return this.productsService.getWishlistProducts(getWishlistProductsArgs);
  }

  @Query(() => Boolean, { name: 'in_wishlist' })
  async inWishlist(
    @Args('product_id', { type: () => ID }) product_id: number,
  ): Promise<boolean> {
    return this.productsService.inWishlist(product_id);
  }

  @Mutation(() => Boolean)
  async toggleWishlist(
    @Args('input') createWishlistInput: CreateWishlistInput,
  ): Promise<boolean> {
    return this.productsService.toggleWishlist(createWishlistInput);
  }

  @Mutation(() => Boolean)
  async deleteWishlist(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<boolean> {
    return this.productsService.deleteWishlist(slug);
  }
}

// @Resolver(() => Variation)
// export class VariationResolver {
//   @ResolveField(() => VariationDigitalFile, { nullable: true })
//   async digital_file(@Parent() digital_file: VariationDigitalFile) {
//     return null;
//   }
// }
