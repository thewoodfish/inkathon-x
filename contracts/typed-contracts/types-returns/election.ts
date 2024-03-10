import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

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

