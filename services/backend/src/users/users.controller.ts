import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "../common/providers/prisma.service";
import { User, Shop, Order, Prisma } from "@furinkapp/prisma";

@Controller("users")
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly prisma: PrismaService,
	) {}

	@Get()
	async getAllUsers(): Promise<User[]> {
		return this.usersService.getAllUsers();
	}

	@Get(":id")
	async getUserById(@Param("id") id: string): Promise<User> {
		const user = await this.usersService.getUserById(id);
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	@Get(":id/shops")
	async getShopsForUser(@Param("id") id: string): Promise<Shop[]> {
		const userShops = await this.usersService.getShopsForUser(id);
		if (!userShops) {
			throw new NotFoundException(`User with ID ${id} has no shops`);
		}
		return userShops;
	}

	@Get(":id/orders/:orderId")
	async getOrderForUser(
		@Param("id") id: string,
		@Param("orderId") orderId: string,
	): Promise<Order> {
		return this.usersService.getOrderForUser(id, orderId);
	}

	@Post()
	async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
		return this.usersService.createUser(data);
	}

	@Put(":id")
	async updateUser(@Param("id") id: string, @Body() data: Prisma.UserUpdateInput): Promise<User> {
		return this.usersService.updateUser(id, data);
	}

	@Delete(":id")
	async deleteUser(@Param("id") id: string): Promise<User> {
		return this.usersService.deleteUser(id);
	}
}
