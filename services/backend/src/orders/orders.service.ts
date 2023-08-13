import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/providers/prisma.service";
import { Order } from "@furinkapp/prisma";
@Injectable()
export class OrdersService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllOrders(): Promise<Order[]> {
		return this.prisma.order.findMany();
	}

	async getOrderById(id: string): Promise<Order> {
		const order = await this.prisma.order.findUnique({ where: { id } });
		if (!order) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return order;
	}

	async createOrder(order: Order): Promise<Order> {
		return this.prisma.order.create({ data: order });
	}

	async updateOrder(id: string, order: Order): Promise<Order> {
		const existingOrder = await this.prisma.order.findUnique({ where: { id } });
		if (!existingOrder) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return this.prisma.order.update({ where: { id }, data: order });
	}

	async deleteOrder(id: string): Promise<void> {
		const existingOrder = await this.prisma.order.findUnique({ where: { id } });
		if (!existingOrder) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		await this.prisma.order.delete({ where: { id } });
	}
}
