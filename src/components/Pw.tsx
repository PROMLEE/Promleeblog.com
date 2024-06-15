"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import Link from "next/link";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Pw() {
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(true);
  const { toast } = useToast();

  const getpw = () => {
    if (typeof window !== "undefined") {
      const pw = localStorage.getItem("promleeblogpostpw");
      if (pw === null) return;
      else setValue(pw);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  React.useEffect(() => {
    getpw();
    if (value.length === 4) {
      const PW = process.env.NEXT_PUBLIC_POST_PW;
      if (value === PW) {
        setIsOpen(false);
        localStorage.setItem("promleeblogpostpw", PW);
      } else {
        toast({
          title: "비밀번호가 틀렸습니다",
          action: (
            <ToastAction altText="확인" className="bg-foreground text-text">
              확인
            </ToastAction>
          ),
        });
        setValue("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Drawer open={isOpen} handleOnly={true}>
      <DrawerContent>
        <div className="mx-auto mt-5 w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>미공개 포스트입니다😢</DrawerTitle>
            <DrawerDescription>패스워드를 입력해주세요</DrawerDescription>
          </DrawerHeader>
          <div className="mb-5 flex flex-col content-center items-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DrawerFooter>
            <Button onClick={handleBack} className="bg-foreground">
              돌아가기
            </Button>
            <Button className="bg-second">
              <Link href="/blog/programming/tool/38">
                추천 공개 포스트 보러가기
              </Link>
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
