import { colors } from '@/assets/styles/colors';
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframe animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Define the spinner component
const Spinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid ${colors.green};
  border-top-color: black;
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
`;

// Define the container component
const LoadingContainer = styled.div`
  display: flex;
  background-color: ${colors.black};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 12px;
  font-weight: 600;
  color: ${colors.green};
`;

const LoadingPage: React.FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
      Aguarde um momento...
    </LoadingContainer>
  );
};

export default LoadingPage;
