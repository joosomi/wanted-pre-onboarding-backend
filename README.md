### 채용 웹 서비스를 위한 API 서버
*기술 스택 : Node.js, Express, SQLite*

### 기능 
1. 채용공고 등록
회사는 채용 공고를 등록할 수 있습니다.
2.	채용공고 수정
등록된 채용 공고의 세부 정보를 수정할 수 있습니다.
3.	채용공고 삭제
등록된 채용 공고를 삭제할 수 있습니다.
4.	채용공고 목록 조회
사용자는 채용 공고 목록을 조회할 수 있습니다.
회사명, 포지션, 사용 기술 등으로 검색할 수 있습니다.
5.	채용 상세 페이지 조회
사용자는 특정 채용 공고의 상세 정보를 조회할 수 있습니다.
해당 회사의 다른 채용 공고도 함께 조회할 수 있습니다.
6.	채용공고 지원
사용자는 특정 채용 공고에 지원할 수 있습니다.
동일한 공고에 중복 지원은 불가능합니다.

---

### 주요 API 명세 
## 1. 채용공고 API
- **URL**: `POST /jobs`
- **설명**: 새로운 채용 공고를 등록합니다.

```
{
  "company_id": 1,
  "position": "백엔드 개발자",
  "reward": 1000000,
  "description": "백엔드 개발자를 모집합니다.",
  "skills": "Node.js"
}
```

- **URL**: `PUT /jobs/:id`
- **설명**: 기존의 채용 공고를 수정합니다.

```
{
  "position": "백엔드 시니어 개발자",
  "reward": 1500000,
  "description": "백엔드 시니어 개발자를 모집합니다.",
  "skills": "Node.js, AWS"
}`
```
- **URL**: `DELETE /jobs/:id`
- **설명**: 특정 채용 공고를 삭제합니다.

- **URL**: `GET /jobs`
- 검색 시 : `/jobs?search=백엔드`
- **설명**: 등록된 모든 채용 공고 목록을 조회하며, 검색이 가능합니다.


## 2. 공고 지원 API 
- **URL**: `POST /applications/apply`
- **설명**: 사용자가 특정 채용 공고에 지원합니다.


```json
{
  "jobId": 1, 
  "userId": 2 
}
```

---


### 프로젝트 디렉토리 구조 
```plaintext
├── config           # 데이터베이스 설정 파일들
├── models           # Sequelize 모델 정의
├── routes           # API 라우트 정의
├── utils            # 유틸리티 함수 (예: responseHandler)
├── tests            # 테스트 코드
├── controllers      # 비즈니스 로직이 포함된 컨트롤러
├── middleware       # 미들웨어 (예: errorHandler)
└── app.js           # Express 앱 초기화 및 설정
```

---

## 프로젝트 설치 및 실행 방법
```
# 1. 패키지 설치
npm install

# 2. 시작
node app.js

# 3. 테스트 코드 실행
npm test 
