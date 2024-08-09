import React from 'react';
import { MagnifyingGlass } from "react-loader-spinner";

const LoadingSpinner = ({ isLoading }) => (
  isLoading && (
    <div className="loading-spinner">
      <MagnifyingGlass visible={true} height={80} width={80}
        ariaLabel="MagnifyingGlass-loading"
        glassColor="#bbc1c3"
        color="#394c54"
      />
    </div>
  )
);

export default LoadingSpinner;
