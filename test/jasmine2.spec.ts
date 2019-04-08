import { strict as assert } from 'assert';
import { blobToLines, findProblemMatcher, ProblemMatcher, Pattern } from './helpers/general';

type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

type Problem = {
	readonly message?: string;
	readonly file?: string;
	readonly line?: string;
	readonly column?: string;
};

const jasmineText = blobToLines(`
Failures:
1) example fails
  Message:
    Expected false to be truthy.
  Stack:
        at UserContext.it (Folder\\Example.spec.ts:13:34)
`);

describe('jasmine-problem-matcher', () => {

	const matcherName = 'jasmine';
	const createSUT = () => findProblemMatcher(matcherName);

	it('exists in package.json', () => {

		const sut = createSUT();
		assert.ok(sut, `problemMatcher with name ${matcherName}`);
	});

	describe('given jasmine output with a failure', () => {

		describe('pattern 1', () => {

			const index = 0;
			const text = jasmineText[1];

			it('has a sequence matching problemMatcher.pattern sequence', () => {

				const sut = createSUT();
				const pattern = sut.pattern[index];
				const actual = createProblem(pattern, text);
				const expected: Problem = {};
				assert.deepEqual(actual, expected);
			});
		});

		describe('pattern 2', () => {

			const index = 1;
			const text = jasmineText[2];

			it('has a sequence matching problemMatcher.pattern sequence', () => {

				const sut = createSUT();
				const pattern = sut.pattern[index];
				const actual = createProblem(pattern, text);
				const expected: Problem = {};
				assert.deepEqual(actual, expected);
			});
		});

		describe('pattern 3', () => {

			const index = 2;
			const text = jasmineText[3];

			it('has a sequence matching problemMatcher.pattern sequence', () => {

				const sut = createSUT();
				const pattern = sut.pattern[index];
				const actual = createProblem(pattern, text);
				const expected: Problem = {
					message: 'Expected false to be truthy.'
				};
				assert.deepEqual(actual, expected);
			});
		});

		describe('pattern 4', () => {

			const index = 3;
			const text = jasmineText[4];

			it('has a sequence matching problemMatcher.pattern sequence', () => {

				const sut = createSUT();
				const pattern = sut.pattern[index];
				const actual = createProblem(pattern, text);
				const expected: Problem = {};
				assert.deepEqual(actual, expected);
			});
		});

		describe('pattern 5', () => {

			const index = 4;
			const text = jasmineText[5];

			it('has a sequence matching problemMatcher.pattern sequence', () => {

				const sut = createSUT();
				const pattern = sut.pattern[index];
				const actual = createProblem(pattern, text);
				const expected: Problem = {
					column: '34',
					file: 'Folder\\Example.spec.ts',
					line: '13',
				};
				assert.deepEqual(actual, expected);
			});
		});
	});

	function createProblem(pattern: Pattern, text: string): Problem | null {

		const regexp = new RegExp(pattern.regexp);
		const message = pattern.message;
		const file = pattern.file;
		const line = pattern.line;
		const column = pattern.column;
		const match = regexp.exec(text);
		if (!match) {
			return null;
		}
		const result: Mutable<Problem> = {};
		if (message) {
			result.message = match[message];
		}
		if (file) {
			result.file = match[file];
		}
		if (line) {
			result.line = match[line];
		}
		if (column) {
			result.column = match[column];
		}
		return result;
	}
});
