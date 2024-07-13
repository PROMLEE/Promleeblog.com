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
  name: "name" | "nameko" | "url" | "ord" | "desc";
  type?: boolean;
  formlabel: string;
}

const values: value[] = [
  {
    name: "name",
    formlabel: "Category Name(Eng)",
  },
  {
    name: "nameko",
    formlabel: "Category Name(Kor)",
  },
  {
    name: "url",
    formlabel: "Category URL",
  },
  {
    name: "ord",
    formlabel: "Order",
    type: true,
  },
  {
    name: "desc",
    formlabel: "Description",
  },
];
interface Category {
  name: string;
  nameko: string;
  ord: number;
  url: string;
  desc: string;
}
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name(eng) must be at least 2 characters.",
  }),
  nameko: z.string().min(2, {
    message: "Name(ko) must be at least 2 characters.",
  }),
  url: z.string().min(2, {
    message: "URL must be at least 2 characters.",
  }),
  ord: z.string().transform((v) => Number(v) || 0),
  desc: z.string(),
});

const joinApi = async ({ body }: { body: Category }) => {
  const res = await fetch("/api/edit/addcategory", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
};

export const AddCategory = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      nameko: "",
      url: "",
      ord: 0,
      desc: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    joinApi({ body: data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {values.map((value) => (
          <FormField
            control={form.control}
            name={value.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.formlabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={value.formlabel}
                    {...field}
                    type={value.type ? "number" : "text"}
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
