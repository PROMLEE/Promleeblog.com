import React from "react";
import Image from "next/image";
import { FaRegLightbulb } from "react-icons/fa";

export const Page1 = () => (
  <div className="mx-auto w-full max-w-2xl">
    <div className="mb-6 flex justify-center">
      <Image
        src="/icons/android-chrome-512x512.png"
        alt="블로그 대표 이미지"
        width={100}
        height={100}
        className="rounded-full border-4 border-blue-200 shadow-lg"
      />
    </div>
    <h1 className="mb-6 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      블로그 제작 동기
    </h1>
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow dark:bg-gray-900">
        <FaRegLightbulb className="mt-1 text-2xl text-yellow-400" />
        <div>
          <div className="mb-1 text-lg font-bold">만드는 것에 대한 즐거움</div>
          <div className="text-base">
            무언가를 직접 만들어내는 것에서 큰 즐거움을 느끼고, 그 결과물에서
            힘을 얻음
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow dark:bg-gray-900">
        <FaRegLightbulb className="mt-1 text-2xl text-yellow-400" />
        <div>
          <div className="mb-1 text-lg font-bold">
            나만의 서비스에 대한 로망
          </div>
          <div className="text-base">
            머리부터 발끝까지 내가 만든 웹사이트를 직접 배포·운영해보고 싶었음
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow dark:bg-gray-900">
        <FaRegLightbulb className="mt-1 text-2xl text-yellow-400" />
        <div>
          <div className="mb-1 text-lg font-bold">블로그를 선택한 이유</div>
          <div className="text-base">
            공부/경험/실패/성공을 기록하고 공유하고 싶어서 블로그를 시작
          </div>
        </div>
      </div>
    </div>
  </div>
);

