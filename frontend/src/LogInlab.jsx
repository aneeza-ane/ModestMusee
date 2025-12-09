import { useRef } from "react";
function LogInlab(){
 const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
    console.log(buttonRef.current.value);
  }
    return(
         <>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3 col-5 ms-2">
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} type="text" name="" id="username" />
        </div>
        <div className="row mb-3 col-5 ms-2">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" name="" id="password" />
        </div>
        <button className="col-5 ms-2" ref={buttonRef} type="submit" value="login">LogIn</button>
      </form>
    </>
    );

}
export default LogInlab;