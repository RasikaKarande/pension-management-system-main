import React from 'react'
//import { getBankByIdService, addBankService, deleteBankService } from './services/BankService';
import { getAllPensionerService, addPensionerService, updatePensionerService, deletePensionerService } from "./services/PensionerService";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
//import { getBankById, addbankdetails, deletebankbyaccno,updatebankdetails } from '../redux/BankSlice';
import { getallPensioner,addPensioner , updatePensioner ,deletePensioner } from '../redux/PensionerSlice';
import axios from 'axios';

    const PensionerData = props => {
    const [pensioner_id, setPensioner_id] = useState('');
    const dispatch = useDispatch();
    const pensionerDataFromStore = useSelector((state) => state.pensioner.pensionerState);
    const [newPensionerObj, setNewPensionerObj] = useState('');
    const [displayPensionerObj, setDisplayPensionerObj] = useState('');
    const [updatePensioner, setUpdatePensioner] = useState('');
    const [displayUpdatePensioner, setDisplayUpdatePensioner] = useState('');


    const handlePensioner = (e) => {
        console.log('handlePensioner');
        setPensioner_id(e.target.value);
    }
    const handleAddPensioner = (e) => {
        console.log(e.target.value);
        setNewPensionerObj({
            ...newPensionerObj,
            [e.target.name]: e.target.value
        });
    }
    // const handleUpdatePensioner = (e) => {
    //     console.log(e.target.value);
    //     setUpdatePensioner({
    //         ...updatePensioner,
    //         [e.target.name]: e.target.value
    //     });
    // }

    // const submitGetBankById = (evt) => {
    //     evt.preventDefault();
    //     console.log('submitGetBankById');
    //     getBankByIdService(accno)
    //         .then((response) => { dispatch(getBankById(response.data)) })
    //         .catch(() => {
    //             alert(`Bank with accno: ${accno} not found.`);
    //         });
    //     setAccno('');
    // }
    const submitDeletePensioner = (evt) => {
        evt.preventDefault();
        console.log('submitDeletePensioner');
        deletePensionerService(pensioner_id)

            .then((response) => {
                dispatch(deletePensioner(response.data))
                alert('Pensioner Deleted ');
            })

            .catch(() => {
                alert(`Pensione with pensioner_id: ${pensioner_id} not found.`);
            });
        setPensioner_id('');
    }
    const addPensioner = (evt) => {
        evt.preventDefault();
        axios.post(`addPensioner`, newPensionerObj)
            .then((response) => {
                setDisplayPensionerObj(response.data);
                alert('Pensioner Details  added successfully.');
                setNewPensionerObj({ pensioner_id:'', age: '', aadhar: '', pan:"", salary:"", acc_No:"", pensionType:"", pensionDetails:"", bankDetails:"" })
            })
            .catch(() => {
                alert("Pensioner Details Could Not Be Added.");
            });
    }

    // const updatePensioner = (evt) => {
    //     evt.preventDefault();
    //     axios.post(`updatePensioner`, updatePensionerDetails)
    //         .then((response) => {
    //             setDisplayUpdatePensionerDetails(response.data);
    //             alert('Pensioner Details update successfully.');
    //             setDisplayUpdatePensionerDetails({ age: '', aadhar: '', pan:"", salary:"", acc_No:"", pensionType:"", pensionDetails:"", bankDetails:"" })
    //         })
    //         .catch(() => {
    //             alert("Pensioner could not be updated.");
    //         });
    // }

  return (
        <div className="container">
            <h1 className="display-4 text-primary mt-3 mb-3" >Pensioner Component</h1>
            <p>Fetch data from backend, store it in redux store and get it to component</p>

            <div className="col-4 border border-light shadow p-3 mb-5 bg-white">
                {/* <p>Search Bank Account</p>
                <form className="form form-group form-primary" onSubmit={submitGetBankById}>
                    <input className="form-control mt-3" type="number" id="accno" name="accno" value={accno} onChange={handleBank} placeholder="Enter accno to search" />
                    <input className="form-control mt-3 btn btn-primary" type="submit" value="Find Bank" />
                </form> */}
                <table className="table table-light table-striped ">
                    <thead>
                        <tr>
                            <th>Pensioner_id</th>
                            <th>Age</th>
                            <th>Aadhar</th>
                            <th>Pan</th>
                            <th>Salary</th>
                            <th>Acc_No</th>
                            <th>PensionType</th>
                            <th>PensionDetails</th>
                            <th>BankDetails</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{pensionerDataFromStore.pensioner_id}</td>
                            <td>{pensionerDataFromStore.age}</td>
                            <td>{pensionerDataFromStore.aadhar}</td>
                            <td>{pensionerDataFromStore.pan}</td>
                            <td>{pensionerDataFromStore.salary}</td>
                            <td>{pensionerDataFromStore.acc_No}</td>
                            <td>{pensionerDataFromStore.pensionType}</td>
                            <td>{pensionerDataFromStore.pensionDetails}</td>
                            <td>{pensionerDataFromStore.bankDetails}</td>
                            


                        </tr>
                    </tbody>
                </table>
            </div>

            <p>--------------------</p>
            <br></br>
            <div className="container">

                <div className="col-4 border border-light shadow p-3 mb-5 bg-white">
                    <p>Remove Pensioner Details</p>
                    <form className="form form-group form-primary" onSubmit={submitDeletePensioner }>
                        <input className="form-control mt-4" type="number" id="pensioner_id" name="pensioner_id" value={pensioner_id} onChange={handlePensioner} placeholder="Enter Pensioner Id to delete the details" />
                        <input className="form-control mt-4 btn btn-danger" type="submit" value="Remove Pensioner Details" />
                    </form>


                </div>
             

                <p>-----------------------------------------------------------------------------------------------------</p>
                <div className="container">
                    <div className="col-4 border border-light shadow p-3 mb-5 bg-white">
                        <p>Add Pensioner Details</p>

                        <input className="form-control mt-3" type="text" id="pensioner_id" name="pensioner_id" value={newPensionerObj.setPensioner_id} onChange={handleAddPensioner} placeholder="Enter Pensioner_id" />
                        <input className="form-control mt-3" type="number" id="age" name="age" value={newPensionerObj.age} onChange={handleAddPensioner} placeholder="Enter Age" />
                        <input className="form-control mt-3" type="number" id="aadhar" name="aadhar" value={newPensionerObj.aadhar} onChange={handleAddPensioner} placeholder="Enter Aadhar number" />
                        <input className="form-control mt-3" type="number" id="pan" name="pan" value={newPensionerObj.pan} onChange={handleAddPensioner} placeholder="Enter Pan number" />
                        <input className="form-control mt-3" type="number" id="salary" name="salary" value={newPensionerObj.salary} onChange={handleAddPensioner} placeholder="Enter Slary" />
                        <input className="form-control mt-3" type="number" id="acc_no" name="acc_No" value={newPensionerObj.acc_No} onChange={handleAddPensioner} placeholder="Enter Account number" />
                        <input className="form-control mt-3" type="text" id="pensionType" name="pensionType" value={newPensionerObj.pensionType} onChange={handleAddPensioner} placeholder="Enter PensionType" />
                        <input className="form-control mt-3" type="number" id="pensionDetails" name="pensionDetails" value={newPensionerObj.pensionDetails} onChange={handleAddPensioner} placeholder="Enter pensionDetails" />
                        <input className="form-control mt-3" type="number" id="bankDetails" name="bankDetails" value={newPensionerObj.bankDetails} onChange={handleAddPensioner} placeholder="Enter Bank Details" />

                        <input className="form-control mt-3 btn btn-primary" type="submit" value="Add Pensioner" onClick={addPensioner} />
                        <table className="table table-light table-striped ">
                            <thead>
                                <tr>
                                <th>Pensioner_id</th>    
                                <th>Age</th>
                                <th>Aadhar</th>
                                <th>Pan</th>
                                <th>Salary</th>
                                <th>Acc_no</th>
                                <th>PensionType</th>
                                <th>PensionDetails</th>
                                <th>BankDetails</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{displayPensionerObj.pensioner_id}</td>
                                    <td>{displayPensionerObj.age}</td>
                                    <td>{displayPensionerObj.pan}</td>
                                    <td>{displayPensionerObj.aadhar}</td>
                                    <td>{displayPensionerObj.salary}</td>
                                    <td>{displayPensionerObj.acc_No}</td>
                                    <td>{displayPensionerObj.pensionType}</td>
                                    <td>{displayPensionerObj.pensionDetails}</td>
                                    <td>{displayPensionerObj.bankDetails}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

<p>-------------------------------------------------</p>
                {/* <div className="container">
                    <div className="col-4 border border-light shadow p-3 mb-5 bg-white">
                        <p>update Pensioner Details</p>
                        <input className="form-control mt-3" type="text" id="pensioner_id" name="pensioner_id" value={updatePensionerDetails.setPensioner_id} onChange={handleUpdatePensioner} placeholder="Enter Pensioner_id" />
                        <input className="form-control mt-3" type="number" id="age" name="age" value={updatePensionerDetails.age} onChange={handleUpdatePensioner} placeholder="Enter Age" />
                        <input className="form-control mt-3" type="number" id="aadhar" name="aadhar" value={updatePensionerDetails.aadhar} onChange={handleUpdatePensioner} placeholder="Enter Aadhar number" />
                        <input className="form-control mt-3" type="number" id="pan" name="pan" value={updatePensionerDetails.pan} onChange={handleUpdatePensioner} placeholder="Enter Pan number" />
                        <input className="form-control mt-3" type="number" id="salary" name="salary" value={updatePensionerDetails.salary} onChange={handleUpdatePensioner} placeholder="Enter Slary" />
                        <input className="form-control mt-3" type="number" id="acc_no" name="acc_No" value={updatePensionerDetails.acc_No} onChange={handleUpdatePensioner} placeholder="Enter Account number" />
                        <input className="form-control mt-3" type="text" id="pensionType" name="pensionType" value={updatePensionerDetails.pensionType} onChange={handleUpdatePensioner} placeholder="Enter PensionType" />
                        <input className="form-control mt-3" type="number" id="pensionDetails" name="pensionDetails" value={updatePensionerDetails.pensionDetails} onChange={handleUpdatePensioner} placeholder="Enter pensionDetails" />
                        <input className="form-control mt-3" type="number" id="bankDetails" name="bankDetails" value={updatePensionerDetails.bankDetails} onChange={handleUpdatePensioner} placeholder="Enter Bank Details" />
                        

                        <input className="form-control mt-3 btn btn-primary" type="submit" value="Update Pensioner Details" onClick={updatePensioner} />
                        <table className="table table-light table-striped ">
                            <thead>
                                <tr>
                                <th>Pensioner_id</th>    
                                <th>Age</th>
                                <th>Aadhar</th>
                                <th>Pan</th>
                                <th>Salary</th>
                                <th>Acc_no</th>
                                <th>PensionType</th>
                                <th>PensionDetails</th>
                                <th>BankDetails</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{displayUpdatePensionerDetails.pensioner_id}</td>
                                    <td>{displayUpdatePensionerDetails.age}</td>
                                    <td>{displayUpdatePensionerDetails.pan}</td>
                                    <td>{displayUpdatePensionerDetails.aadhar}</td>
                                    <td>{displayUpdatePensionerDetails.salary}</td>
                                    <td>{displayUpdatePensionerDetails.acc_No}</td>
                                    <td>{displayUpdatePensionerDetails.pensionType}</td>
                                    <td>{displayUpdatePensionerDetails.pensionDetails}</td>
                                    <td>{displayUpdatePensionerDetails.bankDetails}</td>
                                    


                                </tr>
                            </tbody>
                        </table>
                    </div> */}

                </div>
            {/* </div> */}

        </div>

    );
}
export default PensionerData;



