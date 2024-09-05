import * as crypto from "crypto";

/**
 * A helper class for creating and validating password hashes using PBKDF2.
 */
class PasswordHelper {
	private static readonly PBKDF2_HASH_ALGORITHM = "sha256";
	private static readonly PBKDF2_ITERATIONS = 1000;
	private static readonly PBKDF2_SALT_BYTE_SIZE = 24;
	private static readonly PBKDF2_HASH_BYTE_SIZE = 24;

	private static readonly HASH_SECTIONS = 4;
	private static readonly HASH_ALGORITHM_INDEX = 0;
	private static readonly HASH_ITERATION_INDEX = 1;
	private static readonly HASH_SALT_INDEX = 2;
	private static readonly HASH_PBKDF2_INDEX = 3;

	/**
	 * Creates a PBKDF2 hash of a password.
	 *
	 * @param password - The password to hash.
	 * @returns The generated hash in the format: algorithm:iterations:salt:hash.
	 */
	public static createHash(password: string): string {
		const salt = crypto
			.randomBytes(PasswordHelper.PBKDF2_SALT_BYTE_SIZE)
			.toString("base64");
		const hash = PasswordHelper.pbkdf2(
			PasswordHelper.PBKDF2_HASH_ALGORITHM,
			password,
			salt,
			PasswordHelper.PBKDF2_ITERATIONS,
			PasswordHelper.PBKDF2_HASH_BYTE_SIZE,
			true,
		).toString("base64");

		return `${PasswordHelper.PBKDF2_HASH_ALGORITHM}:${PasswordHelper.PBKDF2_ITERATIONS}:${salt}:${hash}`;
	}

	/**
	 * Validates a password against a given hash.
	 *
	 * @param password - The password to validate.
	 * @param correctHash - The hash to validate against.
	 * @returns `true` if the password is correct, `false` otherwise.
	 */
	public static validate(password: string, correctHash: string): boolean {
		const params = correctHash.split(":");
		if (params.length < PasswordHelper.HASH_SECTIONS) {
			return false;
		}

		const pbkdf2 = Buffer.from(
			params[PasswordHelper.HASH_PBKDF2_INDEX],
			"base64",
		);
		const testHash = PasswordHelper.pbkdf2(
			params[PasswordHelper.HASH_ALGORITHM_INDEX],
			password,
			params[PasswordHelper.HASH_SALT_INDEX],
			parseInt(params[PasswordHelper.HASH_ITERATION_INDEX], 10),
			pbkdf2.length,
			true,
		);

		return PasswordHelper.slowEquals(pbkdf2, testHash);
	}

	/**
	 * Compares two buffers in constant time to prevent timing attacks.
	 *
	 * @param a - The first buffer.
	 * @param b - The second buffer.
	 * @returns `true` if the buffers are equal, `false` otherwise.
	 */
	private static slowEquals(a: Buffer, b: Buffer): boolean {
		let diff = a.length ^ b.length;
		for (let i = 0; i < a.length && i < b.length; i++) {
			diff |= a[i] ^ b[i];
		}
		return diff === 0;
	}

	/**
	 * Generates a PBKDF2 hash.
	 *
	 * @param algorithm - The hash algorithm to use.
	 * @param password - The password to hash.
	 * @param salt - The salt.
	 * @param count - The number of iterations.
	 * @param keyLength - The length of the derived key.
	 * @param rawOutput - Whether to return the raw binary output.
	 * @returns The derived key as a buffer.
	 * @throws Will throw an error if the algorithm is invalid or parameters are non-positive.
	 */
	private static pbkdf2(
		algorithm: string,
		password: string,
		salt: string,
		count: number,
		keyLength: number,
		rawOutput: boolean,
	): Buffer {
		if (!crypto.getHashes().includes(algorithm)) {
			throw new Error("PBKDF2 ERROR: Invalid hash algorithm.");
		}
		if (count <= 0 || keyLength <= 0) {
			throw new Error("PBKDF2 ERROR: Invalid parameters.");
		}

		return crypto.pbkdf2Sync(password, salt, count, keyLength, algorithm);
	}
}

export default PasswordHelper;
