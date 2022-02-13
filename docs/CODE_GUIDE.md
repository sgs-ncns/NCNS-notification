
# 🤗코드 리뷰

안녕하십니까 SGS DEV CAMP NCNS팀의 프론트 개발자 성종현 인턴, iOS 개발자 한상혁 인턴입니다!

# 🙌시작하기에 앞서..

- 서버의 기능이 많아 백엔드 팀원들의 수고로움을 덜기 위해서 프론트엔드 개발자끼리 고심해서 만든 서버입니다!

### 사용 프레임워크

- 성종현 인턴의 타입스크립트 사용 가능함, 생산성과 빠른 구현을 위해 **Express 프레임워크**를 채택하였습니다.

### 디자인 패턴

- 백엔드 팀원들이 보다 쉽게 이해할 수 있도록 Spring과 마찬가지 패턴인 **MVC 패턴**을 사용하였습니다.

### 사용 DB

- DB 설계가 능숙하지 못하여 설계에 시간이 많이 투자되고 있어서 관계 설정이 필요 없고 빠른 읽기와 쓰기가 가능한 NoSQL 중 **MongoDB**를 채택하게 되었습니다.

### 사용 푸시 라이브러리

- FCM
- AMQP (MQTT)

## 🗂패턴 적용 원칙

### Model

- Mongo DB의 document의 형태를 정의합니다.

### Controller(routes)

- 엔드 포인트로써 담겨온 정보를 서비스 로직 함수를 호출하여 수행합니다.

### Service

- 컨트롤러에 들어온 정보들을 받아 DB값을 읽고 쓰는 로직을 수행합니다.

### Utils

- 저희가 구현한 배치 처리 로직이 담겨 있습니다.

## 🤔이 부분 고민 많이 했어요!

### 1분간 모아서 알림을 전송하는 부분입니다.

- 배치 처리가 필요한 이유
    - 저희 프로젝트에 인스타그램의 팔로우 기능 뿐 아니라 좀 더 깊은 관계를 맺을 수 있는 깐부(구독) 기능을 추가하였습니다.
    - 이에 따라 깐부 알림은 정말 빠르게 받아야 하지만, 일반 알림까지 빠르게 받게 된다면 사용자는 수많은 푸시를 받게 될 것이라고 생각하였습니다.
    - 또한, 인스타그램을 사용하며 게시물 업로드 시 좋아요와 댓글에 대한 푸시 알림이 계속 뜨게 되는 불편함을 방지하고자 배치 처리를 추가하게 되었습니다.
- 파일 위치
    - [https://github.com/sgs-ncns/NCNS-notification/blob/master/src/services/schedular.ts](https://github.com/sgs-ncns/NCNS-notification/blob/master/src/services/schedular.ts)

배치 처리를 위해 처음엔 캐시를 생각하였습니다.

캠프장님 강의에서 IO 연산보다 CPU 연산이 빠르다는 강의를 듣게 되었고, IO 연산인 캐시 사용보다 CPU를 사용할 수 있는 로직 처리에 대해서 고민해보았습니다.

자바스크립트에서 지원하는 컬렉션 Map을 사용하여 좋아요나 댓글이 눌린 id에 대한 키 값이 현재 Map상에 존재하면 Map에서 해당하는 id 값을 찾아 숫자를 1 늘려줍니다. 

존재하지 않으면 새로 생성을 하고, setTimeout 함수를 통해 1분 뒤에 내부에 작성된 FCM에 1분간 모아진 좋아요 개수와 댓글 개수를 보내는 콜백 함수를 호출합니다. 

### MQTT 프로토콜을 사용한 깐부 알림입니다.

- 파일 위치
    - [https://github.com/sgs-ncns/NCNS-notification/blob/master/src/services/MQPubService.ts](https://github.com/sgs-ncns/NCNS-notification/blob/master/src/services/MQPubService.ts)

저희는 깐부 푸시에 대한 목표 설정이 “누구보다 빠른 알림”이었습니다.

FCM과 Kafka 등과 같이 여러 가지 메시징 라이브러리에 대해 고민하였으며, 여러 방면으로 비교를 해보다가 IoT 분야에서 많이 사용되고 있는 MQTT라는 프로토콜에 대해 알게 되었습니다.

MQTT는 FCM이 사용하는 HTTP 프로토콜보다 신뢰성이 높으며 가볍고 대용량 전송에 특화되어 있는 것으로 조사되었습니다.

[https://stackshare.io/stackups/firebase-cloud-messaging-vs-mqtt](https://stackshare.io/stackups/firebase-cloud-messaging-vs-mqtt)

오픈 소스로 잘 정리되어 있음을 확인한 저희는 가시성이 좋은 Rabbit MQ에서 지원하는 AMQP 라이브러리를 이용하여 사용자에게 큐를 할당하여 메시징 처리를 하는 방법을 선택하게 되었습니다.

# 긴 글 확인 해주셔서 감사드립니다.

# 이상 성종현 인턴 한상혁 인턴이었습니다. 고생하셨습니다!👏
