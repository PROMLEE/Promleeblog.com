"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function Pw() {
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(true);
  const getpw = () => {
    if (typeof window !== "undefined") {
      const pw = localStorage.getItem("promleeblogpostpw");
      if (pw === null) return;
      else setValue(pw);
    }
  };

  React.useEffect(() => {
    getpw();
    if (value.length === 4) {
      const PW = process.env.NEXT_PUBLIC_POST_PW;
      if (value === PW) {
        setIsOpen(false);
        localStorage.setItem("promleeblogpostpw", PW);
      } else {
        alert("비밀번호가 틀렸습니다.");
        setValue("");
      }
    }
  }, [value]);
  return (
    <Drawer open={isOpen} handleOnly={true}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>미공개 포스트입니다😢</DrawerTitle>
          <DrawerDescription>패스워드를 입력해주세요</DrawerDescription>
        </DrawerHeader>
        <div className="mb-20 flex flex-col content-center items-center">
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
      </DrawerContent>
    </Drawer>
  );
}
