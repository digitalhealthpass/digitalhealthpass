# Open Digital Health Pass

## Introduction

In 2022, IBM Watson Health became [Merative](https://www.merative.com/), a new healthcare company committed to building a more connected future in health. Building on Watson Health’s nearly 50 years of healthcare innovation, Merative is pioneering the use of cloud, real-world data, and industry-leading AI. Merative, a company committed to supporting the open-source community as demonstrated by its contributions to [Linux for Health](https://linuxforhealth.github.io/docs/index.html), has decided to release the Watson Health credentialing technology (previously IBM Digital Health Pass) into open-source, under the GitHub “[Digital Health Pass](https://github.com/digitalhealthpass)” project, making a sophisticated set of credentialing capabilities broadly available to healthcare solutions across the globe.

## Quick Start

For more information about what's in each of the github repos and the external open source dependencies, please check out:
* [REPOS](./REPOS.md)
* [LINKS](./LINKS.md)

## License
See [LICENSE](LICENSE) file.

## Contributing Guidelines
See [CONTRIBUTING](CONTRIBUTING.md) guide.

## What was IBM Digital Health Pass?

IBM Digital Health Pass was an IBM SaaS offering that allowed secure, flexible, trusted, scalable, privacy-preserving, and verifiable data exchange between organizations and their patients, employees, customers, and citizens, to drive agile and responsive data-driven businesses. It was the technology that underpinned such projects as the [New York State Excelsior Pass](https://covid19vaccine.health.ny.gov/excelsior-pass-plus). By adopting a self-sovereign identity approach, IBM Digital Health Pass was able to build a highly scalable system that empowered individual by giving them control over their data and the agency to choose how it will be used, thereby releasing data from existing silos and enabling organizations to implement new data-driven policies and procedures in a way that is highly privacy-preserving and minimizes collection of personal data. This is particularly relevant in today’s world, where individuals are increasingly aware of the challenges in protecting their data and their privacy, and organizations are being driven to give their users greater access to their data, wherever they are and whenever they need it.

There were three key roles in the exchange of data: **Issuers** who issued credentials to individuals, **Holders** who managed their own credentials, and **Verifiers** who were presented credentials from a Holder.

The technology comprised 3 layers: Application, API, and Data

* **Application Layer** comprising a **Digital Wallet** to allow the Holder to manage their credentials with peer-to-peer data exchange without any PII passing through the cloud platform, and a **Verifier** to allow organizations to verify presented credentials (locally) in a privacy-preserving manner, deleting all credential data once verified.

* **API Layer** comprising APIs to support the end-to-end exchange of credentials, processing data on behalf of data controller and deleting personal data once processing is complete.

* **Data Layer** built on a blockchain registry of Issuers and their schemas, public keys, whitelists, blacklists, and revocation registries, which in combination with the governance and cryptographic layers, established trust in the integrity and validity of credentials exchanged.

## What is being open sourced?

Digital Health Pass will open source the technology within the first two layers (Applications and APIs) required for credential exchange. It will not open source the Hyperledger Fabric blockchain ledger, instead replacing with a simple database for holding keys, schemas, and other required elements. Blockchain could be reintroduced at a later stage by the open-source community, if so desired. This first release into open-source, will maintain some of the existing IBM Cloud dependencies, such as authentication and cloud databases, however these can be replaced by contributors to the open source project.

## Applications

### Digital Wallet

There are two mobile apps (iOS and Android) that provide the Holder with sophisticated crypto capabilities, surfaced through a simple digital wallet concept where they have cards and contacts. Cards can be shared via QR Code to exchange person-to-person or via the Data Exchange APIs for person-to-system. Contacts are created during the registration process and establish a link between the holder’s wallet and the organization with whom they will be exchanging data. The wallet includes:

* **Registration:** whereby an organization establishes an anchored relationship with a Holder to allow for secure exchange of data and credentials, through a configurable process with the level of anchoring depending on the use case. For example, a community research solution may want to create an anonymous relationship with a citizen, where public keys act as pseudonymous IDs, whereas a hospital would want a heavily anchored ID with a more involved registration process.

* **Storage:** the encrypted data vault provided with the mobile OS is used for data storage.

* **Key management:** both asymmetric and symmetric keys are managed in the wallet. Asymmetric SK/PK pairs are used for pseudonymous identity anchoring and for document signing, such as consent receipts. Symmetric keys are used during secure data exchange with a registered organization, where both Holder and organization (and no-one else) hold a copy of the symmetric key and can securely send data encrypted using this personal pairwise key.

* **Encryption/decryption:** this is used when transmitting data between Holder and registered organization via the Data Exchange Service APIs, where the wallet encrypts data before sending and decrypts data it receives.

* **Signatures:** this is used when signing documents, such as consent receipts.

* **Consent Receipts:** consent receipts (ISO/IEC 29184:2020) are generated from within the wallet when the Holder shares credentials with a contact in their wallet. The contact (organization) is created during registration and includes the purpose for which this connection has been made and other key meta-data about the organization to generate a compliant consent receipt. This allows a user to provide “consent per purpose” and keep track of what has been consented to within the wallet. The consent receipt is cryptographically signed by the Holder and transmitted with the data so that the receiver has signed proof of consent.

* **QR Code handling w/ data compression:** this is used to convert verifiable credentials into QR Codes usable for air-gapped data exchange, with data compression to handle larger credentials possibly approaching the inherent QR Code size limitations.

* **Backup and restore:** this allows a Holder to securely backup their wallet and all the credentials, encrypted with a secret to decrypt, and to restore from their phone’s backup file.

### Verifier

There are 2 mobile apps (iOS and Android) and 2 web apps (NodeJS and Python) that allow organizations to verify credentials. The verifier retrieves, from the API layer, the data required to complete verification, but runs verification locally and does not send any personal data to the cloud platform. It also deletes all personal data as soon as it is verified. The verifier also supports caching fr#om the backend to allow off-line verification in situations where you cannot guarantee Internet access. The verifier:

* **Checks the signature** to ensure that the credential has not been tampered with.

* **Verifies the issuer** to ensure that the credential was issued by a trusted issuer.

* **Executes business rules** to ensure that the data encoded within the credential meets the business requirements, such as ensuring that a vaccination is from an approved manufacturer.

* **Presents the verification results**, according to use case and jurisdictional requirements, such as ensuring that only Name and DOB is shown in the EU when verifying a DCC.

## API Layer

### Health Pass API

Comprises a suite of APIs required to support the end-to-end credential exchange process, that includes credential issue & revoke, authentication, trust registry, organization onboarding, schema management, etc.

### Verifier APIs

Supports the verification process, that includes:

* **Verifier Config:** that returns all the configuration information required to complete credential verification, such as the business rules that need to run when verifying credentials. This service also supports the pushing of configuration refreshes out to the verifier apps, so that administrators can ensure all verifiers in the ecosystem are verifying credentials according to the configured rules and regulations.

* **Verifier Admin:** that allows verifier configurations to be customized by the verifier organization. The admin UI allows policies to be defined, customized, and automatically deployed, across a large ecosystem of verifier apps. It also allows verifier metrics (anonymous) to be collected for the purposes of monitoring verifier performance; such as metrics on the number of credentials verified, by issuer and credential type. This also allows issuer/verifier business models to be established where Issuers get rewarded for the credentials that they make available to Verifiers.

### Data Exchange Service

Allows credentials to be exchanged via a built-in workflow, that includes:

* Holder registration, including managing invitations, and identity issuance

* Consent cryptographically signed by holder, in their wallet, and transmitted to verifier

* Secure, encrypted, personal data vault for exchanging data, with a custom URL, passcode, and encryption keys tied to the holder’s wallet connection.

## Blockchain
This will be replaced with a simple cloud database and not released into open source.
