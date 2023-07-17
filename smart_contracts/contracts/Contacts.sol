// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Contacts {

    enum ConsentStatus {REQUESTED, GRANTED, REJECTED, REVOKED, EXPIRED}

    struct Consent {
        uint id;
        uint parentId;
        uint clinicalTrialId;
        address requestedBy;
        address patient;
        ConsentStatus status;
        uint statusChangedAt;
        address statusChangedBy;
        uint createdAt;
        uint expiresAt;
        string additionalInformation;
        // string additionalArtifacts;
    }

    struct ClinicalTrial {
        uint id;
        uint parentId;
        string name;
        address createdBy;
        uint createdAt;

        // string[] generalInformation;
        // string[] rareDiseaseClauses;
    }

    struct PatientConsents {
        uint count;
        mapping(uint => Consent) consents;
    }

    uint patientsCount = 0;
    mapping(uint => address) public patients;
    mapping(address => PatientConsents) public patientsConsents;

    uint public clinicalTrialsCount = 0;
    mapping(uint => ClinicalTrial) public clinicalTrials;

    address[] public researchers = [
        0xbEB9826bBa0AC436A4a12dCC584A0b2346405068,
        0xB4B0bF3942651724d34327694787e24Bd2147AA5,
        0x85D0304fB869448B460BEFAA8fB246A6C4E2b72C
    ]; 

     constructor() public{
        
    }


    modifier onlyResearchers() {
        require(isResearcher(), "Only researchers can perform this action");
        _;
    }


    function isResearcher() private view returns (bool) {
        for (uint i = 0; i < researchers.length; i++) {
            if (researchers[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }


    function createClinicalTrial(
        string memory _name
    ) public onlyResearchers {
        clinicalTrialsCount++;
        clinicalTrials[clinicalTrialsCount] = ClinicalTrial({
            id: clinicalTrialsCount,
            parentId: 0,
            name: _name,
            createdBy: msg.sender,
            createdAt: block.timestamp
            
        });
    }


    function updateClinicalTrial(
        uint _clinicalTrialId,
        string[] memory _generalInformation,
        string[] memory _rareDiseaseClauses
    ) public onlyResearchers {
        require(_clinicalTrialId >= 1 && _clinicalTrialId <= clinicalTrialsCount, "Invalid clinical trial ID");
        
        clinicalTrialsCount++;
        
        clinicalTrials[clinicalTrialsCount] = ClinicalTrial({
            id: clinicalTrialsCount,
            parentId: _clinicalTrialId,
            name: clinicalTrials[clinicalTrialsCount].name,
            createdBy: msg.sender,
            createdAt: block.timestamp
        });
        
        for (uint i = 1; i <= patientsCount; i++) {
            address patientAddr = patients[i];
            PatientConsents storage patientConsents = patientsConsents[patientAddr];
            
            for (uint j = 1; j <= patientConsents.count; j++) {
                Consent storage consent = patientConsents.consents[j];
                
                if (consent.clinicalTrialId == _clinicalTrialId) {
                    consent.status = ConsentStatus.EXPIRED;
                    consent.statusChangedAt = block.timestamp;
                    consent.statusChangedBy = msg.sender;
                    
                    requestConsent(patientAddr, clinicalTrialsCount, j,
                        consent.expiresAt, consent.additionalInformation
                        );
                }
            }
        }
    }



    function getClinicalTrials() public view returns (ClinicalTrial[] memory) {
        ClinicalTrial[] memory ret = new ClinicalTrial[](clinicalTrialsCount);
        for (uint i = 0; i < clinicalTrialsCount; i++) {
            ret[i] = clinicalTrials[i+1];
        }
        return ret;
    }



    function getClinicalTrialConsents(uint _clinicalTrialId) public view returns (Consent[] memory) {
        require(isResearcher(), "Access not allowed");
        require(_clinicalTrialId >= 1 && _clinicalTrialId <= clinicalTrialsCount, "Invalid clinical trial ID");
        
        // Determine the number of consents (non-dynamic array)
        uint consentsNb = 0;
        for (uint i = 0; i < patientsCount; i++) {
            PatientConsents storage patientConsents = patientsConsents[patients[i+1]];
            for (uint j = 0; j < patientConsents.count; j++) {
                Consent storage consent = patientConsents.consents[j+1];
                if (consent.clinicalTrialId == _clinicalTrialId) {
                    consentsNb++;
                }
            }
        }
        
        // Store all consents in an array that will be returned
        Consent[] memory consents = new Consent[](consentsNb);
        uint consentCount = 0;
        for (uint i = 0; i < patientsCount; i++) {
            PatientConsents storage patientConsents = patientsConsents[patients[i+1]];
            for (uint j = 0; j < patientConsents.count; j++) {
                Consent storage consent = patientConsents.consents[j+1];
                if (consent.clinicalTrialId == _clinicalTrialId) {
                    consents[consentCount++] = consent;
                }
            }
        }

        return consents;
    }



    function requestConsent(
        address _patientAddr,
        uint _clinicalTrialId,
        uint _parentId,
        uint _expiresAt,
        string memory _additionalInformation
    ) public onlyResearchers {
        PatientConsents storage patientConsents = patientsConsents[_patientAddr];
        
        if (patientConsents.count == 0) {
            patientsCount++;
            patients[patientsCount] = _patientAddr;
        }
        
        patientConsents.count++;
    
        patientConsents.consents[patientConsents.count] = Consent({
            id: patientConsents.count,
            parentId: _parentId,
            clinicalTrialId: _clinicalTrialId,
            requestedBy: msg.sender,
            patient: _patientAddr,
            status: ConsentStatus.REQUESTED,
            statusChangedAt: block.timestamp,
            statusChangedBy: msg.sender,
            createdAt: block.timestamp,
            expiresAt: _expiresAt,
            additionalInformation: _additionalInformation
        });
    }



    function rejectConsent(uint _consentId) public {
        PatientConsents storage patientConsents = patientsConsents[msg.sender];
        require(_consentId >= 1 && _consentId <= patientConsents.count, "Invalid consent ID");
        require(patientConsents.consents[_consentId].status == ConsentStatus.REQUESTED, "Consent not in 'REQUESTED' status");
        patientConsents.consents[_consentId].status = ConsentStatus.REJECTED;
    }



    function getPatientConsents(address _patientAddr) public view returns (Consent[] memory) {
        require(_patientAddr == msg.sender || isResearcher(), "Access not allowed");
        
        Consent[] memory consents = new Consent[](patientsConsents[_patientAddr].count);
        for (uint i = 0; i < patientsConsents[_patientAddr].count; i++) {
            consents[i] = patientsConsents[_patientAddr].consents[i+1];
        }

        return consents;
    } 


}
