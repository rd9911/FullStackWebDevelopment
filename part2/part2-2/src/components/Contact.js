import { nanoid } from 'nanoid'


export const Contact = ({contact}) => <li key={nanoid()}>{contact.name} {contact.number}</li>