import { NextResponse } from "next/server";

export async function GET() {
  // 실제 데이터베이스 로직 대신 mock 데이터를 사용합니다.
  const mockUser = {
    user_email: "existing@example",
    password: "password123",
    user_uid: "adadsdasdasd33",
  };
  // 유저를 찾았을 경우 로그인 성공 메시지를 반환합니다.
  return NextResponse.json({
    message: "로그인 성공",
    result: {
      mockUser,
      // 필요한 다른 데이터도 이곳에 추가할 수 있습니다.
    },
  });
}
