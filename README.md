# Wetube Reloaded

<!-- router: url과 controller 관리를 쉽게 해 줌. 미니 어플리케이션. -->
<!-- 프로젝트를 할 때는 어떤 종류의 데이터를 이용할 것인지 생각하기 ('비디오 & 유저' = 도메인) -->
<!-- 가장 좋은 것은 router를 도메인 별로 나누는 것임. -->
<!-- router는 주제를 기반으로 url을 그룹화해 줌. -->

<!-- 1. global router (root url: /) -->

/ -> Home <사실은 /videos/home>
/join -> Join <사실은 /users/join>
/login -> Login <사실은 /users/login>
/search -> Search(검색) <사실은 /videos/search>

<!-- 2. user router (root url: /user) -->

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/remove -> Delete My Profile

<!-- 3. video router (root url: /video) -->

/videos/:id -> See Video (동영상 보기, 좋아요, 댓글 모두 들어감)
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/video/upload -> Upload Video

<!-- /videos/comments -> Comment on a Video -->
<!-- /videos/comments/delete -> Delete a Comment of a Video -->

(router의 예) https://nomadcoders.co/wetube/lecture/2657 => 2657은 아이디임

<!-- router 논리의 예외 사항 -->

원래는 /join 이 아니라,
/users/join 이 맞지만,
마케팅 측면에서 홍보할 때 주소가 너무 길어지면 안 좋으니 예외로 둠.

<!-- 라우터: url이 어떻게 시작하는지에 따라 나누는 방법 -->

라우터가 없었다면? /delete-video-comment 와 같이 나눴을 것임.
라우터가 있어서 /video/comments/delete로 편하게 나눌 수 있음.
