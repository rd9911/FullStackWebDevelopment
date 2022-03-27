import React from 'react'
import { CoursePart } from '../utils'

function assertNever (value: never): never {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

export default function Part({course}: {course: CoursePart}) {
    switch (course.type) {
        case "normal":
            return <div>
                        <h1>{course.name} {course.exerciseCount}</h1>
                        <p>{course.description}</p>
                    </div>;
        case "groupProject":
            return  <div>
                        <h1>{course.name} {course.exerciseCount}</h1>
                        <p>{course.groupProjectCount}</p>
                    </div>;
        case "submission":
            return <div>
                        <h1>{course.name} {course.exerciseCount}</h1>
                        <p>{course.exerciseSubmissionLink}</p>
                        <p>{course.description}</p>
                    </div>;
        case "special":
            return <div>
                        <h1>{course.name} {course.exerciseCount}</h1>
                        <p>{course.description}</p>
                        <p>{course.requirements.map( (required, i) => i === course.requirements.length - 1 ? required : required + ", " )}</p>
                    </div>;
        default:
            return assertNever(course)
    }
}