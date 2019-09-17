import styled from 'styled-components'

export const Container = styled.div`
  &.basic-layout {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }

  .aside {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .field-panel {
    position: absolute;
    top: 0;
    left: 49px;
    bottom: 0;
  }

  .preview-panel {
    margin: 0 280px 0 48px;
  }

  .config-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
  }
`
