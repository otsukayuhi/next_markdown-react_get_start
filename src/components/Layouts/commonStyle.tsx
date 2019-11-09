import styled from '@emotion/styled';
import BreakPoints from 'const/Breakpoints';

export const BaseContentStyle = styled.div`
  margin: 0 auto;
  padding: 60px 20px 30px;
  min-width: 200px;
  max-width: 880px;

  @media (min-width: ${BreakPoints.md}px) {
    padding: 50px 45px;
  }
`;
