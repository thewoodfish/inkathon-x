## Wakanda Kingship Election
<img src="https://github.com/thewoodfish/inkathon-x/blob/main/frontend/public/images/screen.png">

Alas, the greatest nation on earth is having her general election! I have been tasked to build a transparent and elegant system for the election process. 
That is where ink! and ink!athon comes in. This project was built using and customizing the ink!athon boilerplate. To realize this, i especially followed two workshops:
1. [Start building dApps on ink! workshop](https://www.youtube.com/watch?v=Ccbzavn98dw): This was during the Polkadot Encode Hackathon, March Edition (2024).
2. The [Start building full-stack dApps with ink!athon](https://www.youtube.com/watch?v=DA1pLk5--GE) tutorial by AlephZero.

These were very helpful guides.
Below i will highlight some specifics that stood out to me:

### The Election Contract
The election contract in the `contracts` folder contains the `rust` code for the smart contract. Below is a breif description of the contract and how it works:

#### The contract storage
The contract storage contains the simple data values that help the election process.
```rust
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
```

#### The contract function
- `new`: This is constructor function that initializes the contract storage. Because we're handling only the Wakanda election, i hardcoded some values and seeded the contract storage with data. The initial data contains the three aspirants, their political parties and their initial votes are set to 0.
- `vote`: This function allows the caller of the contract function to participate in the eleciton and make a vote. Double-voting is prevented by default.
- `votes`: This function returns the various candidates and the number of votes they have gotten at the time of query.