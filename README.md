## 채용 웹 서비스를 위한 API 서버
*기술 스택 : Node.js, Express, SQLite*
- SQLite는 서버리스, 경량화, 간편한 설정으로 소규모 애플리케이션에 최적화된 RDBMS라 이를 선택했습니다.

### 기능 
1. 채용공고 등록
회사는 채용 공고를 등록할 수 있습니다.
2.	채용공고 수정
등록된 채용 공고의 세부 정보를 수정할 수 있습니다.
3.	채용공고 삭제
등록된 채용 공고를 삭제할 수 있습니다.
4.	채용공고 목록 조회
사용자는 채용 공고 목록을 조회할 수 있습니다.
회사명, 포지션, 사용 기술을 키워드로 검색할 수 있습니다.
5.	채용 상세 페이지 조회
사용자는 특정 채용 공고의 상세 정보를 조회할 수 있습니다.
해당 회사의 다른 채용 공고도 함께 조회할 수 있습니다.
6.	채용공고 지원
사용자는 특정 채용 공고에 지원할 수 있습니다.
동일한 공고에 중복 지원은 불가능합니다.

----
### DB 모델 간의 관계 설명
1. **Company (회사)**
   - 하나의 회사는 여러 개의 채용 공고(`Job`)를 가질 수 있습니다.
   - 관계: `Company` 1 : N `Job`

2. **Job (채용 공고)**
   - 하나의 채용 공고는 여러 개의 지원서(`Application`)를 받을 수 있습니다.
   - 각 채용 공고는 하나의 회사(`Company`)에 속합니다.
   - 관계: `Job` N : 1 `Company`
   - 관계: `Job` 1 : N `Application`

3. **User (사용자)**
   - 한 사용자는 여러 개의 채용 공고에 지원할 수 있습니다.
   - 동일한 채용 공고에는 1회만 지원 가능합니다.
   - 관계: `User` 1 : N `Application`

4. **Application (지원서)**
   - 각 지원서는 하나의 채용 공고(`Job`)와 하나의 사용자(`User`)에 속합니다.
   - `User`와 `Job`의 조합으로 1개의 지원만 가능합니다.(동일한 채용 공고에 대한 중복 지원 불가능).
   - 관계: `Application` N : 1 `User`
   - 관계: `Application` N : 1 `Job`
---

## 주요 API 명세 
### 1. 채용공고 API
- **URL**: `POST /jobs`
- **설명**: 새로운 채용 공고를 등록합니다.

#### 요청 필드

| Field          | Type      | Description            |
|----------------|-----------|------------------------|
| `company_id`   | `Integer` | 회사 ID                |
| `position`     | `String`  | 채용 포지션            |
| `reward`       | `Integer` | 채용 보상금            |
| `description`  | `String`  | 채용 내용              |
| `skills`       | `String`  | 사용 기술              |

```
{
  "company_id": 1,
  "position": "백엔드 개발자",
  "reward": 1000000,
  "description": "백엔드 개발자를 모집합니다.",
  "skills": "Node.js"
}
```
성공 응답 예시 
```
{
    "status": "success",
    "message": "채용공고 등록 완료",
    "data": {
        "id": 4,
        "companyId": 1,
        "position": "백엔드 ",
        "reward": 1000000,
        "description": "K",
        "skills": "Python",
        "updatedAt": "2024-08-11T07:31:58.802Z",
        "createdAt": "2024-08-11T07:31:58.802Z"
    }
}
```


- **URL**: `PUT /jobs/:id`
- **설명**: 기존의 채용 공고를 수정합니다.

  
| Field          | Type      | Description            |
|---------------|-----------|------------------------|
| `position`    | `String`  | 채용 포지션            |
| `reward`      | `Integer` | 채용 보상금            |
| `description` | `String`  | 채용 내용              |
| `skills`      | `String`  | 사용 기술              |
```
{
  "position": "백엔드 시니어 개발자",
  "reward": 1500000,
  "description": "백엔드 시니어 개발자를 모집합니다.",
  "skills": "Node.js, AWS"
}`
```
성공 응답 예시
```
{
    "status": "success",
    "message": "채용공고 수정 완료",
    "data": {
        "id": 4,
        "position": "백엔드 개발자",
        "reward": 1500000,
        "skills": "Django",
        "description": "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 합격입니다! ",
        "companyId": 1,
        "createdAt": "2024-08-11T07:31:58.802Z",
        "updatedAt": "2024-08-11T07:34:56.753Z"
    }
}
```

실패 응답 예시
```
{
    "message": "채용공고를 찾을 수 없습니다.",
    "stack": "NotFoundError: 채용공고를 찾을 수 없습니다."
}
```

- **URL**: `DELETE /jobs/:id`
- **설명**: 특정 채용 공고를 삭제합니다.

- **URL**: `GET /jobs`
- 검색 시 : `/jobs?search=백엔드`
- **설명**: 등록된 모든 채용 공고 목록을 조회하며, 검색이 가능합니다.

| Query Parameter | Type     | Description                               |
|-----------------|----------|-------------------------------------------|
| `search`        | `String` | 검색 키워드 (회사 이름, 포지션, 사용 기술) |

성공 응답 예시
```
{
    "status": "success",
    "message": "채용공고 목록 조회 완료",
    "data": [
        {
            "job_id": 4,
            "company_name": "원티드랩",
            "country": "한국",
            "location": "서울",
            "position": "백엔드 개발자",
            "reward": 1500000,
            "skills": "Django"
        }
    ]
}
```


- **URL**: `GET /jobs/:id`
- **설명**: 특정 채용 공고 상세 정보를 조회하고, 해당 회사의 다른 공고 id도 조회할 수 있습니다.

성공 응답 예시
```
{
    "status": "success",
    "message": "채용공고 상세 페이지 조회 완료",
    "data": {
        "job_id": 4,
        "company_name": "원티드랩",
        "country": "한국",
        "location": "서울",
        "position": "백엔드 개발자",
        "reward": 1500000,
        "skills": "Django",
        "description": "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다.",
        "otherJobs": [
            2,
            3,
            5,
            6
        ]
    }
}
```

실패 응답 예시
```
{
    "message": "채용공고를 찾을 수 없습니다.",
    "stack": "NotFoundError: 채용공고를 찾을 수 없습니다."
}
```

### 2. 공고 지원 API 
- **URL**: `POST /applications/apply`
- **설명**: 사용자가 특정 채용 공고에 지원합니다.

#### 요청 필드

| Field    | Type     | Description              |
|----------|----------|--------------------------|
| `jobId`  | `Integer`| 지원할 채용 공고의 ID     |
| `userId` | `Integer`| 지원하는 사용자의 ID      |

```json
{
  "jobId": 1, 
  "userId": 2 
}
```

성공 응답 예시
```
{
    "status": "success",
    "message": "채용공고에 지원 완료",
    "data": {
        "id": 1,
        "jobId": 2,
        "userId": 1,
        "updatedAt": "2024-08-11T07:36:31.928Z",
        "createdAt": "2024-08-11T07:36:31.928Z"
    }
}
```

실패 응답 예시
```
{
    "message": "채용공고를 찾을 수 없습니다.",
    "stack": "NotFoundError: 채용공고를 찾을 수 없습니다."
}
```
```
{
    "message": "이미 해당 채용공고에 지원하였습니다.",
    "stack": "BadRequestError: 이미 해당 채용공고에 지원하였습니다."
}
```
```
{
    "message": "사용자를 찾을 수 없습니다.",
    "stack": "NotFoundError: 사용자를 찾을 수 없습니다."
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

### 프로젝트 설치 및 실행 방법
```
# 1. 패키지 설치
npm install

# 2. 시작
node app.js

# 3. 테스트 코드 실행
npm test 
