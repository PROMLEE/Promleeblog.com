"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface value {
  name: "category_id" | "name" | "nameko" | "url" | "category_no" | "desc";
  type?: boolean;
  disabled?: boolean;
  formlabel: string;
}

const values: value[] = [
  {
    name: "category_id",
    formlabel: "Category ID",
    disabled: true,
    type: true,
  },
  {
    name: "name",
    formlabel: "Subject Name(Eng)",
  },
  {
    name: "nameko",
    formlabel: "Subject Name(Kor)",
  },
  {
    name: "url",
    formlabel: "Subject URL",
  },
  {
    name: "category_no",
    formlabel: "Category_no",
    type: true,
  },
  {
    name: "desc",
    formlabel: "Description",
  },
];
interface Subject {
  category_id: number;
  name: string;
  nameko: string;
  url: string;
  category_no: number;
  desc: string;
}
const FormSchema = z.object({
  category_id: z.string().transform((v) => Number(v) || 0),
  name: z.string().min(2, {
    message: "Name(eng) must be at least 2 characters.",
  }),
  nameko: z.string().min(2, {
    message: "Name(ko) must be at least 2 characters.",
  }),
  url: z.string().min(2, {
    message: "URL must be at least 2 characters.",
  }),
  category_no: z.string().transform((v) => Number(v) || 0),
  desc: z.string(),
});

const joinApi = async ({ body }: { body: Subject }) => {
  await fetch("/api/edit/addsubject", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const AddSubject = ({ category_id }: { category_id: number }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category_id,
      name: "",
      nameko: "",
      url: "",
      category_no: 0,
      desc: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const confirmtext = `Category ID: ${data.category_id}\nSubject Name(Eng): ${data.name}\nSubject Name(Kor): ${data.nameko}\nSubject URL: ${data.url}\nCategory_no: ${data.category_no}\nDescription: ${data.desc}`;
    if (window.confirm("Do you want to add this Subject?\n" + confirmtext)) {
      joinApi({ body: data });
      window.location.reload();
    }
  }

  return (
    <Form {...form}>
      <h1 className="my-4 text-2xl font-bold">주제(Subject) 추가</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {values.map((value) => (
          <FormField
            control={form.control}
            key={value.name}
            name={value.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.formlabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={value.formlabel}
                    disabled={value.disabled}
                    {...field}
                    type={value.type ? "number" : "text"}
                    className="border-third"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
