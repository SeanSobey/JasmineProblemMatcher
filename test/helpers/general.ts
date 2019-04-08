import { contributes } from '../../package.json';

export type ProblemMatcher = typeof contributes.problemMatchers[0];
export type Pattern = ProblemMatcher['pattern'][0];

export function findProblemMatcher(problemMatcherName: string): ProblemMatcher {

	const problemMatcher = contributes.problemMatchers.find(p => p.name === problemMatcherName);
	if (problemMatcher === undefined) {
		throw new Error(`Could not find problem matcher '${problemMatcherName}'`);
	}
	return problemMatcher;
}

export function blobToLines(blob: string): ReadonlyArray<string> {

	return blob.trim().split('\n');
}
