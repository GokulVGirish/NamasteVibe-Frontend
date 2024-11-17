import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#fff"
      secondaryColor="#fff"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Spinner