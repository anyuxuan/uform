import styled from 'styled-components'

export const Container = styled.div`
  &.preview-panel {
    flex: 1;
    min-height: 100vh;
    margin: 20px;

    form > .rs-uform-content > div {
      border: 1px solid transparent;
      position: relative;

      &:hover {
        cursor: pointer;
        border: 1px dotted blue;
      }
    }
  }
`
