import json
import mysql.connector
import re
import yaml

# 데이터베이스 연결 설정
db = mysql.connector.connect(
    host="localhost", user="root", password="2171", database="posts"
)
cursor = db.cursor()

# MDX 파일 읽기
with open("content.mdx", "r", encoding="utf-8") as file:
    contents = file.read()
    parts = contents.split("---")

    if len(parts) > 2:
        # YAML 프론트매터 추출 및 파싱
        metadata = yaml.safe_load(parts[1])
    else:
        # 적절한 오류 처리 또는 경고 메시지
        print("MDX 파일 형식이 올바르지 않습니다.")
        metadata = {}

    # posts 테이블에 데이터 삽입
    cursor.execute(
        """
        INSERT INTO posts (title, date, description, thumbnail, content)
        VALUES (%s, %s, %s, %s, %s)
    """,
        (
            metadata["title"],
            metadata["date"],
            metadata["desc"],
            metadata["thumbnail"],
            contents,
        ),
    )

    post_id = cursor.lastrowid  # 삽입된 글의 ID

    # JSX 컴포넌트 파싱 및 components 테이블에 삽입
    components = re.findall(r"<(\w+).*?>(.*?)</\1>", contents)  # 간단한 예시 파싱
    for comp in components:
        cursor.execute(
            """
            INSERT INTO components (post_id, type, properties, content)
            VALUES (%s, %s, %s, %s)
        """,
            (post_id, comp[0], json.dumps({}), comp[1]),
        )

# 변경사항 저장
db.commit()
db.close()
