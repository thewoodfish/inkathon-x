'use client'

import { FC, useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import ElectionContract from '@inkathon/contracts/typed-contracts/contracts/election'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

const formSchema = z.object({
  newMessage: z.string().min(1).max(90),
})

export const ElectionContractInteractions: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Election)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Election, ElectionContract)
  const [electionMessage, setElectionMessage] = useState<string>()
  const [electionResult, setElectionResult] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  // Fetch election candidates
  const electionCandidates = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'candidates')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'candidates')
      if (isError) throw new Error(decodedOutput)
      setElectionMessage(output)

      // Alternatively: Fetch it with typed contract instance
      const typedResult = await typedContract.query.candidates()
      console.log('Result from typed contract: ', typedResult.value)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching candidates. Try again…')
      setElectionMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    electionCandidates()
  }, [typedContract])


  // Fetch real-time election results
  const electionResults = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'votes')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'votes')
      if (isError) throw new Error(decodedOutput)
      setElectionResult(output)

      // Alternatively: Fetch it with typed contract instance
      const typedResult = await typedContract.query.votes()
      console.log('Result from typed contract: ', typedResult.value)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching election results. Try again…')
      setElectionResult(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    electionResults()
  }, [typedContract])


  // cast vote
  const castVote: SubmitHandler<z.infer<typeof formSchema>> = async ({ name }) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'vote', {}, [
        name,
      ])
      toast.success("Your vote has been successfully cast in favour of " + name);
      reset()
      electionResults()
    } catch (e) {
      console.error(e)
    } finally {}
  }

  if (!api) return null

  return (
    <>
      <div className="flex  grow flex-col gap-4">
        <h2 className="text-center font-mono text-gray-400">Interact with the election smart contract</h2>

        <Form {...form}>
          <Card>
            <CardContent className="pt-6">
              <div className='mb-5'>Here are the list of people contesting in the election:</div>
              <hr className='mb-3'></hr>
              {fetchIsLoading || !contract ? (
                'Loading…'
              ) : (
                electionMessage ? electionMessage.map(candidate => (
                  <FormItem key={candidate.name}>
                    <FormLabel className="text-base text-[#834fd8] my-5 mr-5">{candidate.name + " (" + candidate.politicalParty + ")"}</FormLabel>
                    <FormControl>
                      <Button onClick={() => castVote({ name: candidate.name })}>Vote</Button>
                    </FormControl>
                  </FormItem>
                ))
              : "")}
            </CardContent>
          </Card>
        </Form>

        <Card>
          <CardContent className="pt-6">
            <div className='mb-5'>Here are the live real-time results of the ongoing election:</div>
            {fetchIsLoading || !contract ? (
              'Loading…'
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {electionResult ? electionResult.map((res, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div className="text-lg font-semibold">{res[0]}</div>
                    <div className="text-gray-500">{res[1]} votes</div>
                  </div>
                )) : ""}
              </div>
            )}
          </CardContent>
        </Card>


        {/* Contract Address */}
        <p className="text-center font-mono text-xs text-gray-600">
          {contract ? contractAddress : 'Loading…'}
        </p>
      </div>
    </>
  )
}
