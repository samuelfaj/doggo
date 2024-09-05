export default class StripeHelper {
	static getStripe() {
		return require("stripe")(process.env.STRIPE_PRIVATE_KEY);
	}
}
