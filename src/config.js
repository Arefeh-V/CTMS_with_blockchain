export const PUBLIC_KEY = "0xbEB9826bBa0AC436A4a12dCC584A0b2346405068"; //from ganache  0x0DCAa1DFd437A01435D7aB1572AdA26fca41eBC0
export const CONTRACT_ADDRESS = "0x08d8b2607e0c314505A6Bee9dd8F85b9a7e31ff2"; //from truffle deploy log

export const CONTACT_ABI =  [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "clinicalTrials",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "parentId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "createdBy",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "clinicalTrialsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "patients",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "patientsConsents",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "researchers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "createClinicalTrial",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_clinicalTrialId",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "_generalInformation",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "_rareDiseaseClauses",
        "type": "string[]"
      }
    ],
    "name": "updateClinicalTrial",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getClinicalTrials",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "parentId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "createdBy",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct Contacts.ClinicalTrial[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_clinicalTrialId",
        "type": "uint256"
      }
    ],
    "name": "getClinicalTrialConsents",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "parentId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "clinicalTrialId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "requestedBy",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "patient",
            "type": "address"
          },
          {
            "internalType": "enum Contacts.ConsentStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "statusChangedAt",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "statusChangedBy",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiresAt",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "additionalInformation",
            "type": "string"
          }
        ],
        "internalType": "struct Contacts.Consent[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_patientAddr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_clinicalTrialId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_parentId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_expiresAt",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_additionalInformation",
        "type": "string"
      }
    ],
    "name": "requestConsent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_consentId",
        "type": "uint256"
      }
    ],
    "name": "rejectConsent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_patientAddr",
        "type": "address"
      }
    ],
    "name": "getPatientConsents",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "parentId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "clinicalTrialId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "requestedBy",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "patient",
            "type": "address"
          },
          {
            "internalType": "enum Contacts.ConsentStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "statusChangedAt",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "statusChangedBy",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiresAt",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "additionalInformation",
            "type": "string"
          }
        ],
        "internalType": "struct Contacts.Consent[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];




