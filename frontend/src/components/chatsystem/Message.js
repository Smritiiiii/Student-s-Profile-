import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  /* background: #929292; */
`;
const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <MessageContainer className='MessageContainer'>
        <div className={`MessageContainer__message--${classs}`}>
          <span className='MessageContainer__message--user'>{user}</span>
          <br />

          <span className='poppins_regular_400'>{message}</span>
        </div>
      </MessageContainer>
    );
  }
  return (
    <MessageContainer className='MessageContainer'>
      <div className={`MessageContainer__message--${classs}`}>
        <span className='MessageContainer__message--user'>User</span>
        <br />

        <span className='poppins_regular_400'>{message}</span>
      </div>
    </MessageContainer>
  );
};

export default Message;


// import React from "react";
// import styled from "styled-components";

// const MessageContainer = styled.div`
  
// `;

// const Message = ({ user, message, classs, timestamp }) => {
//   const isCurrentUser = user === "You";

//   return (
//     <MessageContainer className={`MessageContainer ${isCurrentUser ? "current-user" : "other-user"}`}>
//       <div className={`MessageContainer__message--${classs}`}>
//         <span className='MessageContainer__message--user'>{isCurrentUser ? "You" : user}</span>
//         <br />
//         <span className='poppins_regular_400'>{message}</span>
//         {timestamp && <span className='timestamp'>{timestamp}</span>}
//       </div>
//     </MessageContainer>
//   );
// };

// export default Message;
