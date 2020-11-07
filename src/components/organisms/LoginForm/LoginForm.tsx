import React from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import ValidationInput from "@/components/molecules/ValidationInput";
import Alert from '@/components/molecules/Alert';

interface LoginFormProps {
  email: string;
  password: string;
}

function LoginForm({
  email,
  password
}: LoginFormProps): React.ReactElement {
    const onIgnoreBlurEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <h2>로그인</h2>
      <Form>
        <ValidationInput 
          placeholder="이메일" 
          value={email}/>
        <ValidationInput 
          placeholder="패스워드" 
          value={password}/>
          <Button type="submit" onMouseDown={onIgnoreBlurEvent}>
            로그인
          </Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 2rem;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    text-align: center;
  }

  form {
    margin: 0 auto;
  }

  input {
    margin-bottom: 0.5rem;
  }

  button {
    width: 100%;
  }
`;

// const LoginForm = ({
//   email,
//   emailEl,
//   emailError,
//   isFailedLogin,
//   isFetching,
//   loginFailMessage,
//   onBlurEmail,
//   onBlurPassword,
//   onChangeEmail,
//   onChangePassword,
//   onSubmit,
//   onToggleFailAlert,
//   password,
//   passwordEl,
//   passwordError
// }: LoginFormProps): JSX.Element => {
//   const onIgnoreBlurEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//   };
  
//   return (
//     <>
//       <UserTitle>로그인</UserTitle>
//       <Form onSubmit={onSubmit}>
//         <ValidationInput
//           type="email"
//           name="email"
//           inputEl={emailEl}
//           errorMessage={emailError}
//           onBlur={onBlurEmail}
//           onChange={onChangeEmail}
//           placeholder="이메일"
//           value={email}
//         />
//         <ValidationInput
//           type="password"
//           name="password"
//           errorMessage={passwordError}
//           onBlur={onBlurPassword}
//           onChange={onChangePassword}
//           inputEl={passwordEl}
//           placeholder="비밀번호"
//           value={password}
//         />
//         <Button type="submit" onMouseDown={onIgnoreBlurEvent}>
//           { isFetching ? '로그인 중...' : '로그인' }
//         </Button>
//         <Button
//          style={{
//            display: "block",
//            width: "100",
//            height: "3rem",
//            lineHeight: "3rem"
//          }}
//          variant="outlined" to="/user/join">
//           회원가입
//         </Button>
//       </Form>
//       <Alert 
//         title="로그인 실패"
//         isShown={isFailedLogin}
//         onClick={onToggleFailAlert}
//         onClose={onToggleFailAlert}
//       >
//         {loginFailMessage}
//       </Alert>
//     </>
//   );
// };

export default LoginForm;
