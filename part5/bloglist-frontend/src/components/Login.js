const Login = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        username <input type='text' name='username' id='getUsername' value={props.username} onChange={({target}) => props.handleChangeUsername(target.value)} />
        <br /> password <input type='text' name='password' id='getPassword' value={props.password} onChange={({target}) => props.handleChangePassword(target.value)} />
        <input type='submit' name='submit' id='submitForm' value='Submit' />
    </form>
    )
}

export default Login