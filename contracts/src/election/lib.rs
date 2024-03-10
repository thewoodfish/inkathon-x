#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod election {
    use ink::prelude::string::String;
    use ink::prelude::string::ToString;
    use ink::prelude::vec;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    /// The struct describing a contesting candidate
    #[derive(scale::Decode, scale::Encode, Default, Clone)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Candidate {
        /// The name of the candidate
        name: String,
        /// The name of the political party the candidate belongs too
        political_party: String,
    }

    /// Defines the storage of your contract.
    #[ink(storage)]
    pub struct Election {
        /// The field describing candidates
        candidates: Vec<Candidate>,
        /// The field mapping a candidate to his number of votes
        votes: Mapping<String, u64>,
        /// The field prevents double voting
        voters: Vec<AccountId>,
    }

    impl Election {
        /// Constructor that initializes the election contract.
        /// This contract is not flexible. It is tailored to handle the upcoming general election in Wakanda
        #[ink(constructor)]
        pub fn new() -> Self {
            let candidates = vec![
                Candidate {
                    name: "Prince T'Challa".to_string(),
                    political_party: "The Wakanda People's Movement".to_string(),
                },
                Candidate {
                    name: "General Okoye".to_string(),
                    political_party: "The Dora Liberation Party".to_string(),
                },
                Candidate {
                    name: "Namor".to_string(),
                    political_party: "The Underwater Rebellion Party".to_string(),
                },
            ];

            let mut storage = Self {
                candidates,
                votes: Default::default(),
                voters: Default::default(),
            };

            storage.votes.insert("Prince T'Challa".to_string(), &0);
            storage.votes.insert("General Okoye".to_string(), &0);
            storage.votes.insert("Namor".to_string(), &0);

            storage
        }

        /// adds a candidate to the list of aspirants for the election
        #[ink(message, payable)]
        pub fn candidates(&self) -> Vec<Candidate> {
            self.candidates.clone()
        }

        /// vote for a candidate
        #[ink(message, payable)]
        pub fn vote(&mut self, name: String) {
            // Get the contract caller
            let caller = Self::env().caller();

            // prevent double voting
            if !self.voters.contains(&caller) {
                // make the vote
                if let Some(votes_count) = self.votes.get(&name) {
                    // increase vote count
                    self.votes.insert(name, &{ votes_count + 1 });
                }

                // append to voters vec to prevent double-voting
                self.voters.push(caller);
            }
        }

        /// get number of votes for the election
        #[ink(message, payable)]
        pub fn votes(&self) -> Vec<(String, u64)> {
            let mut votes_count = Vec::new();
            for c in self.candidates.iter() {
                if let Some(count) = self.votes.get(&c.name) {
                    votes_count.push((c.name.clone(), count));
                }
            }

            votes_count
        }
    }
}
