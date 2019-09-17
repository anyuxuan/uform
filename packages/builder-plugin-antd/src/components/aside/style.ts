import styled from 'styled-components'

export const Container = styled.div`
  &.aside {
    width: 48px;
    height: 100%;
    border-right: 1px solid rgba(31, 56, 88, 0.1);
    padding-top: 15px;

    .aside-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      cursor: pointer;

      .icon {
        width: 32px;
        height: 32px;
      }
    }
  }
`
