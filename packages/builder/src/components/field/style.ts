import styled from 'styled-components'

export const Container = styled.div`
  &.field-panel {
    width: 300px;
    min-height: 100vh;
    position: fixed;
    left: 48px;
    z-index: 3;
    border-right: 1px solid rgba(31, 56, 88, 0.1);
    background: #ffffff;

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
      justify-content: space-between;
      padding: 10px;

      .field-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: grab;
        width: 80px;

        .icon {
          width: 24px;
          height: 24px;
          margin-bottom: 10px;
        }

        .label {
          color: rgba(0, 0, 0, 0.6);
          font-size: 12px;
        }
      }
    }
  }
`
