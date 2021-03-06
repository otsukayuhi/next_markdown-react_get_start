import styled from '@emotion/styled';

export const WrapperStyle = styled.nav`
  padding: 50px 20px;
  width: 240px;
  height: 100vh;
  background-color: rgb(247, 247, 247);
`;

export const HeadingStyle = styled.h2`
  font-size: 20px;
`;

export const ListStyle = styled.ol`
  margin-top: 15px;
  padding-left: 1em;
`;

export const ItemStyle = styled.li`
  font-size: 13px;

  & + & {
    margin-top: 7px;
  }

  a {
    color: #000;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
