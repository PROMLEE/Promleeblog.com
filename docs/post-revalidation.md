# 로컬 편집 후 운영 블로그 캐시 갱신

로컬 수정 API는 DB 저장 직후 운영 서버의 `POST /api/revalidate/post`를 호출합니다.
운영 서버는 Bearer 토큰을 확인하고 DB에서 글의 URL을 조회한 뒤 해당 페이지의
`revalidatePath()`를 실행합니다. 다음 서버 요청에서 본문과 메타데이터를 갱신합니다.

## 설정

1. `openssl rand -hex 32`로 비밀 토큰을 생성합니다.
2. Vercel 프로젝트의 **Production** 환경변수에 `REVALIDATION_TOKEN`을 설정합니다.
3. 이번 코드와 환경변수를 운영 서버에 배포합니다.
4. 로컬 `.env`에 아래 값을 추가하고 개발 서버를 재시작합니다.

```dotenv
REVALIDATION_URL=https://www.promleeblog.com/api/revalidate/post
REVALIDATION_TOKEN=Vercel에 설정한 것과 동일한 토큰
```

`REVALIDATION_URL`은 로컬에만 설정합니다. Vercel에 설정하면 운영 수정 API에서도
원격 호출을 수행합니다. 토큰에는 `NEXT_PUBLIC_` 접두사를 붙이지 말고 Git에 커밋하지 않습니다.
로컬과 운영 서버는 동일한 포스팅 DB를 사용해야 합니다.

## 확인과 실패 처리

- 로컬 편집 화면에서 기존 글의 본문을 수정하고 저장한 뒤 운영 글을 새로고침합니다.
- 토큰이 없으면 운영 갱신 API는 503, 토큰이 틀리면 401을 반환합니다.
- 로컬에 `REVALIDATION_URL`이 없으면 원격 갱신을 생략하고 기존 주기적 갱신을 사용합니다.
- 원격 갱신 실패 시 수정 API는 `saved: true`와 502를 반환합니다. DB 저장은 이미 완료됐으며,
  환경변수나 배포 상태를 수정하고 저장을 다시 실행하면 갱신을 재시도합니다.
- DB 직접 수정과 신규 글 추가는 이 호출 흐름에 포함되지 않습니다.
- 제목과 본문 수정은 현재 글 URL을 갱신합니다. URL 변경 시 이전 URL의 캐시는 별도로 처리해야 합니다.
- 이미 열린 브라우저 화면은 자동으로 갱신되지 않습니다.
