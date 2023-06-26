---
title:  "Final Project 발표"
excerpt: "Final"

categories:
  - Blog
tags:
  - [Blog, DevOps]

toc: true
toc_sticky: true
 
date: 2023-06-25
last_modified_at: 2023-06-25
---

# 요구사항 분석
자유 시나리오에 따른 시나리오 설정을 진행.

## 프로젝트 시나리오

### 미션 관리 서비스

기능 요구사항
- 개인 사용자와 스트리머는 로그인 기능을 통해 토큰을 발급받을 수 있다.
- 토큰을 사용하는 로직 구현이 어렵다면 유저 데이터베이스에 접근해서 일치하는 사용자 정보가 있는 것을 확인하는 것으로 대체
- 개인 사용자 새로운 미션을 입력 및 조회할 수 있다.
- 스트리머는 미션에 대해 성공 및 실패를 선택할 수 있다.
- 성공 및 실패가 결정된 경우 개인 사용자는 해당 미션의 결과에 대한 email을 받을 수 있다.
- 미션을 수행하는 제한시간을 설정할 수 있다.
- 캐쉬를 충전하는 기능, 미션마다 포인트 설정, 성공하면 지급되야되고 실패 시 반환된다.
- 이미 생성된 미션에 경우 생성한 유저 이외의 유저도 캐쉬를 추가할 수 있다.

인프라 요구사항
- 시스템 전반에 가용성, 내결함성, 확장성, 보안성이 고려된 서비스들이 포함되어야한다.
- 하나 이상의 컴퓨팅 유닛에 대한 CI/CD 파이프라인이 구성되어야한다.
- 유저 데이터를 저장하고 있는 유저 데이터베이스는 다른 데이터베이스와 분리되어있어야한다.
- 미션 데이터를 기반으로 미션 성공에 대해 처리하는 시스템은 데이터 유실을 막기 위해 느슨하게 결합되어야한다.
- 시스템 메트릭 또는 저장된 데이터에 대한 하나 이상의 시각화된 모니터링 시스템이 구축되어야한다.


### 유저 시나리오
[role] 미션 만든사람 <br>
- 최초 미션 내용 설정
- 포인트 설정
- 제한시간 설정
- 직접 Update 권한 없고(포인트 추가만 가능), Delete 권한 없음
- 사실 상 만들고 난 후엔 일반 사용자랑 똑같음
- 굳이 role 1, role 2 를 구분할 필요는 없는 것 같음

[role] 일반 시청자
- 미션 조회 가능
- 포인트 추가 가능

[role] 스트리머
- 미션 성공/실패 여부 마크
(미션 accept/reject 할 수 있으나 우선순위 아님)
- 시스템이 해야 할 일
- 미션 성공/실패 후 -> is_active: false
- 포인트 교환
- 어느 사용자가 해당 미션에 대해 얼마를 걸었고, 그 포인트가 성공 여부에 따라 자동 지급되어야 함


### ERD 작성
![alt text](images/dbdiagram.png)

처음에는 미션의 베팅 정보를 가진 하나의 Table을 관리하려고 하였지만, EDA를 적용시키기 위해, Event_log라는 독자적인 DB Table을 설계하였다.

### Server 기술스택 설정
language - javascript
- 팀원들의 코딩 수준이 비슷한 자바스크립트 채택

Framework - Next.js
- 서버 프레임워크는 fastify 와 express 둘 중 고민
- 사용 경험 자체가 fastify 와 express 말고는 없는 점

fastify
- fastify 는 express 에 비해 커뮤니티가 활성화 되지 않아 정보가 부족함
- 사용률이 낮아 정보가 매우 적은 편
- 성능이 가장 좋음

express
- express 는 커뮤니티가 많이 활성화 되어 정보가 많다 *중요
- 진입장벽이 낮다

nextjs - 채택
- 현재 점유율이 가장 좋은 프레임워크중 하나로 express 와 마찬가지로 커뮤니티가 많이 활성화 되어 정보가 많다 *중요
- 사용만 가능하다면 최고의 프레임워크로 생각
- 러닝커브 높음, 진입장벽이 조금 있다, 리액트의 개념도 포함되어 있기 때문
- 프론트엔드 작업도 같이 할 수 있다
- server 와 client 를 별도로 나누질 않음

nextjs 채택 이유
- 커뮤니티가 많이 활성화 되어 정보가 많다
- 새로운 기술
- 2022 점유율이 가장 높으며 현재 핫한 프레임워크인 점
- express 와 fastify 두 서버 프레임워크에서 다뤄본 것과 유사, testing 완료
- routing 이 디렉토리로 하는 점 == fastify
- 미들웨어 == express
- 추후에 시간이 남을 경우 바로 client 작업이 가능한 점


##   아키텍처 다이어그램
![alt text](images/diagram.png)

왜 EDA를 채용해서 진행했는가?
- 기존에 구상하던 아키텍처로는 미션에 유저들이 금액을 얼마나 넣는지에 대한 정보를 가진 테이블을 구상하고 있었다. <br>
조금 관점을 다르게해서 베팅에 대한 로그로 쌓고 있다가, 미션완료라는 이벤트가 발생하면, 그때 "특정 id에 대한 로그를 취합해서, 최종 금액이 얼만지 계산한 후, 실제로 돈이 오가는 액션을 취하는 아키텍처"를 구상하게 되었다. <br>
이러한 이벤트를 다루는 아키텍처를 생성하는것이 흥미롭다고 생각했다.

EKS를 선택한 이유가 있는가?
- 

Failsafe 관련된 인프라가 부족해 보인다.
- 부족한 점으로써 꼽을 수 있었는데, 아키텍처 회의때 CTO분께서도 관련된 조언을 해주셨지만, 아키텍처 상에 여러번 수정이 가해지고, 그에 대한 부분을 놓쳤다고 생각된다.<br>
내결함성이나 보안성을 고려해서 lambda에서 WAS로 들어오는 요청 사이에 SQS와 DLQ를 배치해서 FailSafe를 고려해 볼 수 있었다고 판단된다.<br>

### 아키텍처 시나리오
- 유저는 로그인 엔트포인트에서 로그인 후, 토큰 발급 받음
- users 엔드포인트에서 user에 대한 정보를 확인할 수 있다.
- missions 엔드포인트에서 mission에 대한 생성 및 수정, 읽기를 할 수 있다.
- missions/[missionId]/event에서 특정 이벤트 발생시, 이벤트에 관련된 작업들을 실행할 수 있다.(Eventbridge에 event 발생, Dynamodb에 이벤트 로그 작성)
- missions/[missionId]/fail, success, bet에서 이벤트 발생시 트리거된 람다에서 들어오는 요청에 대해 실질적인 RDS 작업을 한다.(bet의 경우 유저의 cash를 차감, mission reward에 금액 추가, fail, success의 경우, success는 해당 스트리머에게 reward를 지급, fail의 경우 cash를 환급)


## 트러블 슈팅
## CI/CD
### github action 관련
Dockerfile을 찾지 못함<br>
일단 이 시점에서 만든 github action은 내가 만든 WAS를 docker image로 만들어 ECR로 배포하는 action을 구성하였다.

최초에는 action template으로 action을 생성했는데,<br>
에러: Dockerfile not found 발생<br>
원인: WAS를 image로 만드는 Dockerfile을 만들지 않은 상태에서, action을 먼저 생성시켜 이미지 빌드시에 에러가 발생했다.

이후 WAS 디렉토리에 Dockerfile을 만들고, Action을 실행하였더니,

에러: Dockerfile not found 발생<br>
원인: Dockerfile이 github action이 작업하는 디렉토리와 다른 디렉토리에 있는 것이 원인이였다.<br>
해결: github action은 checkout으로 레포지토리의 내용을 가져가고, 레포지토리의 루트에서 작업을 하는데, WAS는 /server 디렉토리 안에 있느 상황이였기에, action 중간에 cd server 명령어를 추가해 주었다.

에러: docker image build failed, Dockerfile 내부의 npm run build 작업에서 오류 발생<br>
원인: build하기 위한 파일이 부족. npm run build를 하기 전에 Copy . . 으로 작업 디렉토리로 파일들을 복사해가야하는데 해당 작업 전에 npm run build가 실행됨. 빌드할 리소스들이 없으니 에러가 발생.<br>
해결: Dockerfile의 명령 순서를 변경하였다.


#### github action 트리거 push에서 pull request로 변경했을때 문제
내 로컬 상에서는 작동이 되었지만, upstream 레포지토리에 PR를 생성하였을 때는 에러가 발생했다.

발생한 에러는 AWS credential에서 로그인하지 못하는 에러가 발생하였는데
원인은 secret에 저장된 access key를 가져오지 못하는 것이였다.<br>
github action 트리거가 pull request일 시에, 안전을 위해 action에서 참조하지 못하기에 발생하는 오류였다.

에러를 고치기 위한 시도가 있었다.

1. on: pull_request: type: -synchronize => pull request가 동기화될 때마다 트리거 => 아예 트리거가 안됨
2. on: pull_request: types: - closed => pull request가 close 될때 트리거 => 아예 트리거가 안됨=> 지금 생각해본다면, branches와 paths가 같이 조건으로 설정되어 있는데, 이들 중에 조건이 안맞았던 것으로 추측됨.
3. on: push로 돌아옴

해당 트리거로 추구했던것은 PR이 merge되면 WAS 관련 디렉토리가 변경될 시에 CI/CD가 트리거되는 것이였다.<br>
PR이 Merge될때의 트리거를 여러 방면으로 찾다가, github discussion에서 on: push하고 paths를 설정하면 된다는 글을 확인하였다.


#### kustomize
EKS manifest 파일의 변경사항을 적용하여 새로 빌드해주는 kustomize를 적용시켰다.

문제: kubectl kustomize로 사용하였더니 정상적으로 빌드하지 못하는 문제 발생. <br>
원인: kubectl에 내장된 kustomize로 작동시에 kustomization.yaml을 제대로 파악하지 못하는 에러 발생 <br>
해결: kustomize를 따로 설치해서 사용하니 정상적으로 작동



#### Github action을 이용한 EKS 배포
최초에는 해당 방식으로 EKS CD를 진행했다.<br>
기존에 ECR에 배포되는 워크플로우에 manifest 파일이 저장된 위치로 이동하여 해당 위치에서 action 도중에 생성된 이미지의 새로운 태그를 가져다가 manifest를 해당 태그로 수정하였다.

여기서 문제가 하나 발생한다.<br>
Github action은 원격 환경이기 때문에 해당 환경에서 manifest를 수정해도 수정된 사항이 레포지토리에 반영되는 것이 아니다.<br>
즉 워크플로가 종료되면 변경된 사항이 휘발된다.

선택한 해결 방법은 manifest 변경점을 action에서 다른 레포지토리로 push하는 방법을 사용하였다.


#### 다른 레포지토리 Push 시에 문제점
문제점: Push에 access denied 오류가 발생 원인: github access token으로 인증을 해야하는데, 토큰 정보가 없음 <br>
해결: Github secrete에 access token을 넣어주고 이를 확인한 후 Push.




### EKS 관련 트러블슈팅
#### 0/1 nodes are available: 1 Too many pods. preemption: 0/1 nodes are available: 1 No preemption victims found for incoming pod.. <br>
문제:Worker node에 pod를 새로 배치할 자리가 없어서 생긴 오류.<br>
원인: EKS에는 t3.medium node 하나만 사용하는 상태였는데, node에는 17개의 pod를 할당할 수 있다.<br>
하지만 17개 이상으로 pod가 배치되려고 해서 생긴 오류 <br>
해결: Worker node Group에 최대 노드 개수를 2개로 늘린다. scaling 되면서 pod들이 분산된다.


#### waiting for a volume to be created, either by external provisioner “ebs.csi.aws.com” or manually created by system administrator
문제: Persistent volume들이 필요한 pod들이 볼륨을 생성하지 못하고 pending 되는 상태<br>
원인: AWS EBS를 PV로 사용하려면 접근권한을 설정해야 하는데, 권한이 설정되지 않았다.<br>
해결: Oidc-provider를 설정해주고, oidc-provider로 service account를 생성한다.
Service account를 가지고 CSI 드라이버 역할을 설정하고 addon으로 추가한다.<br>
Pending 상태의 Pod들을 다시 확인하면 정상적으로 배포된 것을 확인할 수 있다.