import { Transaction } from "sequelize";
import sequelize from "@configs/sequelize";

export async function transactionFlow<T>(
	originalTransaction: Transaction | undefined,
	callback: (transaction: Transaction) => Promise<T>,
): Promise<T> {
	const transaction = originalTransaction || (await sequelize.transaction());

	try {
		const cb = await callback(transaction);

		if (!originalTransaction) {
			await transaction.commit();
		}

		return cb;
	} catch (e) {
		if (!originalTransaction) {
			await transaction.rollback();
		}

		throw e;
	}
}

/**
 * Returns a human-readable time elapsed string for a given date.
 * @param {Date | string} datetime - The date and time to calculate the elapsed time from.
 * @returns {string} - The human-readable elapsed time string.
 *
 * // Example usage:
 * console.log(timeElapsedString('2024-06-01T12:00:00Z')); // Adjust the date as needed
 */
export function timeElapsedString(datetime: Date | string) {
	const moment = require("moment");
	const now = moment();
	const past = moment(datetime);

	const seconds = now.diff(past, "seconds");
	const minutes = now.diff(past, "minutes");
	const hours = now.diff(past, "hours");
	const days = now.diff(past, "days");
	const weeks = now.diff(past, "weeks");
	const months = now.diff(past, "months");
	const years = now.diff(past, "years");

	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
	} else if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
	} else if (hours < 24) {
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	} else if (days < 7) {
		return `${days} day${days !== 1 ? "s" : ""} ago`;
	} else if (weeks < 4) {
		return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
	} else if (months < 12) {
		return `${months} month${months !== 1 ? "s" : ""} ago`;
	} else {
		return `${years} year${years !== 1 ? "s" : ""} ago`;
	}
}
