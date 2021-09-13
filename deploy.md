⚙️ babel/cli 설치하기
- src 안의 sexy javascript 코드를, 호환성 좋은 옛날 코드로 변경하기 위함.
- 이유는 babel의 실행속도가 느려서 deploy할 때는 좋지 않음.

⚙️ scripts 속 "build:server": "babel src -d build"
- babel/cli를 이용하여 src를 build라는 directory에 변경하여 저장(빌드)해라.

⚙️ scripts 속 "start": "node build/init.js"
- node로 build/init.js를 실행하라
- build 폴더 속에 views가 없어도 되는 이유는? <app.set("views", process.cwd() + "/src/views")> 로 이미 위치를 지정해놨기 때문에 알아서 src/views로 찾아가서 실행함.
- 특별히 이것만 "run" 없이 "npm start"로 실행 가능함. 기본 워딩으로 설정되어 있어서 가능함.
🚨 regeneratorRuntime is not defined 오류 나옴. 해결방법은?
- init.js 파일 맨 위에 <import "regenerator-runtime";> 넣기

⚙️ scripts 속 "dev:assets": "webpack --mode=development -w"
- webpack.config.js 파일 속에서 "mode" 및 "watch" 삭제하고, scripts 속에 cli 명령어로 직접 넣어주기 (https://webpack.js.org/api/cli/ 에 cli 명령어 나와 있음)
⚙️ scripts 속 "build:assets": "webpack --mode=production"
- "build:assets"을 실행하면, production 모드로 실행됨.
- watch는 하지 않기 때문에 콘솔창 대기 없이 바로 꺼짐.
- 이렇게 하면, production 모드로 assets 파일을 실행함.

⚙️ "build": "npm run build:server && npm run build:assets"
- 불러내기 편하게 이렇게 묶어줘도 됨.

⚙️ Heroku 회원가입 및 "create new app"하기
- Heroku에 백엔드 서버 업로드하는 방법 2가지 (1. Heroku Git / 2. GitHub)

1. Heroku Git 활용하여 업로드하기
- https://dashboard.heroku.com/apps/wetube-coco/deploy/heroku-git
- 콘솔창에 Heroku CLI 설치하기
- 콘솔창에 heroku login 입력하여 로그인하기 등 https://dashboard.heroku.com/apps/wetube-coco/deploy/heroku-git 에 나온대로 따라서 모두 하기
- 