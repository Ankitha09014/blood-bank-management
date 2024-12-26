import React, { useState } from 'react';
import InputType from './InputType';
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister } from '../../../services/authService';

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [name, setName] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    setPhone(value);
    if (value.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits.');
    } else {
      setPhoneError('');
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === 'login') return handleLogin(e, email, password, role);
          if (formType === 'register')
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        {/* Hidden dummy fields */}
        <input type="text" name="dummy-email" style={{ display: 'none' }} autoComplete="off" />
        <input type="password" name="dummy-password" style={{ display: 'none' }} autoComplete="off" />

        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value="donor"
              onChange={(e) => setRole(e.target.value)}
              
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donor
            </label>
          </div>
          {formType === 'login' && (
            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="adminRadio"
                value="admin"
                onChange={(e) => setRole(e.target.value)}
                
              />
              <label htmlFor="adminRadio" className="form-check-label">
                Admin
              </label>
            </div>
          )}
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value="hospital"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value="organisation"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organization
            </label>
          </div>
        </div>

        {(() => {
          switch (formType) {
            case 'login':
              return (
                <>
                  <InputType
                    labelText={
                      <>
                        Email <span className="text-danger">*</span>
                      </>
                    }
                    labelFor="custom-email"
                    inputType="email"
                    name="custom-email"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="off"
                  />
                  {emailError && <p className="text-danger">{emailError}</p>}
                  <InputType
                    labelText={
                      <>
                        Password <span className="text-danger">*</span>
                      </>
                    }
                    labelFor="custom-password"
                    inputType="password"
                    name="custom-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </>
              );
            case 'register':
              return (
                <>
                  {(role === 'admin' || role === 'donor') && (
                    <InputType
                      labelText={
                        <>
                          Name <span className="text-danger">*</span>
                        </>
                      }
                      labelFor="forName"
                      inputType="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === 'organisation' && (
                    <InputType
                      labelText={
                        <>
                          OrganizationName <span className="text-danger">*</span>
                        </>
                      }
                      labelFor="forOrganisationName"
                      inputType="text"
                      name="organisationName"
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === 'hospital' && (
                    <InputType
                      labelText={
                        <>
                          HospitalName <span className="text-danger">*</span>
                        </>
                      }
                      labelFor="forHospitalName"
                      inputType="text"
                      name="hospitalName"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={
                      <>
                        Email <span className="text-danger">*</span>
                      </>
                    }
                    labelFor="custom-email"
                    inputType="email"
                    name="custom-email"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="off"
                  />
                  {emailError && <p className="text-danger">{emailError}</p>}
                  <InputType
                    labelText={
                      <>
                        Password <span className="text-danger">*</span>
                      </>
                    }
                    labelFor="custom-password"
                    inputType="password"
                    name="custom-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                  <InputType
                    labelText={
                      <>
                        Address <span className="text-danger">*</span>
                      </>
                    }
                    labelFor="forAddress"
                    inputType="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={
                      <>
                        Phone <span className="text-danger">*</span>
                      </>
                    }
                    labelFor="forPhone"
                    inputType="text"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  {phoneError && <p className="text-danger">{phoneError}</p>}
                </>
              );
            default:
              return <p>Invalid form type</p>;
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === 'login' ? (
            <p>
              Not registered yet? Register
              <Link to="/register"> here!</Link>
            </p>
          ) : (
            <p>
              Already a user? Please
              <Link to="/login"> login!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
