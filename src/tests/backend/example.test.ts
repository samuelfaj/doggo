import { expect, test } from 'bun:test';

test('Example of Testing', async () => {
	const first_number = 100;
	expect(first_number * 100).toBeGreaterThan(1);
});
