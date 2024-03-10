/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/election';
import type * as ReturnTypes from '../types-returns/election';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/election.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/election.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* candidates
	*
	* @returns { Result<Array<ReturnTypes.Candidate>, ReturnTypes.LangError> }
	*/
	"candidates" (
		__options: GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.Candidate>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "candidates", [], __options, (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* vote
	*
	* @param { string } name,
	* @returns { void }
	*/
	"vote" (
		name: string,
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "vote", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [name], __options);
	}

	/**
	* votes
	*
	* @returns { Result<Array<[string, number]>, ReturnTypes.LangError> }
	*/
	"votes" (
		__options: GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Array<[string, number]>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "votes", [], __options, (result) => { return handleReturnType(result, getTypeDescription(12, DATA_TYPE_DESCRIPTIONS)); });
	}

}