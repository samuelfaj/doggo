import User from "@models/User";
import { CreationAttributes, InferAttributes, Op } from "sequelize";
import StudentService from "@services/Student.service";
import PasswordHelper from "../helpers/Password.helper";
import StripeHelper from "../helpers/Stripe.helper";

export default class UserService {
	private static async validateData(body: CreationAttributes<User>) {
		if (!body.email || !body.username) {
			throw new Error("Email and Username are required.");
		}
	}

	private static async onCreateValidations(body: CreationAttributes<User>) {
		const existingUser = await User.findOne({
			where: {
				[Op.or]: [{ email: body.email }, { username: body.username }],
			},
		});

		if (existingUser) {
			throw new Error("Email or Username already exists.");
		}

		await this.validateData(body);
	}

	private static async onUpdateValidations(
		before: CreationAttributes<User>,
		after: CreationAttributes<User>,
	) {
		await this.validateData({ ...before, ...after });

		if (after.email) {
			const existingEmail = await User.findOne({
				where: {
					email: after.email,
					id: { [Op.ne]: before.id },
				},
			});

			if (existingEmail) {
				throw new Error("New e-mail is already used by another user.");
			}
		}

		if (after.username) {
			const existingUsername = await User.findOne({
				where: {
					username: after.username,
					id: { [Op.ne]: before.id },
				},
			});

			if (existingUsername) {
				throw new Error(
					"New username is already used by another user.",
				);
			}
		}
	}

	static async findByPk(id: number) {
		return User.findByPk(id);
	}

	static async update(
		user: User,
		body: CreationAttributes<User> & { password?: string },
		options?: { actionMadeBy?: User },
	) {
		if (options?.actionMadeBy && user.id !== options.actionMadeBy.id) {
			throw new Error("You are not allowed to update this user.");
		}

		if (body.password) {
			body.passwordHash = PasswordHelper.createHash(body.password);
		}

		await this.onUpdateValidations(
			user.toJSON(),
			body as CreationAttributes<User>,
		);
		return user.update(body);
	}

	static async userHasStudent(user: User, studentId: number) {
		const array = await StudentService.getAllRowByPrimaryId(
			user.PrimaryGuardian.id,
			{
				where: {
					id: studentId,
				},
				attributes: ["id"],
				limit: 1,
			},
		);

		return array.length > 0;
	}

	static async getUserStudents(user: User) {
		return await StudentService.getAllRowByPrimaryId(
			user.PrimaryGuardian.id,
			{},
		);
	}

	static async findOrCreateStripeCustomerFromUser(user: User) {
		const stripe = StripeHelper.getStripe();

		const customerInfo = {
			name: `${user.PrimaryGuardian.firstName} ${user.PrimaryGuardian.lastName}`,
			description: `${user.PrimaryGuardian.firstName} ${user.PrimaryGuardian.lastName} account`,
			email: user.email,
			metadata: {
				primaryId: user.PrimaryGuardian.id,
				userId: user.id,
				userEmail: user.email,
			},
		};

		let customer;

		if (user.stripeCustomerId) {
			customer = await stripe.customers.update(
				user.stripeCustomerId,
				customerInfo,
			);
		} else {
			customer = await stripe.customers.create(customerInfo);
			user.stripeCustomerId = customer.id;
			await user.save();
		}

		return customer;
	}
}
