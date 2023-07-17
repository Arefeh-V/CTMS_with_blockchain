import { useCallback } from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTACT_ABI, CONTRACT_ADDRESS, PUBLIC_KEY } from "../config";

function Home() {
  const [web3, setWeb3] = useState([]);
  const [account, setAccount] = useState(); // state variable to set account.
  const [contract, setContract] = useState();
  const [CTName, setCTName] = useState('');
  const [clinicaltrialsList, setClinicaltrialsList] = useState([]);
  const [consentList, setConsentList] = useState([]);

  const createTransaction = useCallback(
    (data, from = PUBLIC_KEY, to = CONTRACT_ADDRESS, gas = 2000000) => {
      console.log(
        from, // sender address
        to, // send to smart contract
        gas,
        data
      );
      return {
        from, // sender address
        to, // send to smart contract
        gas,
        data, // the function that needs to be signed
      };
    },
    []
  );

  const signTransaction = useCallback(
    async (transactionObject, privateKey) => {
      try {
        const signedTransaction = await web3.eth.accounts.signTransaction(
          transactionObject,
          privateKey
        );
        // Retrieve the raw signed transaction
        const rawTransaction = signedTransaction.rawTransaction;
        console.log("Signed transaction:", rawTransaction);
        return rawTransaction;
      } catch (error) {
        console.error("Error signing transaction:", error);
      }
    },
    [web3]
  );

  const sendSignedTransaction = useCallback(
    async (signedTransaction) => {
      try {
        // Send the raw signed transaction to the network
        const receipt = await web3.eth.sendSignedTransaction(signedTransaction);
        console.log("Transaction receipt:", receipt);
      } catch (error) {
        console.error("Error sending signed transaction:", error);
      }
    },
    [web3]
  );

  
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      setWeb3(web3);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      //   const networkID = await web3.eth.net.getId();
      console.log('accounts:::::::::::', accounts[0])
      console.log('accounts:::::::::::', web3.eth)
      const newContract = new web3.eth.Contract(CONTACT_ABI, CONTRACT_ADDRESS);
      setContract(newContract);

      //getClinicalTrialslist//
      let ClinicalTrialslist = []
      newContract.methods
        .getClinicalTrials()
        .call({ from: '0xbEB9826bBa0AC436A4a12dCC584A0b2346405068' })
        .then(clinicalTrials => {
          console.log('ClinicalTrialslist:::',clinicalTrials);
          ClinicalTrialslist = clinicalTrials
          setClinicaltrialsList(clinicalTrials)
        })
        .catch(error => {
          console.error(error);
        });
  
      
    }

    load();
    
  }, []);



  const handleCreateNewCT = async () => {
    console.log('handleCreateNewCT')

    const result = contract.methods
      .createClinicalTrial(CTName)
      .encodeABI();

    const transactionObject = createTransaction(result);
    const signedTransaction = await signTransaction(
      transactionObject,
      "0x9c693f88fd8bf9f4526e435a801e206267a4594fc928677f048104c0f7e985c1"
    );
    const sendTransaction = await sendSignedTransaction(signedTransaction);

    console.log(sendTransaction);
  };

  const handleCreateconsent = async () => {
    console.log('handleCreateconsent')

    const result = contract.methods
      .requestConsent('0xb02D81eC6F231AC04029f904cCC17E4066af4063',1, 0,1689579396,'frist consent for 1st CT')
      .encodeABI();

    const transactionObject = createTransaction(result);
    const signedTransaction = await signTransaction(
      transactionObject,
      "0x9c693f88fd8bf9f4526e435a801e206267a4594fc928677f048104c0f7e985c1"
    );
    const sendTransaction = await sendSignedTransaction(signedTransaction);

    console.log(sendTransaction);
  };

  const handleGetConsentslist = async () => {
    //getconsentslist//
    contract.methods
    .getClinicalTrialConsents(1)
    .call({ from: '0xbEB9826bBa0AC436A4a12dCC584A0b2346405068' })
    .then(cnsnt => {
      console.log('consentslist:::',cnsnt);
      setConsentList(cnsnt)
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
      <h1>Consent Management for Clinical Trial Management System</h1>

      <div>Your account public key is: {account}</div>
      <div>
        <input type="text" defaultValue={CTName} onChange={(val)=>{setCTName(val)}}/>
        <button onClick={handleCreateNewCT}>create new clinical trial</button>
        </div>
      
      {/* clinical trials list */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Parent ID</th>
            <th>Name</th>
            <th>created By</th>
            <th>Created At</th>
            <th>create consent</th>
            <th>get consent list</th>
          </tr>
        </thead>
        <tbody>
          {clinicaltrialsList.map((trial) => (
            <tr key={trial.id}>
              <td>{trial.id}</td>
              <td>{trial.parentId}</td>
              <td>{trial.name}</td>
              <td>{trial.createdBy}</td>
              <td>{trial.createdAt}</td>
              <td><button onClick={()=>handleCreateconsent(trial.id)}>create consent</button></td>
              <td><button onClick={()=>handleGetConsentslist(trial.id)}>get consent list</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* consent List */}
      {consentList.length > 0 && 
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Parent ID</th>
              <th>clinicalTrialId</th>
              <th>requested By</th>
              <th>patient</th>
              <th>status</th>
              <th>createdAt</th>
              <th>additionalInformation</th>
            </tr>
          </thead>
          <tbody>
            {consentList.map((trial) => (
              <tr key={trial.id}>
                <td>{trial.id}</td>
                <td>{trial.parentId}</td>
                <td>{trial.clinicalTrialId}</td>
                <td>{trial.requestedBy}</td>
                <td>{trial.patient}</td>
                <td>{trial.status}</td>
                <td>{trial.createdAt}</td>
                <td>{trial.additionalInformation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  );
}

export default Home;
