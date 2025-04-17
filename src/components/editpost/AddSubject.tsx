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
import { EditService } from "@/config/apis";

interface value {
  name: "name" | "nameko" | "url" | "category_no" | "desc";
  type?: boolean;
  disabled?: boolean;
  formlabel: string;
}

const values: value[] = [
  // { name: "category_id", formlabel: "Category ID", disabled: true, type: true },
  { name: "name", formlabel: "Subject Name(Eng)" },
  { name: "nameko", formlabel: "Subject Name(Kor)" },
  { name: "url", formlabel: "Subject URL" },
  { name: "category_no", formlabel: "Category_no", type: true },
  { name: "desc", formlabel: "Description" },
];
const FormSchema = z.object({
  // category_id: z.number(),
  name: z
    .string()
    .min(2, { message: "Name(eng) must be at least 2 characters." }),
  nameko: z
    .string()
    .min(2, { message: "Name(ko) must be at least 2 characters." }),
  url: z.string().min(2, { message: "URL must be at least 2 characters." }),
  category_no: z.number(),
  desc: z.string(),
});

export const AddSubject = ({ category_id }: { category_id: number }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // category_id,
      name: "",
      nameko: "",
      url: "",
      category_no: 0,
      desc: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const confirmtext = `${data.name}\nSubject Name(Kor): ${data.nameko}\nSubject URL: ${data.url}\nCategory_no: ${data.category_no}\nDescription: ${data.desc}`;
    if (window.confirm("Do you want to add this Subject?\n" + confirmtext)) {
      // joinApi({ body: data });
      EditService().postSubject({ ...data, category_id });
      // window.location.reload();
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
                    onChange={
                      value.type
                        ? (e) => field.onChange(Number(e.target.value))
                        : field.onChange
                    }
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
