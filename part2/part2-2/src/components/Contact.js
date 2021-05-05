import { nanoid } from 'nanoid'


export const Contact = ({contact, deleteClick}) => {
    return (
        <div>
            <li key={nanoid()}>{contact.name} {contact.number}</li>
            <button onClick={deleteClick}>Delete</button>

        </div>
    )
}
