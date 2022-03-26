import React from 'react'

export interface ContentProps {
    name: string;
    exerciseCount: number;
}

export default function Content( props: ContentProps[] ) {
  return (
    <div>
        { props.map( part => {
            <div>
                <p> {part.name} {part.exerciseCount} </p>
            </div>
        }) }
    </div>
  )
}
