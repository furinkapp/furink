import { Order, Prisma, Shop, ShopPost, User } from "@furinkapp/prisma";
import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../common/providers/prisma.service";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getUserById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	async getShopsForUser(id: string): Promise<Shop[] | null> {
		return this.prisma.user
			.findUnique({
				where: { id },
			})
			.ownedShops();
	}

	async getOrderForUser(id: string, orderId: string): Promise<Order> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		const orders = await this.prisma.order.findUnique({
			where: { id: orderId, customerId: user.id },
		});
		if (!orders) {
			throw new NotFoundException(`Order with ID ${orderId} not found for user with ID ${id}`);
		}
		return orders;
	}

	async getPostForUser(id: string, postId: string): Promise<ShopPost> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		const posts = await this.prisma.shopPost.findUnique({
			where: { id: postId, authorId: user?.id },
		});
		if (!posts) {
			throw new NotFoundException(`Post with ID ${postId} not found for user with ID ${id}`);
		}
		return posts;
	}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	// async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
	// 	return this.prisma.user.update({
	// 		where: { id },
	// 		data,
	// 	});
	// }

	async deleteUser(id: string): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
