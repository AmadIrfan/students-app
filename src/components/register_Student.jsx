import React, { useState, useEffect } from 'react'
import AppBar from './appBar'
import { useParams } from 'react-router-dom';
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import {
  MDBInput, MDBBtn
} from 'mdb-react-ui-kit'

function RegisterStudent(props) {

  const { student, name, fName, registrationNo, contact, dob } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [btnText, setBtnText] = useState('Save');
  const [head, setHead] = useState('Add new');

  useEffect(() => {
    if (student) {
      try {

        setBtnText('update');
        setHead('Update')
        let date = new Date(dob);
        date.toISOString().substring(0, 10)
        function setData() {
          document.getElementById('name').value = name;
          document.getElementById('f-name').value = fName;
          document.getElementById('edu-year').value = registrationNo.split('-')[0];
          document.getElementById('select-dept').value = registrationNo.split('-')[1];
          document.getElementById('regNo').value = registrationNo.split('-')[2];
          document.getElementById('dob').value = date.toISOString().substring(0, 10);
          document.getElementById('contact').value = contact.substring(3, contact.length)
        }
        setData()
      }
      catch (err) {
        alert(err.message);
      }
    }
  }, [contact, dob, fName, name, registrationNo, student])




  async function onSubmitBtn(e) {
    e.preventDefault();
    try {
      const name = document.getElementById('name').value
      const fName = document.getElementById('f-name').value
      const year = document.getElementById('edu-year').value
      const dpt = document.getElementById('select-dept').value
      const rNo = document.getElementById('regNo').value
      const dob = document.getElementById('dob').value
      const contact = `+92${document.getElementById('contact').value}`
      let regNo = `${year}-${dpt}-${rNo}`;
      let data = {
        name: name,
        registrationNo: regNo,
        fatherName: fName,
        dob: dob,
        contact: contact,
      };
      if (!student) {
        if (!loading) {
          setLoading(true);
          setBtnText('saving ...');
          let url = `${process.env.REACT_APP_API_KEY}/students/reg-students`
          let response =
            await fetch(url, {
              method: 'POST'
              , headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            },);
          let reData = await response.json();
          if (reData['status'] === 'error') {
            setTimeout(() => {
              setError('');
            }, 2000);
            setError(reData['message']);
          } else if (reData['status'] === 'ok') {
            setError(reData['message']);
            setTimeout(() => {
              setError('');
            }, 2000);
          }
          setBtnText('save');
          setLoading(false);
        } else {
          alert('plz wait data is saving ...')

        }
      }
      else {
        setLoading(true);
        setBtnText('updating ...');
        let url = `${process.env.REACT_APP_API_KEY}/students/${student}`;
        let response =
          await fetch(url, {
            method: 'PUT'
            ,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
          },);
        let reData = await response.json();
        if (reData['status'] === 'error') {
          setTimeout(() => {
            setError('');
          }, 2000);
          setError(reData['message']);
        } else if (reData['status'] === 'ok') {
          setError(reData['message']);
          setTimeout(() => {
            setError('');
          }, 2000);
        }

        setBtnText('update');
        setLoading(false);
      }
    }
    catch (err) {
      alert(err.message);
    }
  }
  return (
    <div>
      <AppBar />
      <div className='Form-stu' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
        <form onSubmit={onSubmitBtn} className='stud-Form'>
          <h2 className="form-title">{head} Students</h2>
          <MDBInput label='Name' id='name' name='name' type='text' size='lg' />
          <br />
          <MDBInput label='Father Name' id='f-name' name='fatherName' type='text' size='lg' />
          <br />

          <MDBInputGroup className='mb-3'>
            <input className='form-control' id='edu-year' placeholder='Year' name='select-Val' type='number' value={'2021'} />
            <select className='select-item' name='dept' id='select-dept' >
              <option value={'CS'}>CS</option>
              <option value={'EE'}>EE</option>
              <option value={'CE'}>CE</option>
            </select>
            <input className='form-control' id='regNo' name='registrationNo' placeholder='Roll No' type='number' />
          </MDBInputGroup>
          <MDBInput label='Date of Birth' id='dob' name='dob' type='date' size='lg' />
          <br />
          <MDBInputGroup noWrap textBefore='+92'>
            <input className='form-control' type='text' name='contact' id='contact' placeholder='Phone Number' />
          </MDBInputGroup>
          <br />
          <MDBBtn rounded style={{ width: '100%', textTransform: "lowercase" }} >{btnText}</MDBBtn>
        </form>
        <div className="error-text">{error}</div>
      </div>

    </div>
  )
}

export default RegisterStudent


