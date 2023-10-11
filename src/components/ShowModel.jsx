import React, { useState } from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function ShowModel(props) {
    const history = useHistory();
    let url = `${process.env.REACT_APP_API_KEY}/students`;
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    function editBtn(params) {
        history.push(`/editStudents/${props.item._id}/${props.item.name}/${props.item.fatherName}/${props.item.registrationNo}/${props.item.contact}/${props.item.dob}`)
    }
    async function deleteBtn(params) {
        try {
            let response = await fetch(url + `/del/${props.item._id}`, {
                method: "DELETE"
            });
            let data = await response.json();
            alert(data.message)
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <>
            <div className="card">
                <div className="leading" onClick={toggleShow}>
                    <span className="circle">{props.index + 1}</span>
                    <div className="row">
                        <div className="name">{props.item.name}</div>
                        <div className="reg-no">{props.item.registrationNo}</div>
                    </div>
                </div>
                <MDBDropdown>
                    <MDBDropdownToggle color='light'>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu style={{ padding: '10px' }}>
                        <MDBDropdownItem style={{ fontSize: "16px", fontWeight: "bold" }} onClick={deleteBtn}>Delete</MDBDropdownItem>
                        <hr />
                        <MDBDropdownItem onClick={editBtn} style={{ fontSize: "16px", fontWeight: "bold" }} >Edit</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </div>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{props.item.name}</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="det-col">
                                <div className="det-row">
                                    <span className="title">Name : </span>
                                    <span className="value">{props.item.name}</span>
                                </div>
                                <div className="det-row">
                                    <span className="title">Father Name : </span>
                                    <span className="value">{props.item.fatherName}</span>
                                </div>
                                <div className="det-row">
                                    <span className="title">Registration No : </span>
                                    <span className="value">{props.item.registrationNo}</span>
                                </div>
                                <div className="det-row">
                                    <span className="title">Contact : </span>
                                    <span className="value">{props.item.contact}</span>
                                </div>
                                <div className="det-row">
                                    <span className="title">Date of Birth : </span>
                                    <span className="value">{props.item.dob}</span>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}