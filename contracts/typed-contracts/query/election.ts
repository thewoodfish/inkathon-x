/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/election';
import type * as ReturnTypes from '../types-returns/election';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/election.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;
	readonly __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* candidates
	*
	* @returns { Result<Array<ReturnTypes.Candidate>, ReturnTypes.LangError> }
	*/
	"candidates" (
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.Candidate>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "candidates", [], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* vote
	*
	* @param { string } name,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"vote" (
		name: string,
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "vote", [name], __options , (result) => { return handleReturnType(result, getTypeDescription(8, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* votes
	*
	* @returns { Result<Array<[string, number]>, ReturnTypes.LangError> }
	*/
	"votes" (
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Array<[string, number]>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "votes", [], __options , (result) => { return handleReturnType(result, getTypeDescription(12, DATA_TYPE_DESCRIPTIONS)); });
	}

}