import Logo from "./logo";
import img1 from "../assets/password.png";
import img2 from "../assets/passwordon.png";
// import cross from "../assets/cross.png"
import edit  from "../assets/setting_logo.png"
import { useEffect, useRef, useState } from "react";

function Manager() {

  // state for Password manager
  const [key, setKey] = useState(null);
  const [passwordImg, setpasswordImg] = useState(img1);
  const [pass , setpass] = useState(false);
  const passwordInp = useRef();
  const userNameInp = useRef();
  const siteInp = useRef();
  const [addBtn, setaddBtn] = useState(true);
  const [form, setform] = useState({
    site: "",
    userName: "",
    password: "",
  });
  const [passwordArray, SetpasswordArray] = useState([]);

  // when ever page reload data from localstorage  will save in password array 
  useEffect(() => {
    const check = localStorage.getItem("password");
    if (check) {
      SetpasswordArray(JSON.parse(check));
    }
  }, []);

  //whenever any change occured in form input form state will update
  const handleform = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  // this function will show password or hide password
  const showpassword = () => {
    if (passwordImg == img1) {
      setpasswordImg(img2);
      passwordInp.current.type = "text";
    } else {
      setpasswordImg(img1);
      passwordInp.current.type = "password";
    }
  };

  // this function will add password when even form submited
  const addPassword = (e) => {
    e.preventDefault();
    console.log(form);
    const { site, password, userName } = form;
    if (site && password && userName) {
      SetpasswordArray([...passwordArray, form]);
      localStorage.setItem(
        "password",
        JSON.stringify([...passwordArray, form])
      );
      removeValueOfForm();
    } else {
      alert("Bro Fill form first");
    }
  };

  // whenEver user want to edit form this function handle 
  const handleEdit = (e) => {
    e.preventDefault();
    const i = e.target.id;
    setKey(e.target.id);
    form.site = passwordArray[i].site;
    form.userName = passwordArray[i].userName;
    form.password = passwordArray[i].password;
    updateInput();
    setaddBtn(false);
    console.log(passwordArray);
  };

  //update input value when user call this function
  const updateInput = () => {
    passwordInp.current.value = form.password;
    userNameInp.current.value = form.userName;
    siteInp.current.value = form.site;
  };

  //user can update password 
  function updatePassword() {
    const newpass = passwordArray[key];
    newpass.userName = form.userName;
    newpass.password = form.password;
    newpass.site = form.site;
    localStorage.setItem(
      "password", JSON.stringify([...passwordArray])
    );
    removeValueOfForm();
    setaddBtn(true);
  }

  const removeValueOfForm = () => {
    setform({
      site: "",
      userName: "",
      password: "",
    });
    passwordInp.current.value = "";
    userNameInp.current.value = "";
    siteInp.current.value = "";
  }

  function showpass(e) {
    if (e.target.innerText == ".......") 
      e.target.innerText = passwordArray[e.target.id].password;
    else 
      e.target.innerText = ".......";
    
  }

  const handleDelete = (e) => {
        
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 min-h-[calc(100vh-60px)] bg-sky-200  p-4">
        <h1 className="w-full items-center text-center font-medium text-gray-600 ">
          <Logo /> Your Personal Password Manager
        </h1>

        <form className="w-3/6  flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Site name..."
            className="px-4 py-1"
            onChange={handleform}
            ref={siteInp}
            name="site"
          />
          <div className="w-full flex userform  ">
            <input
              type="text"
              className="w-2/3 px-4 py-1"
              placeholder="UserName..."
              ref={userNameInp}
              name="userName"
              onChange={handleform}
            />
            <div className="bg-white flex">
              <input
                type="password"
                className="w-4/5 px-4 py-1"
                ref={passwordInp}
                placeholder="Password"
                onChange={handleform}
                name="password"
              />
              <div className="w-1/5 flex  justify-center">
                <img src={passwordImg} id="passImg" onClick={showpassword} />
              </div>
            </div>
          </div>
        </form>

        <button
          className="bg-slate-500 text-white rounded-md px-2   py-0.5 mt-4 text-xl"
          onClick={addBtn ? addPassword : updatePassword}
        >
          {addBtn ? "Add Password" : "Update Password"}
        </button>

        <h2>--Password list--</h2>
        <table className="table w-3/6 mx-auto border-2   border-slate-500 rounded-xl ">
          <thead className="overflow-hidden text-green-600 ">
            <tr>
              <th>__Site__</th>
              <th className="userNameInTable text-center border-slate-500 border-2">
                UserName
              </th>
              <th className="text-center border-slate-500 border-2">
                Password
              </th>
              <th className="text-center border-slate-500 border-2">Edit</th>
            </tr>
          </thead>
          <tbody className="overflow-hidden">
            {passwordArray.map((task, index) => {
              return (
                <tr
                  className="border-2 border-slate-500 overflow-hidden"
                  key={index}
                >
                  <th className="border-l text-wrap break-words overflow-hidden">
                    {task.site}
                  </th>
                  <th className="border-l border-slate-500 overflow-y-hidden userNameInTable overflow-hidden">
                    {task.userName}
                  </th>
                  <th
                    className="border-l border-slate-500 cursor-pointer"
                    id={index}
                    onClick={showpass}
                  >
                    .......
                  </th>
                  <th
                    className="border-l border-slate-500 cursor-pointer justify-center flex"
                    id={index}
                    onClick={handleEdit}
                  >
                    <img
                      src={edit}
                      className="w-8 "
                      onClick={handleEdit}
                      id={index}
                    />
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Manager;
