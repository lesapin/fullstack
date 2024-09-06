const Login = ({ username, setUsername, password, setPassword, handleLogin }) => (
  <div>
    <h2>login to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username: <input type='text' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password: <input type='text' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  </div> 
 )

export default Login
