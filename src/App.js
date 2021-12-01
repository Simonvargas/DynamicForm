import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [nameForm, setNameForm] = useState(true);
  const [emailForm, setEmailForm] = useState(false);
  const [spouseQuest, setSpouseQuest] = useState(false);
  const [spouseForm, setSpouseForm] = useState(false);
  const [dependentQuest, setDependentQuest] = useState(false);
  const [dependentForm, setDependentForm] = useState(false);
  const [mailingAddressForm, setMailingAddressForm] = useState(false);

  const [getData, setData] = useState({});
  const [dependentTrue, setTrueDepenedent] = useState({});

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [children, setChildren] = useState(null);

  const [errors, setErrors] = useState([]);

  const [spouseFirstName, setSpouseFirstName] = useState("");
  const [spouseMiddleName, setSpouseMiddleName] = useState("");
  const [spouseLastName, setSpouseLastName] = useState("");
  const [spouseDob, setSpouseDob] = useState("");
  async function handle(e) {
    e.preventDefault();
    if (spouseFirstName && spouseLastName && spouseDob) {
      const res = await fetch(`/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account: { email: email },
          applicant: {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            date_of_birth: dob,
            spouse: {
              first_name: spouseFirstName,
              middle_name: spouseMiddleName,
              last_name: spouseLastName,
              date_of_birth: spouseDob,
            },
          },
          mailing_address: {
            address1: mailAddress,
            city: city,
            state: state,
            zip: zipCode,
          },
          dependents: {
            number_of_children: children,
          },
        }),
      });
      const data = await res.json();
      setErrors(data);
      console.log(errors);
      console.log("data", data);
    } else {
      const res = await fetch(`/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account: { email: email },
          applicant: {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            date_of_birth: dob,
          },
          mailing_address: {
            address1: mailAddress,
            city: city,
            state: state,
            zip: zipCode,
          },
          dependents: {
            number_of_children: children,
          },
        }),
      });
      const data = await res.json();
      setErrors(data);
      console.log("data", data);
    }
  }

  useEffect(() => {
    (async function () {
      const res = await fetch("http://localhost:8888");

      if (res.ok) {
        const data = await res.json();
        setData(data.application.applicant.fields.spouse.required);
        setTrueDepenedent(
          data.application.applicant.fields.dependents.required
        );
      }
    })();
  }, [setData]);

  function showSpouse(e) {
    e.preventDefault();
    if (e.target.value === "yes") {
      setSpouseQuest(false);
      setSpouseForm(true);
    } else {
      setSpouseQuest(false);
      setDependentQuest(true);
      setSpouseFirstName("");
      setSpouseMiddleName("");
      setSpouseLastName("");
    }
  }

  function showChildren(e) {
    e.preventDefault();
    if (e.target.value === "yes") {
      setDependentQuest(false);
      setDependentForm(true);
    } else {
      setDependentQuest(false);
      setMailingAddressForm(true);
      setChildren(null);
    }
  }

  function showEither(e) {
    e.preventDefault();
    setEmailForm(!emailForm);
    if (getData) {
      setSpouseQuest(true);
      return;
    }

    if (dependentTrue) {
      setDependentQuest(true);
    }
  }

  function showDependent(e) {
    e.preventDefault();
    setSpouseForm(false);

    if (dependentTrue) {
      setDependentQuest(true);
      return;
    }
    setMailingAddressForm(true);
  }

  function backFromDependent(e) {
    e.preventDefault();
    setDependentQuest(false);
    if (getData) {
      if (spouseFirstName || spouseLastName || spouseMiddleName || spouseDob) {
        setSpouseForm(true);
        return;
      }
      setSpouseQuest(true);
      return;
    }

    setEmailForm(true);
  }

  function goBackToChildren(e) {
    e.preventDefault();
    if (children > 0) {
      setMailingAddressForm(false);
      setDependentForm(true);
    } else {
      setMailingAddressForm(false);
      setDependentQuest(true);
    }
  }
  return (
    <div className="body">
      <div>
        <h1>Application</h1>
      </div>
      <div className="container">
        <form id="application_form">
          <div>
            <p style={{color: 'red', textAlign: 'center'}}>{errors.error || errors.received}</p>
          </div>
          {nameForm && (
            <div className="container1">
              <div>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  id="first_name"
                />
              </div>

              <div>
                <input
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  placeholder="Middle Name"
                  type="text"
                  name="middle_name"
                  id="middle_name"
                />
              </div>

              <div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  id="last_name"
                />
              </div>

              <div>
                <div className="label1" htmlFor="date_of_birth">
                  Date of Birth
                </div>
                <br></br>
                <input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                />
              </div>
              <button
                className="firstBtn"
                onClick={() => {
                  setNameForm(!nameForm);
                  setEmailForm(!emailForm);
                }}
              >
                Next
              </button>
            </div>
          )}

          {emailForm && (
            <>
              <div>
                <br></br>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <button
                className="back-btn"
                onClick={() => {
                  setEmailForm(!emailForm);
                  setNameForm(!nameForm);
                }}
              >
                Back
              </button>
              <button onClick={showEither}>Next</button>
            </>
          )}
          {spouseQuest && (
            <>
              <div className="label">Would you like to enroll your spouse?</div>
              <button
                className="back-btn"
                onClick={() => {
                  setSpouseQuest(false);
                  setEmailForm(true);
                }}
              >
                back
              </button>
              <button value="no" onClick={showSpouse}>
                No
              </button>{" "}
              <button value="yes" onClick={showSpouse}>
                Yes
              </button>
            </>
          )}
          {spouseForm && (
            <>
              {" "}
              <fieldset>
                <legend>Spouse (optional)</legend>
                <div>
                  <label for="spouse__first_name">First Name:</label>
                  <input
                    value={spouseFirstName}
                    onChange={(e) => setSpouseFirstName(e.target.value)}
                    type="text"
                    name="spouse__first_name"
                    id="spouse__first_name"
                  />
                </div>

                <div>
                  <label for="spouse__middle_name">Middle Name:</label>
                  <input
                    value={spouseMiddleName}
                    onChange={(e) => setSpouseMiddleName(e.target.value)}
                    type="text"
                    name="spouse__middle_name"
                    id="spouse__middle_name"
                  />
                </div>

                <div>
                  <label for="spouse__last_name">Last Name:</label>
                  <input
                    value={spouseLastName}
                    onChange={(e) => setSpouseLastName(e.target.value)}
                    type="text"
                    name="spouse__last_name"
                    id="spouse__last_name"
                  />
                </div>

                <div>
                  <div className="label1" for="spouse__date_of_birth">
                    Date of Birth
                  </div>
                  <input
                    value={spouseDob}
                    onChange={(e) => setSpouseDob(e.target.value)}
                    type="date"
                    name="spouse__date_of_birth"
                    id="spouse__date_of_birth"
                  />
                </div>
              </fieldset>{" "}
              <button
                className="back-btn"
                onClick={() => {
                  setSpouseForm(false);
                  setSpouseQuest(true);
                }}
              >
                Back
              </button>
              <button onClick={showDependent}>Next</button>
            </>
          )}

          {dependentQuest && (
            <>
              <div className="label">
                Would you like to enroll any dependent children?
              </div>
              <button className="back-btn" onClick={backFromDependent}>
                back
              </button>
              <button value="no" onClick={showChildren}>
                No
              </button>{" "}
              <button value="yes" onClick={showChildren}>
                Yes
              </button>
            </>
          )}

          {dependentForm && (
            <>
              <h2>Dependents</h2>
              <div>
                <div className="label" for="dependents__number_of_children">
                  Number of Children
                </div>
                <br></br>
                <input
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  type="number"
                  id="dependents__number_of_children"
                  name="dependents__number_of_children"
                  min="0"
                  step="1"
                  onKeyDown={(evt) =>
                    (evt.key === "." ||
                      evt.key === "e" ||
                      evt.key === "+" ||
                      evt.key === "-") &&
                    evt.preventDefault()
                  }
                />
              </div>
              <button
                className="back-btn"
                onClick={() => {
                  setDependentForm(false);
                  setDependentQuest(true);
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setDependentForm(false);
                  setMailingAddressForm(true);
                }}
              >
                Next
              </button>
            </>
          )}

          {mailingAddressForm && (
            <>
              <h2>Mailing Address</h2>
              <div>
                <input
                  value={mailAddress}
                  onChange={(e) => setMailAddress(e.target.value)}
                  placeholder="Address"
                  type="text"
                  name="address1"
                  id="address1"
                />
              </div>
              <div>
                <input
                  placeholder="Address 2"
                  type="text"
                  name="address2"
                  id="address"
                />
              </div>
              <div>
                <input
                  placeholder="Address 2"
                  type="text"
                  name="address3"
                  id="address3"
                />
              </div>
              <div>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  type="text"
                  name="city"
                  id="city"
                />
              </div>
              <div>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  type="text"
                  name="state"
                  id="state"
                />
              </div>
              <div>
                <input
                  value={zipCode}
                  onChange={(e) => setZipcode(e.target.value)}
                  placeholder="Zipcode"
                  type="text"
                  name="zip"
                  id="zip"
                />
              </div>
              <button className="back-btn" onClick={goBackToChildren}>
                Back
              </button>
              <button onClick={handle} type="submit">
                Submit
              </button>{" "}
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
