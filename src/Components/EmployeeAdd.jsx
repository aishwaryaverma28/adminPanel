import React, {useState} from "react";
import "./Styles/Editor.css";
import styles from "./Styles/EmployeeUpdate.module.css";
const EmployeeAdd = () => {

const [name,setName] = useState("");
const [fname,setfName] = useState("");
const [lname,setlName] = useState("");
const [details, setDetails] = useState({
  name:"",
  hire_date:"",
  emp_no: "",
  position:"",
  address1:"",
  address2:"",
})
  function submitForm(event) {
    event.preventDefault();
  }

  function handleNameChange(event) {
    const empName = event.target.value;
    setName(empName);
        let arr = empName.split(" ");
    if (arr.length > 1)
    splitEmployeeNme(arr);   
  }
  function splitEmployeeNme(arr){
    setfName(arr[0]);
    setlName(arr[arr.length-1]);
  }
  // console.log(lname);
  return (
    <>
      <header className="headerEditor">
        <h2>Add a new Employee</h2>
      </header>
      <form className={styles.addEmployeeFrom}>
        <div className={styles.formDiv}>
          <div className={styles.leftForm}>
            <div className={styles.fromFiled}>
              <label for="">
                employee code<span>*</span>
              </label>
              <input
                type="text"
                name="employeecode"
                id="employeecode"
                placeholder="Please Enter Code"
              />
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                employee name<span>*</span>
              </label>

              <input
                type="text"
                name="employeename"
                id="employeename"
                placeholder="Please Enter Name"
                onChange={handleNameChange}
              />
            </div>
            <div className={styles.fromFiled} top-align>
              <label for="">
                current address<span>*</span>
              </label>

              <textarea
                type="textarea"
                id="currentaddress"
                rows="5"
                cols="5"
                placeholder="Please Enter Address"
              ></textarea>
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                date of joining<span>*</span>
              </label>

              <input type="date" name="date" id="date" placeholder="" />
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                client/franchisee<span>*</span>
              </label>

              <input type="text" name="client" id="client" placeholder="Please Enter Cilent" />
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                remarks<span>*</span>
              </label>

              <input type="text" name="remarks" id="remarks" placeholder="Please Enter Remarks" />
            </div>
            <div className={styles.fromFiled}>
              <label for="">registration date</label>

              <input
                type="date"
                name="registration"
                id="registration"
                placeholder=""
              />
            </div>
          </div>
          <div className={styles.rightForm}>
            <div className={styles.fromFiled}>
              <label for="">
                employee type<span>*</span>
              </label>

              <input
                type="text"
                name="employeetype"
                id="employeetype"
                placeholder="Please Enter Employee Type"
              />
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                phone number<span>*</span>
              </label>

              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                maxlength="10"
                placeholder="Please Enter Phone Number"
              />
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                permanent address<span>*</span>
              </label>

              <textarea
                type="textarea"
                id="permanentaddress"
                rows="5"
                cols="5"
                placeholder="Please Enter Permanent Address"
              ></textarea>
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                password<span>*</span>
              </label>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Please Enter Password"
              />
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                org name<span>*</span>
              </label>

              <input type="text" name="orgname" id="orgname" placeholder="Please Enter Organisation Name" />
            </div>
            <div className={styles.fromFiled}>
              <label for="">
                OTP<span>*</span>
              </label>

              <input type="text" name="otp" id="otp" placeholder="Please Enter the OTP" />
            </div>
            <div className={styles.saveBtnRight}>
              <button
                type="button"
                className={`${styles.secondaryBtn} ${styles.saveBtn}`}
                onClick={submitForm}
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmployeeAdd;
