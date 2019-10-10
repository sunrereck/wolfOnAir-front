// 각 테스트 케이스가 끝날 때마다 기존에 가상의 화면에 남아있는 UI를 정리한다.
import '@testing-library/react/cleanup-after-each';

// jest에서 DOM관련 matcher를 사용 할 수 있게 해준다.
import '@testing-library/jest-dom/extend-expect';
