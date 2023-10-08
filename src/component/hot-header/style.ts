import styled from 'styled-components'

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c10d0c;
  .hot-left {
    height: 35px;
    display: flex;
    color: #999;
    .icon {
      width: 34px;
      height: 34px;
      &-circle {
        width: 10px;
        height: 10px;
        border: 3px solid #c10d0c;
        border-radius: 50%;
        margin: 0 auto;
        transform: translateY(12px);
      }
    }
    .header {
      display: flex;
      align-items: center;
      > h3 {
        font-size: 20px;
        color: #333;
      }
      &-keywords {
        margin-left: 18px;
        > a {
          font-size: 14px;
          color: #999;
        }
        > a:hover {
          color: #666;
          text-decoration: underline;
        }
        > span {
          margin: 0 10px;
        }
        > span:last-child {
          display: none;
        }
      }
    }
  }
  .hot-right {
    display: flex;
    align-items: center;
    > a {
      color: #999;
      margin-right: 10px;
    }
    > a:hover {
      color: #666;
      text-decoration: underline;
    }
  }
`
