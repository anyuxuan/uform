import styled from 'styled-components'

export const Container = styled.div`
  &.field-panel {
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

    .field-area {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;

      .field-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: grab;
        width: 93px;
        height: 88px;
        border-radius: 3px;

        &:hover {
          background: rgba(31, 56, 88, 0.1);
          transition: background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .icon {
          width: 24px;
          height: 24px;
          margin-bottom: 10px;
        }

        .label {
          color: rgba(0, 0, 0, 0.6);
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
`
