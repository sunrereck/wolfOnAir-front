import React from "react";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import Form from '@/components/atoms/Form';
import ValidationInput from "@/components/molecules/ValidationInput";
import Alert from '@/components/molecules/Alert';

interface LoginFormProps {
  email: string;
  emailEl: React.RefObject<HTMLInputElement>;
  emailError: string;
  isFailedLogin: boolean;
  isFetchingLogin: boolean;
  loginFailMessage: string;
  onBlurEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onToggleFailAlert: () => void;
  password: string;
  passwordEl: React.RefObject<HTMLInputElement>;
  passwordError: string;
}

function LoginForm(): React.ReactElement {
    const onIgnoreBlurEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
    <Form>
      <Button type="submit" onMouseDown={onIgnoreBlurEvent}>
         로그인
      </Button>
    </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;

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
