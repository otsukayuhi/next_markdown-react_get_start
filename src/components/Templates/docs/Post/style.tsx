import styled from '@emotion/styled';
import { css } from '@emotion/core';
import BreakPoints from 'const/Breakpoints';

export type NavStyleProps = {
  isNavShow: boolean;
};

const transition = css`
  transition: transform 0.3s ease-out;
`;

export const WrapperStyle = styled.div`
  overflow: hidden;
`;

export const MenuButtonWrapperStyle = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  z-index: 1;
  opacity: 0.7;

  @media (min-width: ${BreakPoints.md}px) {
    display: none;
  }
`;

export const ContentWrapperStyle = styled.div<NavStyleProps>`
  transform: translateX(${props => (props.isNavShow ? '240px' : '0')});
  ${transition}

  @media (min-width: ${BreakPoints.md}px) {
    margin-left: 240px;
    transform: translateX(0)
  }
`;

export const NavWrapperStyle = styled.div<NavStyleProps>`
  position: fixed;
  height: 100vh;
  transform: translateX(${props => (props.isNavShow ? '0' : '-240px')});
  ${transition}

  @media (min-width: ${BreakPoints.md}px) {
    transform: translateX(0)
  }
`;
