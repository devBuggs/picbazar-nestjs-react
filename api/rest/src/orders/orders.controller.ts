import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderFilesDto, OrderFilesPaginator } from './dto/get-downloads.dto';
import { GetOrderStatusesDto } from './dto/get-order-statuses.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { OrderPaymentDto } from './dto/order-payment.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CheckoutVerificationDto } from './dto/verify-checkout.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async getOrders(@Query() query: GetOrdersDto): Promise<OrderPaginator> {
    return this.ordersService.getOrders(query);
  }

  @Get(':id')
  getOrderById(@Param('id') id: number) {
    return this.ordersService.getOrderByIdOrTrackingNumber(Number(id));
  }

  @Get('tracking-number/:tracking_id')
  getOrderByTrackingNumber(@Param('tracking_id') tracking_id: number) {
    return this.ordersService.getOrderByIdOrTrackingNumber(tracking_id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Post('checkout/verify')
  verifyCheckout(@Query() query: CheckoutVerificationDto) {
    return this.ordersService.verifyCheckout(query);
  }
  @Post('/payment')
  @HttpCode(200)
  async submitPayment(@Body() orderPaymentDto: OrderPaymentDto): Promise<void> {
    const { tracking_number } = orderPaymentDto;
    const order: Order = await this.ordersService.getOrderByIdOrTrackingNumber(
      tracking_number,
    );
    switch (order.payment_gateway.toString().toLowerCase()) {
      case 'stripe':
        this.ordersService.stripePay(order);
        break;
      case 'paypal':
        this.ordersService.paypalPay(order);
        break;
      default:
        break;
    }
    this.ordersService.processChildrenOrder(order);
  }
}

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.ordersService.createOrderStatus(createOrderStatusDto);
  }

  @Get()
  findAll(@Query() query: GetOrderStatusesDto) {
    return this.ordersService.getOrderStatuses(query);
  }

  @Get(':param')
  findOne(@Param('param') param: string, @Query('language') language: string) {
    return this.ordersService.getOrderStatus(param, language);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

@Controller('downloads')
export class OrderFilesController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getOrderFileItems(
    @Query() query: GetOrderFilesDto,
  ): Promise<OrderFilesPaginator> {
    return this.ordersService.getOrderFileItems(query);
  }

  @Post('digital_file')
  async getDigitalFileDownloadUrl(
    @Body('digital_file_id', ParseIntPipe) digitalFileId: number,
  ) {
    return this.ordersService.getDigitalFileDownloadUrl(digitalFileId);
  }
}

@Controller('export-order-url')
export class OrderExportController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async orderExport(@Query('shop_id') shop_id: string) {
    return this.ordersService.exportOrder(shop_id);
  }
}

@Controller('download-invoice-url')
export class DownloadInvoiceController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async downloadInvoiceUrl(@Body('shop_id') shop_id: string) {
    return this.ordersService.downloadInvoiceUrl(shop_id);
  }
}
