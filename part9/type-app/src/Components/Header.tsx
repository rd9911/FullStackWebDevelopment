import React from 'react'

interface HeaderProps {
    courseTitle: string;
}

export default function Header({ courseTitle }: HeaderProps) {
  return (
    <h1>{courseTitle}</h1>
  )
}
