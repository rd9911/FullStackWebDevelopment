const CreateForm = (props) => {
    return (
        <div>
            Create new
            <form onSubmit={props.handleSubmit}>
                title <input value={props.title} onChange={({target}) => { props.handleChangeTitle(target.value)} } /><br />
                author <input value={props.author} onChange={({target}) => { props.handleChangeAuthor(target.value)} } /><br />
                url <input value={props.url} onChange={({target}) => { props.handleChangeUrl(target.value)} } /><br />
                <input type='submit' value='create' />
            </form>
            <div>
                <input type='button' value='cancel' onClick={props.handleCancelClick} />
            </div>
        </div>
        
    )
}

export default CreateForm