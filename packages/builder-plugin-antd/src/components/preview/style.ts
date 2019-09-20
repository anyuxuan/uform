import styled from 'styled-components'

export const Container = styled.div`
  &.preview-panel {
    flex: 1;
    min-height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    padding: 16px;

    form > .rs-uform-content > .field-wrapper {
      border: 1px solid transparent;
      position: relative;

      &:hover,
      &:focus {
        cursor: pointer;
        border: 1px dotted blue !important;
        outline: none;
      }
    }

    form > .rs-uform-content .layout {
      padding: 20px 0;
      border: 1px dashed #ddd !important;

      & > .field-wrapper {
        border: 1px solid transparent;
        position: relative;

        &:hover,
        &:focus {
          cursor: pointer;
          border: 1px dotted blue !important;
          outline: none;
        }
      }
    }
  }
`
