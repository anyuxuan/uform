import styled from 'styled-components'

export const Container = styled.div`
  &.config-panel {
    width: 280px;
    background: #ffffff;
    border-left: 1px solid rgba(31, 56, 88, 0.1);

    .header {
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(31, 56, 88, 0.1);
    }

    .container {
      padding: 20px;
    }
  }
`
