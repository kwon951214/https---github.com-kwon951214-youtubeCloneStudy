# 3강
//package.json
start - server부분 가동
backend - nodemone <= 코드 수정할때 자동적으로 새로 변환된 코드를 인식해서 보여주는 라이브러리
frontend - client 부분 가동
dev - concurrently <= server와 client 부분을 함께 가동할 수 있게 도와주는 라이브러리

//functional component - class conponent

//app.js
null - 아무나
false - login 한 사람 못 들어감
true - login 한 사람만 들어감

* 서버 포트와 클라이언트 포트는 달라야 함!

# 4강
* state = value 값들을 저장해놓는거-> server에 state에 있는 것들을 한꺼번에 보낼 수 있음
useState() = 괄호 안에 있는 값이 state 초기 값. 숫자나 문자 타입을 가질 수 있음


# 알아본 것들

* 클라이언트 사이드 렌더링 (Client Side Rendering - CSR)
- 페이지를 최초에 한 번 로딩한 후 데이터만 변경하여 사용할 수 있는 거(Single Page Application)
- 변화된 UI를 유저의 브라우저에서 만들게 하는 거

* 서버 사이드 렌더링 (Server Side Rendering - SSR)
- 요청할 때마다 새로고침->서버로부터 리소스 전달받고 해석->화면에 렌더링(Multi page Application)
- 서버 단에서 변화된 데이터로 화면을 미리 만들어서 완성본을 전달

* 리액트 작동 원리
(컴포넌트를 정의하고 통합하여 렌더링)
-index.js : HTML, javascript 조합하고 컴포넌트 렌더링
-App.js : 컴포넌트를 정의하는 프로그램 (실제로 화면에 표시되는 내용들이 여기서 정의)
-index.html : index.js에 의해 렌더링된 결과가 표시
=> App.js에서 추가한 내용을 index.html에 삽입하는데 그 과정을 index.js가 가능하도록 해줌

* 자바스크립트 <= 단일 스레드 기반 언어 ( 한번에 하나씩 작업을 진행)
- 자바스크립트 엔진
  : Memory Heap (메모리 할당이 일어나는 곳) & Call Stack (호출 스택이 쌓이는 곳)으로 구성되어 있음
  : Callback queue & Call Stack
  
# 5강
* const 변수 = () <-파라미터로 받는 값
* axios = ajax처럼 request를 서버에 보내고 받고 하는 거
* /server의 index.js에서 라우트를 먼저 읽고 옴
npm install multer --save <= 서버에 파일을 저장하기 위해 dependency 다운 받는거

# 7강
* RDBMS <=> Mongo DB
  tables - collections
  rows   - documents
  columns - fields