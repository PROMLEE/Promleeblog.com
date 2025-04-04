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
  name: EditRequest.PostAddCategoryColumnName;
  type?: boolean;
  formlabel: string;
}

const values: value[] = [
  { name: "name", formlabel: "Category Name(Eng)" },
  { name: "nameko", formlabel: "Category Name(Kor)" },
  { name: "url", formlabel: "Category URL" },
  { name: "ord", formlabel: "Order", type: true },
  { name: "desc", formlabel: "Description" },
];

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name(eng) must be at least 2 characters." }),
  nameko: z
    .string()
    .min(2, { message: "Name(ko) must be at least 2 characters." }),
  url: z.string().min(2, { message: "URL must be at least 2 characters." }),
  ord: z.number(),
  desc: z.string(),
});

const joinApi = async ({ body }: { body: EditRequest.PostAddCategory }) => {
  await fetch("/api/edit/addcategory", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
};

export const AddCategory = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", nameko: "", url: "", ord: 0, desc: "" },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const confirmtext = `Category Name(Eng): ${data.name}\nCategory Name(Kor): ${data.nameko}\nCategory URL: ${data.url}\nOrder: ${data.ord}\nDescription: ${data.desc}`;
    if (window.confirm("Do you want to add this Category?\n" + confirmtext)) {
      joinApi({ body: data as EditRequest.PostAddCategory });
      window.location.reload();
    }
  }

  return (
    <Form {...form}>
      <h1 className="my-4 text-2xl font-bold">카테고리(Category) 추가</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {values.map((value) => (
          <FormField
            control={form.control}
            name={value.name}
            key={value.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.formlabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={value.formlabel}
                    {...field}
                    type={value.type ? "number" : "text"}
                    onChange={
                      value.type
                        ? (e) => field.onChange(Number(e.target.value))
                        : field.onChange
                    }
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
