import React from 'react';
import Header from '../Layout/Header'

export default function index(props) {
  return (
    <>
      <Header/>
      {props.children}
    </>
  )
}


