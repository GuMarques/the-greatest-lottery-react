import styled from "styled-components";

export const CustomNotificationTab = styled.div`
  width: 100%;
  height: 60px;
  background-color: aquamarine;
  color: white;
  position: absolute;
  /* top: -60px; */
  transition: all 0.3s ease-out;
  &.error {
    background-color: red;
  }
  &.sucess {
    background-color: green;
  }
  &.open {
    opacity: 1;
    transform: translateY(0);
  }
  &.close {
    opacity: 0;
    transform: translateY(-100%);
  }
  
`;

export const NotificationParagraph = styled.p`
text-align: center;
  font-size: 25px;
  font-weight: bold;
  font-style: italic;
  margin: 0;
  line-height: 60px;
`;