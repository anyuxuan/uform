import styled from 'styled-components'

export const Container = styled.div`
  &.code-panel {
    display: ${props => (props.visible ? 'block' : 'none')};
    width: 300px;
    z-index: 10;
    border-right: 1px solid rgba(31, 56, 88, 0.1);
    background: #ffffff;
    max-height: 100%;
    overflow-y: scroll;

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      color: rgba(0, 0, 0, 0.8);
      background: rgba(31, 56, 88, 0.04);
    }

    .code-area {
      padding: 10px;
    }
  }
`
