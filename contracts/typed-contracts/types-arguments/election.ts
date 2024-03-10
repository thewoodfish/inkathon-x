import type BN from 'bn.js';

export type Candidate = {
	name: string,
	politicalParty: string
}

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	cannotDoubleVote = 'CannotDoubleVote'
}

