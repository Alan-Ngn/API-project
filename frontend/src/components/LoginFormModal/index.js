import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link, useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal).then(history.push(`/`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const onClick = (e) =>{
    e.preventDefault();
    return dispatch(sessionActions.login({ credential:'DemoUser', password: 'demouser' }))
      .then(closeModal).then(history.push(`/`))
  }
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
      <h1>Log In</h1>
        {errors.credential && (
          <p className="errors">{errors.credential}</p>
        )}
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button className="default-button" disabled={!credential || !password} type="submit">Log In</button>
      <button className="default-button" onClick={onClick}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
